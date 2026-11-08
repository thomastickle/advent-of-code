package day12

import (
	"aoc-2023/test"
	"aoc-2023/util"
	"testing"
)

func TestCountCombinations(t *testing.T) {
	testString := "???.###"
	testValues := []int{1, 1, 3}
	result := CountCombinations([]rune(testString), testValues)
	test.AssertEquals(t, 1, result)

	testString = ".??..??...?##."
	result = CountCombinations([]rune(testString), testValues)
	test.AssertEquals(t, 4, result)
}

func TestDay12Part1Test(t *testing.T) {
	lines := util.GetLinesFromFilename("day12test.txt")
	totalCombinations := SumCombinations(lines)
	test.AssertEquals(t, 21, totalCombinations)
}

func TestDay12Part1(t *testing.T) {
	lines := util.GetLinesFromFilename("day12input.txt")
	totalCombinations := SumCombinations(lines)
	test.AssertEquals(t, 7251, totalCombinations)
}

func TestDay12Part2Test(t *testing.T) {
	lines := util.GetLinesFromFilename("day12test.txt")
	totalCombinations := SumCombinationsFolded(lines)
	test.AssertEquals(t, 525152, totalCombinations)
}

func TestDay12Part2(t *testing.T) {
	lines := util.GetLinesFromFilename("day12input.txt")
	totalCombinations := SumCombinationsFolded(lines)
	test.AssertEquals(t, 2128386729962, totalCombinations)
}
