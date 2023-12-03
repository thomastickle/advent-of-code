package main

import( "bufio"
		"fmt"
    	"os"
		"strconv"
    	"strings"
		"unicode"
)

type SymbolLocation struct {
	Rune rune
	X int
	Y int
}

func main() {
	var sum = 0
	var schematic = make([][]rune, 0) 
	var scanner = bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := []rune(scanner.Text())

		if len(line) > 0 {	
			schematic = append(schematic, line)
		}
	}

	for i := 0; i < len(schematic); i++ {
		var builder strings.Builder
		var hasSymbol = false
		fmt.Printf("Line %d: %s\n", i, string(schematic[i]))
		for j := 0; j < len(schematic[i]); j++ {
			currentRune := schematic[i][j]
			if unicode.IsDigit(currentRune) {
		       		builder.WriteRune(currentRune) 	
				hasSymbol = hasSymbol || hasAdjacentSymbol(schematic, i, j)
			}
			if !unicode.IsDigit(currentRune) {
				if builder.Len() > 0  {
					var x,_ = strconv.Atoi(builder.String())
					fmt.Printf("[%d:%t] ", x, hasSymbol)
					if hasSymbol {
						sum += x
					}
				}
				builder.Reset()
				hasSymbol = false
			}
		}
		if builder.Len() > 0  {
			var x,_ = strconv.Atoi(builder.String())
			fmt.Printf("[%d:%t] ", x, hasSymbol)
			if hasSymbol {
				sum += x
			}
		}
		fmt.Printf("\n")

	}
	fmt.Printf("Sum of parts: %d\n", sum)

}

func hasAdjacentSymbol(schematic [][]rune, i int, j int) bool {	
	var startRow, endRow, startColumn, endColumn = GetSearchBounds(schematic, i, j)
	for row := startRow; row <= endRow; row++ {
		for column := startColumn; column <= endColumn; column++ {
			if !unicode.IsDigit(schematic[row][column]) && schematic[row][column] != '.' {
				return true
			}
		}
	}
	return false
}

func GetSearchBounds(schematic [][]rune, i int, j int) (int, int, int, int) {
	var startRow = i - 1
	if startRow < 0 {
		startRow = 0
	}
	var endRow = i + 1
	if endRow >= len(schematic) {
		endRow = len(schematic) - 1
	}

	var startColumn = j - 1
	if startColumn < 0 {
		startColumn = 0
	}

	var endColumn = j + 1
	if endColumn >= len(schematic[i])  {
		endColumn = len(schematic[i]) - 1
	}

	return startRow, endRow, startColumn, endColumn
}
