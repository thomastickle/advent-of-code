package platform

import (
	"aoc-2023/util"
	"testing"
)

func TestConstructPlatform(t *testing.T) {
	const expectedOutput = "100205603004"
	lines := util.GetLinesFromFilename("platforminput.txt")
	record := ConstructPlatform(lines)
	if expectedOutput != string(record.Map) {
		t.Fatalf("Expected value [%s] did not match actual value [%s]", expectedOutput, string(record.Map))
	}
}

func TestGetStringRepresentation(t *testing.T) {
	const expectedValue = "[[1002]\n [0560]\n [3004]]\n"
	lines := util.GetLinesFromFilename("platforminput.txt")
	platform := ConstructPlatform(lines)
	stringPlatform := platform.GetStringRepresentation()
	if stringPlatform != expectedValue {
		t.Fatalf("Expected value \n%s did not match \n%s", expectedValue, stringPlatform)
	}
}

func TestRotate90DegreesClockwise(t *testing.T) {
	const expectedValue = ""
	lines := util.GetLinesFromFilename("platforminput.txt")
	platform := ConstructPlatform(lines)
	platform.Rotate90Clockwise()
	stringPlatform := platform.GetStringRepresentation()
	t.Fatalf("Stuff: \n%s\n", stringPlatform)
}
