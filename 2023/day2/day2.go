package day2

import (
	"fmt"
	"strings"
)

func SumOfValidGames(lines []string) int {
	sum := 0
	for _, line := range lines {
		game, possible := processGame(line)
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


func SumOfMinimalPowerSet(games []string) int {
	sum := 0
	for _, game := range games {
		minimumCubeCounts := extractMinimumForGame(game)
		sum += computePowerSet(minimumCubeCounts)	
	}
	return sum
}

func computePowerSet(cubeCounts map[string]int) int {
	powerSetValue := 1
	for _, value := range cubeCounts {
		powerSetValue *= value
	}
	return powerSetValue
}

func extractMinimumForGame(game string) map[string]int {
	var minimumCubeCounts map[string]int = make(map[string]int)
	splitGamesHands := strings.Split(game, ":")
	hands := strings.Split(splitGamesHands[1], ";")
	for _, hand := range hands {
		handCounts := handCounts(hand)
		for key, value := range handCounts {
			if value > minimumCubeCounts[key] {
				minimumCubeCounts[key] = value
			}
		}
	}
	return minimumCubeCounts
}

func handCounts(hand string) map[string]int {
	var handCounts map[string]int = make(map[string]int)
	cubeCounts := strings.Split(hand, ",")
	for _, cubeCount := range cubeCounts {
		var count int
		var color string
		fmt.Sscanf(cubeCount, "%d %s", &count, &color)
		handCounts[color] = count
	}
	return handCounts
}
