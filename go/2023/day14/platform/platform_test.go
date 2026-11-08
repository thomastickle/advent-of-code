package platform

import (
	"aoc-2023/util"
	"testing"
)

func TestConstructPlatform(t *testing.T) {
	const expectedOutput = "100205603004"
	lines := util.GetLinesFromFilename("platforminput_test.txt")
	record := ConstructPlatform(lines)
	if expectedOutput != string(record.Map) {
		t.Fatalf("Expected value [%s] did not match actual value [%s]", expectedOutput, string(record.Map))
	}
}

func TestGetStringRepresentation(t *testing.T) {
	const expectedValue = "[[1002]\n [0560]\n [3004]]\n"
	lines := util.GetLinesFromFilename("platforminput_test.txt")
	platform := ConstructPlatform(lines)
	stringPlatform := platform.GetPrintableStringRepresentation()
	if stringPlatform != expectedValue {
		t.Fatalf("Expected value\n%s did not match actual value\n%s", expectedValue, stringPlatform)
	}
}

func TestRotate90DegreesClockwise(t *testing.T) {
	const expectedValue = "[[301]\n [050]\n [060]\n [402]]\n"
	lines := util.GetLinesFromFilename("platforminput_test.txt")
	platform := ConstructPlatform(lines)
	platform.Rotate90Clockwise()
	stringPlatform := platform.GetPrintableStringRepresentation()
	if expectedValue != stringPlatform {
		t.Fatalf("Expected value\n%s did not match actual value\n%s", expectedValue, stringPlatform)
	}
}

func TestTilt(t *testing.T) {
	const expectedValue = "##....OOOO.......OOO..OO#....O......#..O.......O#.##.#..O#.#.#....O#...#.O#....O.....#.......O#..O#."
	lines := util.GetLinesFromFilename("platforminput_test2.txt")
	platform := ConstructPlatform(lines)
	platform.Rotate90Clockwise()
	platform.TiltRight()
	if string(platform.Map) != expectedValue {
		t.Fatalf("Expected value [%s] did not match actual output [%s]", expectedValue, string(platform.Map))
	}
}
