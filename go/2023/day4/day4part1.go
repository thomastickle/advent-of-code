package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {

	processGames()

}

func processGames() {
	scoreTotal := 0
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		if len(line) > 0 {
			scoreTotal += scoreGame(line)
		}
	}
	fmt.Printf("Points total: %d\n", scoreTotal)
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
