package main 

import (
	"bufio"
	"fmt"
	"os"
//	"strconv"
	"strings"
	)

func main() {
	sum := 0
	scanner := bufio.NewScanner(os.Stdin) 
	for scanner.Scan() {
		currentLine := scanner.Text()
		game, possible := processGame(currentLine)
		if possible {
			sum += game
		}
	}
	fmt.Printf("Sum: %d\n", sum)
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

var maxCountForColor = map[string]int { "red" : 12, "green" : 13, "blue" : 14}

