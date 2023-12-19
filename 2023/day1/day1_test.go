package day1

import (
	"aoc-2023/util"
	"testing"
)

func TestPart1Test(t *testing.T) {
	const expectedValue = 142
	lines := util.GetLinesFromFilename("day1input_test.txt")
	sum := FindSumOfAllFirstLastDigits(lines)
	if expectedValue != sum {
		t.Fatalf("Expected value %d does not match actual value %d\n", expectedValue, sum)
	}
}

func TestPart1(t *testing.T) {
	const expectedValue = 54605
	lines := util.GetLinesFromFilename("day1input.txt")
	sum := FindSumOfAllFirstLastDigits(lines)
	if expectedValue != sum {
		t.Fatalf("Expected value %d does not match actual value %d\n", expectedValue, sum)
	}
}

func TestPart2Test(t *testing.T) {
	const expectedValue = 281
	lines := util.GetLinesFromFilename("day1input_test2.txt")
	lines = SanitizeLines(lines)
	sum := FindSumOfAllFirstLastDigits(lines)
	if expectedValue != sum {
		t.Fatalf("Expected value %d does not match actual value %d\n", expectedValue, sum)
	}
}

func TestPart2(t *testing.T) {
	const expectedValue = 55429
	lines := util.GetLinesFromFilename("day1input.txt")
	lines = SanitizeLines(lines)
	sum := FindSumOfAllFirstLastDigits(lines)
	if expectedValue != sum {
		t.Fatalf("Expected value %d does not match actual value %d\n", expectedValue, sum)
	}
}
