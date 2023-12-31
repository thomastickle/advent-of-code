package day5

import (
	"aoc-2023/test"
	"aoc-2023/util"
	"testing"
)

func TestDay5Part1Test(t *testing.T) {
	lines := util.GetLinesFromFilename("day5test.txt")
	lowestLocationNumber := FindLowestLocationNumber(lines)
	test.AssertEquals(t, 35, lowestLocationNumber)
}

func TestDay5Part1(t *testing.T) {
	lines := util.GetLinesFromFilename("day5input.txt")
	lowestLocationNumber := FindLowestLocationNumber(lines)
	test.AssertEquals(t, 177942185, lowestLocationNumber)
}

func TestDay5Part2Test(t *testing.T) {
	lines := util.GetLinesFromFilename("day5test.txt")
	lowestLocationNumber := FindLowestLocationNumber2(lines)
	test.AssertEquals(t, 46, lowestLocationNumber)
}

func TestDay5Part2(t *testing.T) {
	lines := util.GetLinesFromFilename("day5input.txt")
	lowestLocationNumber := FindLowestLocationNumber2(lines)
	test.AssertEquals(t, 69841803, lowestLocationNumber)
}
