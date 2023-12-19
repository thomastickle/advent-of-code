package day14

import (
	"aoc-2023/test"
	"aoc-2023/util"
	"testing"
)

func TestDay14Part1Test(t *testing.T) {
	lines := util.GetLinesFromFilename("day14input_test.txt")
	platformMap := ConvertLinesToPlatform(lines)
	load := CalculateLoad(platformMap)
	test.AssertEquals(t, 136, load)
}

func TestDay14Part1(t *testing.T) {
	lines := util.GetLinesFromFilename("day14input.txt")
	platformMap := ConvertLinesToPlatform(lines)
	load := CalculateLoad(platformMap)
	test.AssertEquals(t, 136, load)
}
