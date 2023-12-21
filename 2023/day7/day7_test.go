package day7

import (
	"aoc-2023/test"
	"aoc-2023/util"
	"testing"
)

func TestDay7Part1Test(t *testing.T) {
	lines := util.GetLinesFromFilename("day7test.txt")
	totalWinnings := GetTotalWinnings(lines, false)
	test.AssertEquals(t, 6440, totalWinnings)
}

func TestDay7Part1(t *testing.T) {
	lines := util.GetLinesFromFilename("day7input.txt")
	totalWinnings := GetTotalWinnings(lines, false)
	test.AssertEquals(t, 250347426, totalWinnings)
}

func TestDay7Part2Test(t *testing.T) {
	lines := util.GetLinesFromFilename("day7test.txt")
	totalWinnings := GetTotalWinnings(lines, true)
	test.AssertEquals(t, 5905, totalWinnings)
}

func TestDay7Part2(t *testing.T) {
	lines := util.GetLinesFromFilename("day7input.txt")
	totalWinnings := GetTotalWinnings(lines, true)
	test.AssertEquals(t, 251224870, totalWinnings)
}
