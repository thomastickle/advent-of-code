package day4

import (
	"strings"
)

func ComputeWinningsForGames(games []string) int {
	winnings := 0
	for _, game := range games {
		winnings += scoreGame(game)
	}
	return winnings
}

func scoreGame(game string) int {
	splitLine := strings.FieldsFunc(game, func(r rune) bool {
		return r == ':' || r == '|'
	})

	winningNumbers := make(map[string]bool)
	for _, number := range strings.Fields(splitLine[1]) {
		winningNumbers[number] = true
	}

	matchCount := 0
	for _, num := range strings.Fields(splitLine[2]) {
		if winningNumbers[num] {
			matchCount++
		}
	}

	result := 0
	for i := 0; i < matchCount; i++ {
		result = 1 << uint(i)
	}
	return result
}
