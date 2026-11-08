package day8

import (
	"fmt"
	"regexp"
)

type Node struct {
	Id    string
	Left  string
	Right string
}

func GetMovementsAndNodes(lines []string) ([]rune, map[string]Node) {
	movements := []rune(lines[0])

	nodes := make(map[string]Node)
	for _, line := range lines[2:] {
		var node Node
		fmt.Sscanf(line, "%3s = (%3s, %3s)", &node.Id, &node.Left, &node.Right)
		nodes[node.Id] = node
	}

	return movements, nodes
}

func FindStepsToReach(movements []rune, nodes map[string]Node, start, stop string) int {
	steps := 0
	currentNode := nodes[start]
	endRegex := regexp.MustCompile(stop)
	for !endRegex.MatchString(currentNode.Id) {
		if movements[steps % len(movements)] == 'L' {
			currentNode = nodes[currentNode.Left] 
		} else {
			currentNode = nodes[currentNode.Right] 
		}
		steps++ 	
	}
	return steps
}



func GetNodesByPattern(nodes map[string]Node, pattern string) []Node {
	var endsA []Node	
	regex := regexp.MustCompile(pattern)
	for key, node := range nodes {
		if regex.MatchString(key) {
			endsA = append(endsA, node)
		}
	}
	return endsA
}
