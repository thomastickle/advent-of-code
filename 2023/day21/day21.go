package day21

import (
	"container/list"
	"fmt"
	"image"
)

type Position image.Point

type Direction string

var Directions = map[string]Position{
	"U": {-1, 0},
	"D": {1, 0},
	"L": {0, -1},
	"R": {0, 1},
}

func GardenPlotsReachable(gardenPlot []string, steps int, render bool) int {
	startPosition := getStartPosition(gardenPlot)
	locations := FindPlots(startPosition, gardenPlot, steps, render)
	return len(locations)
}

func FindPlots(startPosition Position, gardenMap []string, maxSteps int, render bool) map[Position]bool {
	seen := make(map[int]map[Position]bool)
	seen[0] = make(map[Position]bool)
	seen[1] = make(map[Position]bool)

	queue := list.New()
	queue.PushBack(startPosition)

	for step := 1; step <= maxSteps; step++ {
		newQueue := list.New()

		for iterator := queue.Front(); iterator != nil; iterator = iterator.Next() {
			position := iterator.Value.(Position)
			populateNextPositions(position, gardenMap, seen[step%2], newQueue)
		}
		if render {
			renderMap(seen[step%2], gardenMap, step)
		}
		queue = newQueue
	}
	return seen[maxSteps%2]
}

func populateNextPositions(position Position, gardenMap []string, seen map[Position]bool, queue *list.List) {
	for _, direction := range Directions {
		candidatePosition := Position{X: position.X - direction.X, Y: position.Y - direction.Y}
		modX := candidatePosition.X % len(gardenMap)
		if modX < 0 {
			modX = len(gardenMap) + modX
		}
		modY := candidatePosition.Y % len(gardenMap[0])
		if modY < 0 {
			modY = len(gardenMap) + modY
		}
		if gardenMap[modX][modY] != '#' {
			if _, ok := seen[candidatePosition]; !ok {
				queue.PushBack(candidatePosition)
				seen[candidatePosition] = true
			}
		}
	}
}

func renderMap(locations map[Position]bool, gardenMap []string, step int) {
	fmt.Printf("\n\nRendering board for step %d.\n", step)
	for x, lines := range gardenMap {
		for y, aRune := range lines {
			if _, ok := locations[Position{x, y}]; ok {
				fmt.Printf("O")
				continue
			}
			fmt.Printf("%c", aRune)
		}
		fmt.Println("")
	}
}

func getRuneAt(location Position, lines []string) rune {
	mapX := location.X % len(lines)
	if mapX < 0 {
		mapX = len(lines) + mapX
	}
	mapY := location.Y % len(lines[0])
	if mapY < 0 {
		mapY = len(lines[mapX]) + mapY
	}
	return rune(lines[mapX][mapY])
}

func getStartPosition(lines []string) Position {
	for i, line := range lines {
		for j, aRune := range line {
			if aRune == 'S' {
				return Position{X: i, Y: j}
			}
		}
	}
	return Position{-1, -1}
}
