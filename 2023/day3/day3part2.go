package main

import( "bufio"
	"fmt"
    	"os"
	"strconv"
    	"strings"
	"unicode"
)

type SymbolLocation struct {
	Char rune
	Row int
	Column int
}

type PartNumberCandidate struct {
	PartNumber int
	Row int
	StartColumn int
	EndColumn int
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

	var symbolLocations, partNumberCandidates = GetSymbolAndPartCandidates(schematic)
	fmt.Println("Symbol Locations:")
	for _, symbolLocation := range symbolLocations {
		fmt.Printf("Symbol %c:%d:%d\n", symbolLocation.Char, symbolLocation.Row, symbolLocation.Column)
	}

	fmt.Println("Part Number Candidates: ")
	for _, partNumberCandidate := range partNumberCandidates {
		fmt.Printf("Part Number: %d Row: %d StartColumn %d, EndColumn %d\n", partNumberCandidate.PartNumber, partNumberCandidate.Row, partNumberCandidate.StartColumn, partNumberCandidate.EndColumn)
	}


	for _, symbolLocation := range symbolLocations {
		fmt.Printf("Symbol %c:%d:%d\n", symbolLocation.Char, symbolLocation.Row, symbolLocation.Column)
		for _, partNumberCandidate := range partNumberCandidates {
			if (symbolLocation.Row - 1 <= partNumberCandidate.Row && partNumberCandidate.Row <= symbolLocation.Row + 1) {
                                 fmt.Printf("Part Number %d is on the right row.\n", partNumberCandidate.PartNumber)	
				 var x = IsInsideColumnRange(symbolLocation.Column, partNumberCandidate.StartColumn, partNumberCandidate.EndColumn)
				 if x {
					 fmt.Printf("%d Is a part number\n", partNumberCandidate.PartNumber)
					 sum = sum + partNumberCandidate.PartNumber
				 }
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



func GetSymbolAndPartCandidates(schematic [][]rune) ([]SymbolLocation, []PartNumberCandidate) {
	var symbolLocations = make([]SymbolLocation,0)
	var partNumberCandidates = make([]PartNumberCandidate, 0)
	for i := 0; i < len(schematic); i++ {
		fmt.Printf("Line %d: %s\n", i, string(schematic[i]))
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
