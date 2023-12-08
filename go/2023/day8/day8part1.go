package main


import(
	"bufio"
	"fmt"
	"os"
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
	for _, line := range lines[2:] {
		var node Node
		fmt.Sscanf(line, "%3s = (%3s, %3s)", &node.Id, &node.Left, &node.Right)
		nodes[node.Id] = node
	}

	step := 0
	currentNode := nodes["AAA"]
	for currentNode.Id != "ZZZ" {
		if movements[step % len(movements)] == 'L' {
			currentNode = nodes[currentNode.Left] 
		} else {
			currentNode = nodes[currentNode.Right] 
		}
		step++ 	
	}

	fmt.Printf("Number of steps: %d\n", step)
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
