package day4

import (
	"strings"
)

func ComputeWinningsForGames(games []string) int {
	winnings := 0
	for _, game := range games {
		winnings += computeWinningsForGame(game)
	}
	return winnings
}


func ComputeTotalCardsWon(lines []string) int {
	cards := make([]int, len(lines)) 
	for i := 0; i < len(cards); i++ {
		cards[i] = 1
	}

	for i, card := range lines {
		duplicatesForward := scoreGame(card)

		for j := i + 1; j <= i + duplicatesForward && j < len(cards); j++ {
			cards[j] = cards[j] + cards[i] 
		}
	}

	sum := 0
	for _, gameCount := range cards {
		sum += gameCount
	}
	return sum
}

func computeWinningsForGame(game string) int {
	matchCount := scoreGame(game)
	
	result := 0
	for i := 0; i < matchCount; i++ {
		result = 1 << uint(i)
	}
	return result

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
	return matchCount
}
