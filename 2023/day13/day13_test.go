package day13

import (
	"aoc-2023/test"
	"aoc-2023/util"
	"testing"
)

func TestPart1Test(t *testing.T) {
	lines := util.GetLinesFromFilename("day13input_test.txt")
	patternSets := GetPatterns(lines)
	patterns := ConvertLinesToPattern(patternSets)
	score := ScorePatterns(patterns)
	test.AssertEquals(t, 405, score)
}

func TestPart1(t *testing.T) {
	lines := util.GetLinesFromFilename("day13input.txt")
	patternSets := GetPatterns(lines)
	patterns := ConvertLinesToPattern(patternSets)
	score := ScorePatterns(patterns)
	test.AssertEquals(t, 34889, score)
}

func TestPart2Test(t *testing.T) {
	lines := util.GetLinesFromFilename("day13input_test2.txt")
	patternSets := GetPatterns(lines)
	patterns := ConvertLinesToPattern(patternSets)
	score := ScorePatterns2(patterns)
	test.AssertEquals(t, 1400, score)
}

func TestPart2(t *testing.T) {
	lines := util.GetLinesFromFilename("day13input.txt")
	patternSets := GetPatterns(lines)
	patterns := ConvertLinesToPattern(patternSets)
	score := ScorePatterns2(patterns)
	test.AssertEquals(t, 34224, score)
}
