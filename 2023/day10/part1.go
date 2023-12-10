package day10

import (
	"fmt"
	"strings"
)

type Position struct {
	X int
	Y int
}

type Direction struct {
	North int
	South int
	East int
	West int
}

 


func Part1(lines []string) int {
	inputTable := ConvertInputToTable(lines)
	startLocation := FindStartLocation(lines)
	startLocation = Position{X:1, Y: 2}
	inputTable[startLocation.X][startLocation.Y-1] = 'F'
	FindFurthestDistance(inputTable, startLocation)
	return 0
}

func PrintTable(table [][]rune) {
	for _, row := range table {
		fmt.Print("[")
		for _, column := range row {
			fmt.Printf("%c,", column)
		}
		fmt.Println("]")
	}
}

func FindFurthestDistance(inputTable [][]rune, previousLocation Position) {
/*	outputTable := make([][]int, len(inputTable))
	for i := 0; i < len(inputTable); i++ {
		row := make([]int, len(inputTable[i]))
		for j := 0; j < len(inputTable); j++ {
			row[j] = 0
		}
		outputTable[i] = row
	}
*/

	PrintTable(inputTable)	
	connected := GetConnected(inputTable, previousLocation)	

	fmt.Println("Connected: ", connected)
}

func GetConnected(inputTable [][]rune, currentPosition Position) []Position {
	var connectedPositions []Position
	currentRune := inputTable[currentPosition.X][currentPosition.Y]
	
	if currentRune == '|' {
		northRune := inputTable[currentPosition.X - 1][currentPosition.Y]
		if northRune == '|' || northRune == 'F' || northRune == '7' {
			connectedPositions = append(connectedPositions, Position{X: currentPosition.X - 1, Y:currentPosition.Y})
		}

		southRune := inputTable[currentPosition.X + 1][currentPosition.Y]
		if southRune == '|' || southRune == 'L' || southRune == 'J' {
			connectedPositions = append(connectedPositions, Position{X: currentPosition.X + 1, Y:currentPosition.Y})
		}
	}

	if currentRune == '-' {
		westRune := inputTable[currentPosition.X][currentPosition.Y - 1]
		fmt.Printf("Current Rune: %c West Rune: %c\n", currentRune, westRune)
		if westRune == '-' || westRune == 'L' || westRune == 'F' { 
			connectedPositions = append(connectedPositions, Position{X: currentPosition.X, Y:currentPosition.Y - 1})
		}

		eastRune := inputTable[currentPosition.X][currentPosition.Y + 1]
		fmt.Printf("Current Rune: %c East Rune: %c\n", currentRune, eastRune)
		if eastRune == '-' || eastRune == 'J' || eastRune == '7' { 
			connectedPositions = append(connectedPositions, Position{X: currentPosition.X, Y:currentPosition.Y + 1})
		}
	}

	if currentRune == 'F' {

	}

	return connectedPositions
}

func ConvertInputToTable(lines []string) [][]rune {
	table := make([][]rune, len(lines))

	for i, line := range lines {
		tablerow := make([]rune, len(line))
		for j, char := range string(lines[i]) {
			tablerow[j] = char	
		}
		table[i] = tablerow
	}

	return table
}

func FindStartLocation(lines []string) Position {
	startLocation := Position{X:0, Y:0} 

	for i, line := range lines {
		j := strings.Index(line, "S")
		if j >= 0 {
			startLocation.X = i
			startLocation.Y = j
		}
	}
	return startLocation
}
