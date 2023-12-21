package day16

import (
	"math"

	"github.com/gammazero/deque"
)

type Cursor struct {
	Row             int
	Column          int
	DirectionRow    int
	DirectionColumn int
}

type Coordinates struct {
	Row int
	Column int
}

func CountActivatedTiles(grid [][]rune, startCursor Cursor) int {
	var deque deque.Deque[Cursor]
	seen := make(map[Cursor]bool)

	deque.PushBack(startCursor)

	for deque.Len() > 0 {
		a := deque.PopFront()
		
		row := a.Row + a.DirectionRow
		column := a.Column + a.DirectionColumn

		if row < 0 || row >= len(grid) || column < 0 || column >= len(grid[0]) {
			continue
		}

		aRune := grid[row][column]
		if aRune == '.' || (aRune == '-' && a.DirectionColumn != 0) || (aRune == '|' && a.DirectionRow != 0) {
			if !seen[Cursor{row, column, a.DirectionRow, a.DirectionColumn}] {
				seen[Cursor{row, column, a.DirectionRow, a.DirectionColumn}] = true
				deque.PushBack(Cursor{row, column, a.DirectionRow, a.DirectionColumn})
			}
		} else if aRune == '/' {
			if !seen[Cursor{row, column, -a.DirectionColumn, -a.DirectionRow}] {
				seen[Cursor{row, column, -a.DirectionColumn, -a.DirectionRow}] = true
				deque.PushBack(Cursor{row, column, -a.DirectionColumn, -a.DirectionRow})
			}
		} else if aRune == '\\' {
			if !seen[Cursor{row, column, a.DirectionColumn, a.DirectionRow}] {
				seen[Cursor{row, column, a.DirectionColumn, a.DirectionRow}] = true
				deque.PushBack(Cursor{row, column, a.DirectionColumn, a.DirectionRow})
			}
		} else if aRune == '|' {
			up := Cursor{row, column, 1, 0}
			down := Cursor{row, column, -1, 0}
			if !seen[up] {
				seen[up] = true
				deque.PushBack(up)
			}
			if !seen[down] {
				seen[down] = true
				deque.PushBack(down)
			}
		} else if aRune == '-' {
			left := Cursor{row, column, 0, -1}
			right := Cursor{row, column, 0 , 1}
			if !seen[left] {
				seen[left] = true
				deque.PushBack(left)
			}
			if !seen[right] {
				seen[right] = true
				deque.PushBack(right)
			}
		}
	}

	coords := make(map[Coordinates]bool)
	for key, _ := range seen {
		coords[Coordinates{key.Row, key.Column}] = true
	}

	return len(coords) 
}

func ConstructRuneGridFromLines(lines []string) [][]rune {
	grid := make([][]rune, len(lines))
	for i, row := range lines {
		grid[i] = []rune(row)
	}
	return grid
}

func GetMaxActivations(grid [][]rune) int {
	maxValue := math.MinInt
	for row, _ := range grid {
		maxValue = max(maxValue, CountActivatedTiles(grid, Cursor{row,-1, 0, 1}))
		maxValue = max(maxValue, CountActivatedTiles(grid, Cursor{row,len(grid[0]), 0, -1}))
	}


	for column, _ := range grid[0] {
		maxValue = max(maxValue, CountActivatedTiles(grid, Cursor{-1, column, 1, 0}))
		maxValue = max(maxValue, CountActivatedTiles(grid, Cursor{len(grid), column, 1, 0}))
	}

	return maxValue
}
