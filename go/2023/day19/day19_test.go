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


func TestFindCombinationsAcceptReject(t *testing.T) {
	inputLines := []string{
		"pv{a>1716:R,A}",
	}

	partsRecord := PartsRecord{RecordExtent{"x", 1, 4000}, RecordExtent{"m", 1, 4000}, RecordExtent{"a", 1, 4000}, RecordExtent{"s", 1, 4000}}

	workFlows := BuildWorkFlows(inputLines)
	combinations := findCombinations(workFlows, workFlows["pv"], partsRecord)
	test.AssertEquals(t, 0, combinations)
}
