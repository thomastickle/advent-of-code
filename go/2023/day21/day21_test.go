package day21

import (
	"aoc-2023/test"
	"aoc-2023/util"
	"testing"
)

func TestDay21Part1Test(t *testing.T) {
	gardenPlot := util.GetLinesFromFilename("day21test.txt")
	plots := GardenPlotsReachable(gardenPlot, 6, false)
	test.AssertEquals(t, 16, plots)
}

func TestDay21Part1(t *testing.T) {
	gardenPlot := util.GetLinesFromFilename("day21input.txt")
	plots := GardenPlotsReachable(gardenPlot, 64, false)
	test.AssertEquals(t, 3770, plots)
}

func TestDay21Part2Test(t *testing.T) {
	gardenPlot := util.GetLinesFromFilename("day21test.txt")
	plots := GardenPlotsReachable(gardenPlot, 6, false)
	test.AssertEquals(t, 16, plots)

	plots = GardenPlotsReachable(gardenPlot, 10, false)
	test.AssertEquals(t, 50, plots)

	plots = GardenPlotsReachable(gardenPlot, 50, false)
	test.AssertEquals(t, 1594, plots)

	plots = GardenPlotsReachable(gardenPlot, 100, false)
	test.AssertEquals(t, 6536, plots)

	plots = GardenPlotsReachable(gardenPlot, 500, false)
	test.AssertEquals(t, 167004, plots)

	plots = GardenPlotsReachable(gardenPlot, 1000, false)
	test.AssertEquals(t, 668697, plots)

	plots = GardenPlotsReachable(gardenPlot, 5000, false)
	test.AssertEquals(t, 16733044, plots)
}
