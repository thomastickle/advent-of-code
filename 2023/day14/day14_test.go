package day14

import (
	"aoc-2023/day14/platform"
	"aoc-2023/test"
	"aoc-2023/util"
	"testing"
)


 func TestDay14Part1Test(t *testing.T) {
 	lines := util.GetLinesFromFilename("day14input_test.txt")
	platform := platform.ConstructPlatform(lines)
 	load := CalculateLoad(platform)
 	test.AssertEquals(t, 136, load)
 }

func TestDay14Part1(t *testing.T) {
	lines := util.GetLinesFromFilename("day14input.txt")
	platform := platform.ConstructPlatform(lines)
	load := CalculateLoad(platform)
	test.AssertEquals(t, 110821, load)
}
