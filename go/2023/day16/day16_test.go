package day16

import (
	"aoc-2023/test"
	"aoc-2023/util"
	"testing"
)

func TestDay16Part1Test(t *testing.T) {
	lines := util.GetLinesFromFilename("day16test.txt")
	grid := ConstructRuneGridFromLines(lines)
	activatedCount := CountActivatedTiles(grid, Cursor{0, -1, 0, 1})
	test.AssertEquals(t, 46, activatedCount)
}

func TestDay16Part1(t *testing.T) {
	lines := util.GetLinesFromFilename("day16input.txt")
	grid := ConstructRuneGridFromLines(lines)
	activatedCount := CountActivatedTiles(grid, Cursor{0, -1, 0, 1})
	test.AssertEquals(t, 7996, activatedCount)
}

func TestDay16Part2Test(t *testing.T) {
	lines := util.GetLinesFromFilename("day16test.txt")
	grid := ConstructRuneGridFromLines(lines)
	activatedCount := GetMaxActivations(grid)
	test.AssertEquals(t, 51, activatedCount)
}

func TestDay16Part2(t *testing.T) {
	lines := util.GetLinesFromFilename("day16input.txt")
	grid := ConstructRuneGridFromLines(lines)
	activatedCount := GetMaxActivations(grid)
	test.AssertEquals(t, 8239, activatedCount)
}
