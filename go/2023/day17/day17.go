package day17

import (
	"container/heap"
	"fmt"
)

type Position struct {
	HeatLoss        int
	Row             int
	Column          int
	DirectionRow    int
	DirectionColumn int
	StepsTaken      int
	Index           int
}

type PriorityQueue []*Position

func (pq PriorityQueue) Len() int {
	return len(pq)
}

func (pq PriorityQueue) IsEmpty() bool {
	return pq.Len() == 0
}

func (pq PriorityQueue) Less(i, j int) bool {
	return pq[i].HeatLoss < pq[j].HeatLoss
}

func (pq PriorityQueue) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
	pq[i].Index = i
	pq[j].Index = j
}

func (pq *PriorityQueue) Push(x any) {
	n := len(*pq)
	position := x.(*Position)
	position.Index = n
	*pq = append(*pq, position)
}

func (pq *PriorityQueue) Pop() any {
	old := *pq
	n := len(old)
	position := old[n-1]
	old[n-1] = nil
	position.Index = -1
	*pq = old[0 : n-1]
	return position
}

func FindLowestHeatLoss(inputLines []string, minSteps, maxSteps int) int {
	grid := ConvertToIntGrid(inputLines)
	seen := map[string]bool{}
	pq := &PriorityQueue{}
	heap.Init(pq)
	heap.Push(pq, &Position{0, 0, 0, 0, 0, 0, 0})

	for !pq.IsEmpty() {
		position := heap.Pop(pq).(*Position)
		//fmt.Printf("R: %d; C: %d; RD: %d; Rc: %d; S: %d; HL:%d\n", position.Row, position.Column, position.DirectionRow, position.DirectionColumn, position.StepsTaken, position.HeatLoss)

		if position.Row == len(grid)-1 && position.Column == len(grid[0])-1 && position.StepsTaken >= minSteps {
			return position.HeatLoss
		}

		key := fmt.Sprintf("%d %d %d %d %d", position.Row, position.Column, position.DirectionRow, position.DirectionColumn, position.StepsTaken)
		if _, ok := seen[key]; ok {
			continue
		} 
		seen[key] = true
		

		for _, d := range [][]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}} {
			newRowDirection := d[0]
			newColumnDirection := d[1]
			newRow := position.Row + newRowDirection
			newColumn := position.Column + newColumnDirection

			if 0 > newRow || newRow > len(grid)-1 || 0 > newColumn || newColumn > len(grid[0])-1 {
				continue
			}

			if position.DirectionRow == -newRowDirection && position.DirectionColumn == -newColumnDirection {
				continue
			}

			step := 1
			if position.DirectionRow == newRowDirection && position.DirectionColumn == newColumnDirection {
				step += position.StepsTaken
			} else {
				if position.StepsTaken < minSteps && !(position.Row == 0 && position.Column == 0) {
					continue
				}
			}

			if step > maxSteps {
				continue
			}

			newPosition := &Position{
				HeatLoss:        position.HeatLoss + grid[newRow][newColumn],
				Row:             newRow,
				Column:          newColumn,
				DirectionRow:    newRowDirection,
				DirectionColumn: newColumnDirection,
				StepsTaken:      step,
			}

			heap.Push(pq, newPosition)
		}
	}
	return -1
}

func ConvertToIntGrid(lines []string) [][]int {
	grid := make([][]int, len(lines))
	for i, line := range lines {
		gridLine := make([]int, len(line))
		for j, aRune := range line {
			gridLine[j] = int(aRune - '0')
		}
		grid[i] = gridLine
	}
	return grid
}
