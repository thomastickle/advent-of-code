package main

import( "bufio"
	"fmt"
    	"os"
	"strconv"
    	"strings"
	"unicode"
)

// Structure for holding symbols
type SymbolLocation struct {
	Char rune
	Row int
	Column int
}

// Structure for holding our possible part numbers.
type PartNumberCandidate struct {
	PartNumber int
	Row int
	StartColumn int
	EndColumn int
}


func main() {
	// Start by getting all the lines
	var schematic = make([][]rune, 0) 
	var scanner = bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := []rune(scanner.Text())

		if len(line) > 0 {	
			schematic = append(schematic, line)
		}
	}


	// Get the Symbols and Part Number Candidates
	var symbolLocations, partNumberCandidates = GetSymbolAndPartCandidates(schematic)

	// Now check which part numbers candidates are actually part numbers and add them to the total to get the answer
	var sum = 0
	for _, symbolLocation := range symbolLocations {
		if symbolLocation.Char == '*' {
			var partNumbers = make([]int, 0)
			for _, partNumberCandidate := range partNumberCandidates {
				if (symbolLocation.Row - 1 <= partNumberCandidate.Row && partNumberCandidate.Row <= symbolLocation.Row + 1) {
					 var x = IsInsideColumnRange(symbolLocation.Column, partNumberCandidate.StartColumn, partNumberCandidate.EndColumn)
					 if x {
						partNumbers = append(partNumbers, partNumberCandidate.PartNumber) 
					 }
				}
			}
			if len(partNumbers) == 2 {
				sum += partNumbers[0] * partNumbers[1]
			}
		}
	}

	fmt.Printf("Sum of parts: %d\n", sum)

}

func IsInsideColumnRange(column int, columnRangeStart int, columnRangeEnd int) bool {
	for i := column - 1; i <= column + 1; i++ {
		if columnRangeStart <= i && i <= columnRangeEnd {
		    return true 
		}
	}
	return false
}


// Returns a slice with all the symbols found, and part numbers found
func GetSymbolAndPartCandidates(schematic [][]rune) ([]SymbolLocation, []PartNumberCandidate) {
	var symbolLocations = make([]SymbolLocation,0)
	var partNumberCandidates = make([]PartNumberCandidate, 0)
	for i := 0; i < len(schematic); i++ {
		var buffer strings.Builder
		for j := 0; j < len(schematic[i]); j++ {
			currentRune := schematic[i][j]
			if !unicode.IsDigit(currentRune) {
				if currentRune != '.' {
					var symbolLocation = SymbolLocation{currentRune, i, j}
					symbolLocations = append(symbolLocations, symbolLocation)
				}
				if (buffer.Len() > 0) {
					var partNumber, _ = strconv.Atoi(buffer.String())
					var partNumberCandidate  = PartNumberCandidate{PartNumber: partNumber, Row: i, StartColumn: j-buffer.Len(), EndColumn: j-1}
					partNumberCandidates = append(partNumberCandidates, partNumberCandidate)
				}
				buffer.Reset()
			}
			if unicode.IsDigit(currentRune) {
				buffer.WriteRune(currentRune)
			}
		}
		if buffer.Len() > 0 {
			var partNumber, _ = strconv.Atoi(buffer.String())
			var startColumn = len(schematic[i]) - buffer.Len() - 1
			var endColumn = len(schematic[i]) - 1 
			var partNumberCandidate  = PartNumberCandidate{PartNumber: partNumber, Row: i, StartColumn: startColumn, EndColumn: endColumn}
			partNumberCandidates = append(partNumberCandidates, partNumberCandidate)
		}

	}



	return symbolLocations, partNumberCandidates
}
