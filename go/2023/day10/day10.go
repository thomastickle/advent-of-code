package day10

import "strings"

type Position struct {
	X int
	Y int
}

func LocateFurthestDistance(lines []string) int {
	inputTable := ConvertInputToTable(lines)
	startLocation := FindStartLocation(lines)
	return FindFurthestDistance(inputTable, startLocation)
}

func FindFurthestDistance(inputTable [][]rune, startPosition Position) int {
	outputTable := make([][]int, len(inputTable))
	for i := 0; i < len(inputTable); i++ {
		row := make([]int, len(inputTable[i]))
		for j := 0; j < len(inputTable); j++ {
			row[j] = -1
		}
		outputTable[i] = row
	}

	var connectedPositions []Position
	connectedPositions = append(connectedPositions, startPosition)
	value := 0

	for len(connectedPositions) > 0 {
		UpdateOutputTable(outputTable, connectedPositions, value)
		for _, position := range connectedPositions {
			x := GetConnected(inputTable, position)
			connectedPositions = append(connectedPositions, x...)
		}

		connectedPositions = PruneConnectedPositions(outputTable, connectedPositions)
		value++
	}

	// Subtract 1 because we always will overincrement
	return value - 1
}

func PruneConnectedPositions(table [][]int, positions []Position) []Position {
	var outputPositions []Position
	for _, position := range positions {
		if table[position.X][position.Y] == -1 {
			outputPositions = append(outputPositions, position)
		}
	}
	return outputPositions
}

func UpdateOutputTable(outputTable [][]int, positions []Position, value int) {
	for _, position := range positions {
		outputTable[position.X][position.Y] = value
	}
	/*
		fmt.Println("OutputTable:")
		for _, row := range outputTable {
			fmt.Print("[")
			for _, value := range row {
				if value == -1 {
					fmt.Printf(".")
				} else {
					fmt.Printf("X")
				}
			}
			fmt.Print("]\n")
		}*/
}

func GetConnected(inputTable [][]rune, currentPosition Position) []Position {
	var connectedPositions []Position
	currentRune := inputTable[currentPosition.X][currentPosition.Y]

	if currentRune == '|' {
		northRune := inputTable[currentPosition.X-1][currentPosition.Y]
		if northRune == '|' || northRune == 'F' || northRune == '7' {
			connectedPositions = append(connectedPositions, Position{X: currentPosition.X - 1, Y: currentPosition.Y})
		}

		southRune := inputTable[currentPosition.X+1][currentPosition.Y]
		if southRune == '|' || southRune == 'L' || southRune == 'J' {
			connectedPositions = append(connectedPositions, Position{X: currentPosition.X + 1, Y: currentPosition.Y})
		}
	}

	if currentRune == '-' {
		westRune := inputTable[currentPosition.X][currentPosition.Y-1]
		if westRune == '-' || westRune == 'L' || westRune == 'F' {
			connectedPositions = append(connectedPositions, Position{X: currentPosition.X, Y: currentPosition.Y - 1})
		}

		eastRune := inputTable[currentPosition.X][currentPosition.Y+1]
		if eastRune == '-' || eastRune == 'J' || eastRune == '7' {
			connectedPositions = append(connectedPositions, Position{X: currentPosition.X, Y: currentPosition.Y + 1})
		}
	}

	if currentRune == 'L' {
		northRune := inputTable[currentPosition.X-1][currentPosition.Y]
		if northRune == '|' || northRune == 'F' || northRune == '7' {
			connectedPositions = append(connectedPositions, Position{X: currentPosition.X - 1, Y: currentPosition.Y})
		}

		eastRune := inputTable[currentPosition.X][currentPosition.Y+1]
		if eastRune == '-' || eastRune == 'J' || eastRune == '7' {
			connectedPositions = append(connectedPositions, Position{X: currentPosition.X, Y: currentPosition.Y + 1})
		}
	}

	if currentRune == 'J' {
		northRune := inputTable[currentPosition.X-1][currentPosition.Y]
		if northRune == '|' || northRune == 'F' || northRune == '7' {
			connectedPositions = append(connectedPositions, Position{X: currentPosition.X - 1, Y: currentPosition.Y})
		}

		westRune := inputTable[currentPosition.X][currentPosition.Y-1]
		if westRune == '-' || westRune == 'L' || westRune == 'F' {
			connectedPositions = append(connectedPositions, Position{X: currentPosition.X, Y: currentPosition.Y - 1})
		}
	}

	if currentRune == '7' {
		westRune := inputTable[currentPosition.X][currentPosition.Y-1]
		if westRune == '-' || westRune == 'F' || westRune == 'L' {
			connectedPositions = append(connectedPositions, Position{X: currentPosition.X, Y: currentPosition.Y - 1})
		}

		southRune := inputTable[currentPosition.X+1][currentPosition.Y]
		if southRune == '|' || southRune == 'L' || southRune == 'J' {
			connectedPositions = append(connectedPositions, Position{X: currentPosition.X + 1, Y: currentPosition.Y})
		}
	}

	if currentRune == 'F' {
		eastRune := inputTable[currentPosition.X][currentPosition.Y+1]
		if eastRune == '-' || eastRune == 'J' || eastRune == '7' {
			connectedPositions = append(connectedPositions, Position{X: currentPosition.X, Y: currentPosition.Y + 1})
		}

		southRune := inputTable[currentPosition.X+1][currentPosition.Y]
		if southRune == '|' || southRune == 'L' || southRune == 'J' {
			connectedPositions = append(connectedPositions, Position{X: currentPosition.X + 1, Y: currentPosition.Y})
		}
	}

	if currentRune == 'S' {
		north := currentPosition.X - 1
		south := currentPosition.X + 1
		west := currentPosition.Y - 1
		east := currentPosition.Y + 1

		northRune := '.'
		southRune := '.'
		westRune := '.'
		eastRune := '.'

		if north >= 0 {
			northRune = inputTable[north][currentPosition.Y]
		}

		if south < len(inputTable) {
			southRune = inputTable[south][currentPosition.Y]
		}

		if west >= 0 {
			westRune = inputTable[currentPosition.X][west]
		}

		if east < len(inputTable[currentPosition.X]) {
			eastRune = inputTable[currentPosition.X][east]
		}

		if northRune == '|' || northRune == 'F' || northRune == '7' {
			connectedPositions = append(connectedPositions, Position{X: currentPosition.X - 1, Y: currentPosition.Y})
		}

		if southRune == '|' || southRune == 'L' || southRune == 'J' {
			connectedPositions = append(connectedPositions, Position{X: currentPosition.X + 1, Y: currentPosition.Y})
		}

		if westRune == '-' || westRune == 'L' || westRune == 'F' {
			connectedPositions = append(connectedPositions, Position{X: currentPosition.X, Y: currentPosition.Y - 1})
		}

		if eastRune == '-' || eastRune == 'J' || eastRune == '7' {
			connectedPositions = append(connectedPositions, Position{X: currentPosition.X, Y: currentPosition.Y + 1})
		}
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
	startLocation := Position{X: 0, Y: 0}

	for i, line := range lines {
		j := strings.Index(line, "S")
		if j >= 0 {
			startLocation.X = i
			startLocation.Y = j
		}
	}
	return startLocation
}
