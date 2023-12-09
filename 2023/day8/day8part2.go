package main


import(
	"bufio"
	"fmt"
	"os"
	"strings"
)

type Node struct {
	Id string
	Left string
	Right string
}

func main() {
	lines := readAllLines()

	movements := []rune(lines[0])
	
	nodes := make(map[string]Node)
	var endsA []Node
	for _, line := range lines[2:] {
		var node Node
		fmt.Sscanf(line, "%3s = (%3s, %3s)", &node.Id, &node.Left, &node.Right)
		nodes[node.Id] = node
		if strings.HasSuffix(node.Id, "A") {
			endsA = append(endsA, node)
		}
	}

	var steps []int
	for _, startNode := range endsA {
		steps = append(steps, stepsToReachZ(startNode, nodes, movements))
	}


	lcm := Lcm(steps[0], steps[1], steps...)
	fmt.Printf("Steps taken to stop at node ending in Z: %d\n", lcm)
}

func stepsToReachZ(node Node, nodeMap map[string]Node, movements []rune) int {
	step := 0
	currentNode := node 
	for !strings.HasSuffix(currentNode.Id, "Z") {
		if movements[step % len(movements)] == 'L' {
			currentNode = nodeMap[currentNode.Left] 
		} else {
			currentNode = nodeMap[currentNode.Right] 
		}
		step++ 	
	}
	return step
}


func readAllLines() []string { 
	var lines []string 
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		lines = append(lines, line)
	}
	return lines
}

func Gcd(a, b int) int {
	for b!= 0 {
		t := b
		b = a % b
		a = t
	}
	return a
}

func Lcm(a, b int, integers ...int) int {
	result := a * b / Gcd(a,b)

	for i:= 0; i < len(integers); i++ {
		result = Lcm(result, integers[i])
	}
	return result
}	
