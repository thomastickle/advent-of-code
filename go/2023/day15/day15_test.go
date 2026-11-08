package day15

import (
	"aoc-2023/test"
	"aoc-2023/util"
	"testing"
)

func TestCalculateSumOfHashesTest(t *testing.T) {
	lines := util.GetLinesFromFilename("day15test.txt")
	sum := CalculateSumOfHashes(lines[0])
	test.AssertEquals(t, 1320, sum)
}

func TestCalculateSumOfHashes(t *testing.T) {
	lines := util.GetLinesFromFilename("day15input.txt")
	sum := CalculateSumOfHashes(lines[0])
	test.AssertEquals(t, 511498, sum)
}

func TestFocusPowerTest(t *testing.T) {
	lines := util.GetLinesFromFilename("day15test.txt")
	sum := FocusPower(lines[0])
	test.AssertEquals(t, 145, sum)
}

func TestFocusPower(t *testing.T) {
	lines := util.GetLinesFromFilename("day15input.txt")
	sum := FocusPower(lines[0])
	test.AssertEquals(t, 284674, sum)
}
