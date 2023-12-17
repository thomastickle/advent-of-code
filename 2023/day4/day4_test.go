package day4

import (
	"aoc-2023/test"
	"aoc-2023/util"
	"testing"
)

func TestProcessGamesTest(t *testing.T) {
	expectedWinnings := 13
	lines := util.GetLinesFromFilename("day4test.input")
	winnings := ComputeWinningsForGames(lines)
	test.AssertEquals(t, expectedWinnings, winnings)
}

func TestProcessGames(t *testing.T) {
	expectedWinnings := 25010 
	lines := util.GetLinesFromFilename("day4.input")
	winnings := ComputeWinningsForGames(lines)
	test.AssertEquals(t, expectedWinnings, winnings)
}