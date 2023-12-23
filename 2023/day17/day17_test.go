package day17

import (
	"aoc-2023/test"
	"aoc-2023/util"
	"testing"
)

func TestDay17Part1Test(t *testing.T) {
	lines := util.GetLinesFromFilename("day17test.txt")
	heatLoss := FindLowestHeatLoss(lines, 0, 3)
	test.AssertEquals(t, 102, heatLoss)
}

func TestDay17Part1(t *testing.T) {
	lines := util.GetLinesFromFilename("day17input.txt")
	heatLoss := FindLowestHeatLoss(lines, 0, 3)
	test.AssertEquals(t, 1263, heatLoss)
}

func TestDay17Part2Test(t *testing.T) {
	lines := util.GetLinesFromFilename("day17test.txt")
	heatLoss := FindLowestHeatLoss(lines, 4, 10)
	test.AssertEquals(t, 94, heatLoss)
}

func TestDay17Part2Test2(t *testing.T) {
	lines := util.GetLinesFromFilename("day17test2.txt")
	heatLoss := FindLowestHeatLoss(lines, 4, 10)
	test.AssertEquals(t, 71, heatLoss)
}

func TestDay17Part2(t *testing.T) {
	lines := util.GetLinesFromFilename("day17input.txt")
	heatLoss := FindLowestHeatLoss(lines, 4, 10)
	test.AssertEquals(t, 1263, heatLoss)
}
