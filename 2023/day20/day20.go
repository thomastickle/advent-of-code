package day20

import (
	"aoc-2023/math"
	"strings"

	"golang.org/x/exp/maps"
)

var observed = make(map[string]int)

func CountPulsesSent(lines []string, buttonPresses int, findLowOutput bool) int {

	stateMachine := GetStateMachine(lines)

	feederToOutput := ""
	if findLowOutput {
		for key, value := range stateMachine {
			if value.Type == Conjunctor && len(value.Outputs) == 1 {
				_, ok := stateMachine[value.Outputs[0]]
				if !ok {
					feederToOutput = key
					break
				}
			}
		}
	}

	low, high := 0, 0
	queue := make(chan Pulse, 300)
	button := stateMachine["button"]
	for i := 1; i <= buttonPresses; i++ {
		low += 1
		queue <- Pulse{button.Name, button.Outputs[0], Low}
		for len(queue) > 0 {
			pulse := <-queue
			low, high = updatePulseCounts(low, high, pulse)
			stateMachineNode, ok := stateMachine[pulse.Target]
			if !ok {
				continue
			}
			handleIfBroadcaster(stateMachineNode, pulse, queue)
			handleFlipFlop(stateMachineNode, pulse, queue)
			foundCycle := handleIfConjuctor(stateMachineNode, pulse, queue, feederToOutput, i)
			if foundCycle {
				values := maps.Values(observed)
				lcm := math.Lcm(values[0], values[1], values...)
				return lcm
			}
		}
	}

	return (low - buttonPresses) * high
}

func updatePulseCounts(low, high int, pulse Pulse) (int, int) {
	if pulse.Pulse == Low {
		return low + 1, high
	} else {
		return low, high + 1
	}
}

func handleFlipFlop(stateMachineNode *StateMachineNode, pulse Pulse, queue chan Pulse) {
	if stateMachineNode.Type == FlipFlop && pulse.Pulse == Low {
		var powerLevel PulseLevel
		stateMachineNode.State = !stateMachineNode.State
		if stateMachineNode.State {
			powerLevel = High
		} else {
			powerLevel = Low
		}

		sendToTargets(stateMachineNode, powerLevel, queue)
	}
}

func handleIfConjuctor(stateMachineNode *StateMachineNode, pulse Pulse, queue chan Pulse, feederToOutput string, buttonPresses int) bool {
	if stateMachineNode.Type == Conjunctor {
		stateMachineNode.Memory[pulse.Source] = pulse.Pulse

		if stateMachineNode.Name == feederToOutput {
			if stateMachineNode.Memory[pulse.Source] {
				_, ok := observed[pulse.Source]
				if !ok {
					observed[pulse.Source] = buttonPresses
				}

				allHit := true
				for key := range stateMachineNode.Memory {
					_, ok := observed[key]
					allHit = allHit && ok
				}
				if allHit {
					return true
				}
			}
		}
		allHigh := High
		for _, value := range stateMachineNode.Memory {
			allHigh = allHigh && bool(value)
		}
		sendToTargets(stateMachineNode, PulseLevel(!allHigh), queue)
	}
	return false
}

func handleIfBroadcaster(stateMachineNode *StateMachineNode, pulse Pulse, queue chan Pulse) {
	if stateMachineNode.Type == Broadcaster {
		sendToTargets(stateMachineNode, pulse.Pulse, queue)
	}
}

func sendToTargets(stateMachineNode *StateMachineNode, pulseLevel PulseLevel, queue chan Pulse) {
	for _, target := range stateMachineNode.Outputs {
		queue <- Pulse{stateMachineNode.Name, target, pulseLevel}
	}
}

func GetStateMachine(lines []string) map[string]*StateMachineNode {
	stateMachineNodes := make(map[string]*StateMachineNode)
	for _, line := range lines {
		splitLine := strings.Split(line, "->")
		nodeType, nodeName := getNodeTypeAndName(splitLine[0])
		outputs := getOutputs(splitLine[1])
		stateMachineNode := StateMachineNode{Name: nodeName, Type: nodeType, Outputs: outputs, State: Off, Memory: make(map[string]PulseLevel, 0)}
		stateMachineNodes[nodeName] = &stateMachineNode
	}

	for name, module := range stateMachineNodes {
		for _, output := range module.Outputs {
			outputNode, ok := stateMachineNodes[output]
			if ok && outputNode.Type == Conjunctor {
				outputNode.Memory[name] = Low
			}
		}
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
