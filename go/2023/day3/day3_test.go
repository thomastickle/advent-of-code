package day3

import (
	"aoc-2023/util"
	"testing"
)

func TestPart1Test(t *testing.T) {
	const expectedValue = 4361
	lines := util.GetLinesFromFilename("day3test.input")
	partNumberCandidates, symbols := GetAllPartNumberCandidates(lines)
	partNumbers := GetPartNumbers(partNumberCandidates, symbols)
	sum := GetSumOfPartNumbers(partNumbers)
	if expectedValue != sum {
		t.Fatalf("Expected value %d did not match actual value %d\n", expectedValue, sum)
	}
}

func TestPart1(t *testing.T) {
	const expectedValue = 498559 
	lines := util.GetLinesFromFilename("day3.input")
	partNumberCandidates, symbols := GetAllPartNumberCandidates(lines)
	partNumbers := GetPartNumbers(partNumberCandidates, symbols)
	sum := GetSumOfPartNumbers(partNumbers)
	if expectedValue != sum {
		t.Fatalf("Expected value %d did not match actual value %d\n", expectedValue, sum)
	}
}


func TestPart2Test(t *testing.T) {
	const expectedValue = 467835 
	lines := util.GetLinesFromFilename("day3test.input")
	partNumberCandidates, symbols := GetAllPartNumberCandidates(lines)
	partNumbers := GetPartNumbers(partNumberCandidates, symbols)
	sum := GetSumOfGearRatios(partNumbers, symbols)
	if expectedValue != sum {
		t.Fatalf("Expected value %d did not match actual value %d\n", expectedValue, sum)
	}
}

func TestPart2(t *testing.T) {
	const expectedValue = 72246648 
	lines := util.GetLinesFromFilename("day3.input")
	partNumberCandidates, symbols := GetAllPartNumberCandidates(lines)
	partNumbers := GetPartNumbers(partNumberCandidates, symbols)
	sum := GetSumOfGearRatios(partNumbers, symbols)
	if expectedValue != sum {
		t.Fatalf("Expected value %d did not match actual value %d\n", expectedValue, sum)
	}
}