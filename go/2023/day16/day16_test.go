package day16

import (
	"aoc-2023/test"
	"aoc-2023/util"
	"testing"
)

func TestDay16Part1(t *testing.T) {
	lines := util.GetLinesFromFilename("day16test.txt")
	grid := ConstructRuneGridFromLines(lines)
	activatedCount := CountActivatedTiles(grid)
	test.AssertEquals(t, 46, activatedCount)
}

func TestDay16(t *testing.T) {
	lines := util.GetLinesFromFilename("day16input.txt")
	grid := ConstructRuneGridFromLines(lines)
	activatedCount := CountActivatedTiles(grid)
	test.AssertEquals(t, 7996, activatedCount)
}
