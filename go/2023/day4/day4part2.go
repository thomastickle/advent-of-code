package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	lines := readCards()
	totalGamesPlayed := processCards(lines)
	fmt.Printf("Total Scratch Cards Played: %d\n", totalGamesPlayed)
}

func readCards() []string {
	lines := make([]string, 0)
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		if len(line) > 0 {
			lines = append(lines, line)	
		}
	}
	return lines
}

func processCards(lines []string) int {
	cards := make([]int, len(lines)) 
	for i := 0; i < len(cards); i++ {
		cards[i] = 1
	}

	for i, card := range lines {
		duplicatesForward := scoreCard(card)

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


func scoreCard(game string) int {
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
