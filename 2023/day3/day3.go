package day3

import (
	"strconv"
	"strings"
	"unicode"
)

type SymbolLocation struct {
	Char   rune
	Row    int
	Column int
}

type PartNumber struct {
	PartNumber  int
	Row         int
	StartColumn int
	EndColumn   int
}

func GetSumOfPartNumbers(partNumbers []PartNumber) int {
	sum := 0
	for _, partNumber := range partNumbers {
		sum += partNumber.PartNumber
	}
	return sum
}

func GetSumOfGearRatios(partNumbers []PartNumber, symbolLocations []SymbolLocation) int {
    sum := 0
	for _, symbolLocation := range symbolLocations {
		if symbolLocation.Char == '*' {
            sum += getGearRatiosForSymbol(partNumbers, symbolLocation)
		}
	}
    return sum
}

func getGearRatiosForSymbol(partNumbers []PartNumber, symbolLocation SymbolLocation) int {
	var gearRatioCandidates = make([]int, 0)
	for _, partNumberCandidate := range partNumbers {
		if symbolLocation.Row-1 <= partNumberCandidate.Row && partNumberCandidate.Row <= symbolLocation.Row+1 {
			if isInsideColumnRange(symbolLocation.Column, partNumberCandidate.StartColumn, partNumberCandidate.EndColumn) {
				gearRatioCandidates = append(gearRatioCandidates, partNumberCandidate.PartNumber)
			}
		}
	}
    if len(gearRatioCandidates) == 2 {
        return gearRatioCandidates[0] * gearRatioCandidates[1]
    }
    return 0 
}

func GetPartNumbers(partNumberCandidates []PartNumber, symbolLocations []SymbolLocation) []PartNumber {
	var partNumbers []PartNumber
	for _, symbolLocation := range symbolLocations {
		for _, partNumberCandidate := range partNumberCandidates {
			if symbolLocation.Row-1 <= partNumberCandidate.Row && partNumberCandidate.Row <= symbolLocation.Row+1 {
				if isInsideColumnRange(symbolLocation.Column, partNumberCandidate.StartColumn, partNumberCandidate.EndColumn) {
					partNumbers = append(partNumbers, partNumberCandidate)
				}
			}
		}
	}
	return partNumbers
}

func isInsideColumnRange(column int, columnRangeStart int, columnRangeEnd int) bool {
	for i := column - 1; i <= column+1; i++ {
		if columnRangeStart <= i && i <= columnRangeEnd {
			return true
		}
	}
	return false
}

func GetAllPartNumberCandidates(lines []string) ([]PartNumber, []SymbolLocation) {
	partNumbers := make([]PartNumber, 0)
	symbolLocations := make([]SymbolLocation, 0)

	for i, line := range lines {
		partNumberResult, symbolLocationsResult := extractPartNumberCandidates(line, i)
		partNumbers = append(partNumbers, partNumberResult...)
		symbolLocations = append(symbolLocations, symbolLocationsResult...)
	}

	return partNumbers, symbolLocations
}

func extractPartNumberCandidates(line string, row int) ([]PartNumber, []SymbolLocation) {
	var partNumberCandidates = make([]PartNumber, 0)
	var symbolLocations = make([]SymbolLocation, 0)
	runes := []rune(line)
	var buffer strings.Builder
	for i := 0; i < len(runes); i++ {
		if unicode.IsDigit(runes[i]) {
			buffer.WriteRune(runes[i])
		} else {
			if runes[i] != '.' {
				var symbolLocation = SymbolLocation{runes[i], row, i}
				symbolLocations = append(symbolLocations, symbolLocation)
			}
			if buffer.Len() > 0 {
				partNumber, _ := strconv.Atoi(buffer.String())
				partNumberCandidate := PartNumber{PartNumber: partNumber, Row: row, StartColumn: i - buffer.Len(), EndColumn: i - 1}
				partNumberCandidates = append(partNumberCandidates, partNumberCandidate)
			}
			buffer.Reset()
		}
	}

	// Be sure to capture any value that was still being built out.
	if buffer.Len() > 0 {
		partNumber, _ := strconv.Atoi(buffer.String())
		partNumberCandidate := PartNumber{PartNumber: partNumber, Row: row, StartColumn: len(runes) - buffer.Len(), EndColumn: len(runes) - 1}
		partNumberCandidates = append(partNumberCandidates, partNumberCandidate)
	}

	return partNumberCandidates, symbolLocations
}
