package day2

import (
	"aoc-2023/util"
	"testing"
)

func TestPart1Test(t *testing.T) {
	const expectedValue = 8
	lines := util.GetLinesFromFilename("day2input_test.txt")
	sum := SumOfValidGames(lines)
	if (expectedValue != sum) {
		t.Fatalf("Expected value %d does not match actual value %d", expectedValue, sum)
	}
}

func TestPart1(t *testing.T) {
	const expectedValue = 2256 
	lines := util.GetLinesFromFilename("day2input.txt")
	sum := SumOfValidGames(lines)
	if (expectedValue != sum) {
		t.Fatalf("Expected value %d does not match actual value %d", expectedValue, sum)
	}
}
