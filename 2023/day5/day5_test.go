package day5

import (
	"aoc-2023/test"
	"aoc-2023/util"
	"testing"
)

func TestDay5Part1Test(t *testing.T) {
	lines := util.GetLinesFromFilename("day5input_test.txt")
	lowestLocationNumber := FindLowestLocationNumber(lines)
	test.AssertEquals(t, 35, lowestLocationNumber)
}

func TestDay5Part1(t *testing.T) {
	lines := util.GetLinesFromFilename("day5input.txt")
	lowestLocationNumber := FindLowestLocationNumber(lines)
	test.AssertEquals(t, 177942185, lowestLocationNumber)
}
