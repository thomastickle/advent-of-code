package day2

import (
	"fmt"
	"strings"
)

func SumOfValidGames(lines []string) int {
	sum := 0
	for _, line := range lines {
		game, possible := processGame(line)
		fmt.Printf("Game: %d was possible: %t\n", game, possible)
		if possible {
			sum += game
		}
	}
	return sum
}

func checkHand(hand string) bool {
	colorCountsHand := strings.Split(hand, ",")
	for _, colorCount := range colorCountsHand {
		var count int
		var color string
		fmt.Sscanf(colorCount, " %d %s", &count, &color)
		if maxCountForColor[color] < count {
			return false
		}
	}
	return true
}

func processGame(line string) (int, bool) {
	var game int
	fmt.Sscanf(line, "Game %d:", &game)

	hands := strings.Split(strings.Split(line, ":")[1], ";")
	for _, hand := range hands {
		if !checkHand(hand) {
			return game, false
		}
	}

	return game, true
}

var maxCountForColor = map[string]int{"red": 12, "green": 13, "blue": 14}

// func main() {
// 	sum := 0
// 	scanner := bufio.NewScanner(os.Stdin)
// 	for scanner.Scan() {
// 		currentLine := scanner.Text()
// 		sum += processGame(currentLine)
// 	}
// 	fmt.Printf("Sum: %d\n", sum)
// }

// func extractMinimums(hand string) map[string]int {
// 	var minimumColorCount = make(map[string]int)
// 	colorCountsHand := strings.Split(hand, ",")
// 	for _, colorCount := range colorCountsHand {
// 		var count int
// 		var color string
// 		fmt.Sscanf(colorCount, " %d %s", &count, &color)
// 		minimumColorCount[color] = count
// 	}
// 	return minimumColorCount
// }

// func processGame(line string) int {
// 	var game int
// 	var minimumColorCounts = make(map[string]int)
// 	fmt.Sscanf(line, "Game %d:", &game)

// 	hands := strings.Split(strings.Split(line, ":")[1], ";")
// 	for _, hand := range hands {
// 		var minimumCountsForHand = extractMinimums(hand)
// 		minimumColorCounts = updateMinimums(minimumColorCounts, minimumCountsForHand)
// 	}

// 	var cube = 1
// 	for _, value := range minimumColorCounts {
// 		cube *= value
// 	}

// 	return cube
// }

// func updateMinimums(current map[string]int, hand map[string]int) map[string]int {
// 	for key, value := range hand {
// 		if (value > current[key]) {
// 			current[key] = value
// 		}
// 	}
// 	return current
// }
