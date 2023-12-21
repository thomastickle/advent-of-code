package day6

import (
	"aoc-2023/test"
	"aoc-2023/util"
	"testing"
)

func TestDay6Part1Test(t *testing.T) {
	lines := util.GetLinesFromFilename("day6test.txt")
	races := GetRacesFromLine(lines)
	waysToWin := WaysToWin(races)
	test.AssertEquals(t, 288, waysToWin)
}

func TestDay6Part1(t *testing.T) {
	lines := util.GetLinesFromFilename("day6input.txt")
	races := GetRacesFromLine(lines)
	waysToWin := WaysToWin(races)
	test.AssertEquals(t, 1108800, waysToWin)
}

func TestDay6Part2Test(t *testing.T) {
	lines := util.GetLinesFromFilename("day6test.txt")
	races := GetRaceFromLine(lines)
	waysToWin := WaysToWin(races)
	test.AssertEquals(t, 71503, waysToWin)
}

func TestDay6Part2(t *testing.T) {
	lines := util.GetLinesFromFilename("day6input.txt")
	races := GetRaceFromLine(lines)
	waysToWin := WaysToWin(races)
	test.AssertEquals(t, 36919753, waysToWin)
}
