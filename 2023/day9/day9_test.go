package day9

import (
	"aoc-2023/util"
	"testing"
)

func TestPart1Test(t *testing.T) {
	const expectedValue = 114
	lines := util.GetLinesFromFilename("day9test.input")
	sum := ComputeSumOfPredictions(lines, GetNextValue)
	if expectedValue != sum {
		t.Fatalf("Expected value %d did not match actual value %d", expectedValue, sum)
	}
}

func TestPart1(t *testing.T) {
	const expectedValue = 1684566095
	lines := util.GetLinesFromFilename("day9.input")
	sum := ComputeSumOfPredictions(lines, GetNextValue)
	if expectedValue != sum {
		t.Fatalf("Expected value %d did not match actual value %d", expectedValue, sum)
	}
}

func TestPart2Test(t *testing.T) {
	const expectedValue = 2 
	lines := util.GetLinesFromFilename("day9test.input")
	sum := ComputeSumOfPredictions(lines, GetPreviousValue)
	if expectedValue != sum {
		t.Fatalf("Expected value %d did not match actual value %d", expectedValue, sum)
	}
}

func TestPart2(t *testing.T) {
	const expectedValue = 1136
	lines := util.GetLinesFromFilename("day9.input")
	sum := ComputeSumOfPredictions(lines, GetPreviousValue)
	if expectedValue != sum {
		t.Fatalf("Expected value %d did not match actual value %d", expectedValue, sum)
	}
}
