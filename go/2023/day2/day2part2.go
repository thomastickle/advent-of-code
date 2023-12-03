package main 

import (
	"bufio"
	"fmt"
	"os"
	"strings"
	)

func main() {
	sum := 0
	scanner := bufio.NewScanner(os.Stdin) 
	for scanner.Scan() {
		currentLine := scanner.Text()
		sum += processGame(currentLine)
	}
	fmt.Printf("Sum: %d\n", sum)
}

func extractMinimums(hand string) map[string]int {
	var minimumColorCount = make(map[string]int)
	colorCountsHand := strings.Split(hand, ",")
	for _, colorCount := range colorCountsHand {
		var count int
		var color string
		fmt.Sscanf(colorCount, " %d %s", &count, &color)
		minimumColorCount[color] = count
	}
	return minimumColorCount 
}


func processGame(line string) int {
	var game int
	var minimumColorCounts = make(map[string]int)
	fmt.Sscanf(line, "Game %d:", &game)

	hands := strings.Split(strings.Split(line, ":")[1], ";")
	for _, hand := range hands {
		var minimumCountsForHand = extractMinimums(hand)
		minimumColorCounts = updateMinimums(minimumColorCounts, minimumCountsForHand)
	}

	var cube = 1
	for _, value := range minimumColorCounts {
		cube *= value
	}

	return cube 
}

func updateMinimums(current map[string]int, hand map[string]int) map[string]int {
	for key, value := range hand {
		if (value > current[key]) {
			current[key] = value
		}
	}
	return current
}

