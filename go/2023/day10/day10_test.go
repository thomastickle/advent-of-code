package day10

import (
	"aoc-2023/test"
	"aoc-2023/util"
	"testing"
)

func TestDay10Part1Test(t *testing.T) {
	lines := util.GetLinesFromFilename("day10test.txt")
	furthestDistance := LocateFurthestDistance(lines)
	test.AssertEquals(t, 4, furthestDistance)
}

func TestDay10Part1Test2(t *testing.T) {
	lines := util.GetLinesFromFilename("day10test2.txt")
	furthestDistance := LocateFurthestDistance(lines)
	test.AssertEquals(t, 8, furthestDistance)
}

func TestDay10Part1(t *testing.T) {
	lines := util.GetLinesFromFilename("day10input.txt")
	furthestDistance := LocateFurthestDistance(lines)
	test.AssertEquals(t, 7097, furthestDistance)
}
