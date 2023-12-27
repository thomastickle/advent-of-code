package day4

import (
	"aoc-2023/test"
	"aoc-2023/util"
	"testing"
)

func TestPart1Test(t *testing.T) {
	expectedWinnings := 13
	lines := util.GetLinesFromFilename("day4test.txt")
	winnings := ComputeWinningsForGames(lines)
	test.AssertEquals(t, expectedWinnings, winnings)
}

func TestPart1(t *testing.T) {
	expectedWinnings := 25010
	lines := util.GetLinesFromFilename("day4input.txt")
	winnings := ComputeWinningsForGames(lines)
	test.AssertEquals(t, expectedWinnings, winnings)
}

func TestPart2Test(t *testing.T) {
	expectedWinnings := 30
	lines := util.GetLinesFromFilename("day4test.txt")
	winnings := ComputeTotalCardsWon(lines)
	test.AssertEquals(t, expectedWinnings, winnings)
}

func TestPart2(t *testing.T) {
	expectedWinnings := 9924412
	lines := util.GetLinesFromFilename("day4input.txt")
	winnings := ComputeTotalCardsWon(lines)
	test.AssertEquals(t, expectedWinnings, winnings)
}
