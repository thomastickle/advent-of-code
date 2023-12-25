package day19

import (
	"aoc-2023/test"
	"aoc-2023/util"
	"testing"
)

func TestDay19Part1Test(t *testing.T) {
	lines := util.GetLinesFromFilename("day19test.txt")
	acceptedParts := ProcessWorkFlowsAndParts(lines)
	test.AssertEquals(t, 19114, acceptedParts)
}

func TestDay19Part1(t *testing.T) {
	lines := util.GetLinesFromFilename("day19input.txt")
	acceptedParts := ProcessWorkFlowsAndParts(lines)
	test.AssertEquals(t, 287054, acceptedParts)
}
