package day20

import (
	"fmt"
	"strings"
)

func CountPulsesSent(lines []string, buttonPresses int, findLowOutput bool) int {
	stateMachine := GetStateMachine(lines)
	for name, module := range stateMachine {
		for _, output := range module.Outputs {
			outputNode, ok := stateMachine[output]
			if ok && outputNode.Type == Conjunctor {
				outputNode.Memory[name] = Low
			}  
		}
	}

	low := 0
	high := 0
	queue := make(chan Pulse, 300)
	button := stateMachine["button"]
	for i := 0; i < buttonPresses; i++ {
		if (i % 100000) == 0 {
			fmt.Printf("Button presses: %d\n", i)
		}
		low += 1; 
		queue <- Pulse{button.Name, button.Outputs[0], Low }
		for  len(queue) > 0 {
			pulse := <- queue
			if pulse.Pulse == Low {
				low += 1	
			} else {
				high += 1
			}

			module, ok := stateMachine[pulse.Target]
			if !ok {
				continue
			}

			if module.Type == Broadcaster {
				for _, target := range module.Outputs {
					queue <- Pulse{module.Name, target, pulse.Pulse}
				}
			}

			if module.Type == FlipFlop && pulse.Pulse == Low {
				var powerLevel PulseLevel
				module.State = !module.State
				if module.State {
					powerLevel = High
				} else {
					powerLevel = Low
				}

				for _, target := range module.Outputs {
					queue <- Pulse{module.Name, target, powerLevel}
				}
			}

			if module.Type == Conjunctor {
				module.Memory[pulse.Source] = pulse.Pulse
				allHigh := High 
				for _, value := range module.Memory {
					allHigh = allHigh && bool(value)
				}
				for _, target := range module.Outputs {
					queue <- Pulse{module.Name, target, PulseLevel(!allHigh)}
				}				 
			}
		}
	}


	return (low-buttonPresses) * high 
}

func GetStateMachine(lines []string) map[string]*StateMachineNode {
	stateMachineNodes := make(map[string]*StateMachineNode)
	for _, line := range lines {
		splitLine := strings.Split(line, "->")
		nodeType, nodeName := getNodeTypeAndName(splitLine[0])
		outputs := getOutputs(splitLine[1])
		stateMachineNode := StateMachineNode{Name: nodeName, Type: nodeType, Outputs: outputs, State: Off, Memory: make(map[string]PulseLevel,0) }
		stateMachineNodes[nodeName] = &stateMachineNode
	}

	stateMachineNodes["button"] = &StateMachineNode{Name: "button", Type: Button, Outputs: []string{"broadcaster"}}

	return stateMachineNodes 
}

func getOutputs(outputString string) []string {
	outputs := strings.Split(outputString, ",")
	for i, output := range outputs {
		outputs[i] = strings.TrimSpace(output)
	}
	return outputs
}

func getNodeTypeAndName(nodeTypeAndName string) (NodeType, string) {
	var nodeType NodeType
	var nodeName string
	nodeTypeIndicator := nodeTypeAndName[0]
	switch nodeTypeIndicator {
	case '%', '&':
		nodeType = NodeType(nodeTypeIndicator)
		nodeName = nodeTypeAndName[1:]
	default:
		nodeType = Broadcaster
		nodeName = nodeTypeAndName
	}
	return nodeType, strings.TrimSpace(nodeName)
}
