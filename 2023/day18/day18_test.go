package day18

import (
	"aoc-2023/test"
	"aoc-2023/util"
	"testing"
)

func TestDay18Part1Test(t *testing.T) {
	lines := util.GetLinesFromFilename("day18test.txt")
	lavaSpace := ComputeLavaSpace(lines, false)
	test.AssertEquals(t, 62, lavaSpace)
}

func TestDay18Part1(t *testing.T) {
	lines := util.GetLinesFromFilename("day18input.txt")
	lavaSpace := ComputeLavaSpace(lines, false)
	test.AssertEquals(t, 40761, lavaSpace)
}

func TestDay18Part2Test(t *testing.T) {
	lines := util.GetLinesFromFilename("day18test.txt")
	lavaSpace := ComputeLavaSpace(lines, true)
	test.AssertEquals(t, 952408144115, lavaSpace)
}

func TestDay18Part2(t *testing.T) {
	lines := util.GetLinesFromFilename("day18input.txt")
	lavaSpace := ComputeLavaSpace(lines, true)
	test.AssertEquals(t, 106920098354636, lavaSpace)
}
