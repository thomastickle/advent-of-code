package day20

import (
	"aoc-2023/test"
	"aoc-2023/util"
	"testing"
)

func TestDay20Part1Test(t *testing.T) {
	lines := util.GetLinesFromFilename("day20test.txt")
	pulsesSent := CountPulsesSent(lines, 1000, false)
	test.AssertEquals(t, 32000000, pulsesSent)
}

func TestDay20Part1(t *testing.T) {
	lines := util.GetLinesFromFilename("day20input.txt")
	pulsesSent := CountPulsesSent(lines, 1000, false)
	test.AssertEquals(t, 737679780, pulsesSent)
}

func TestDay20Part2(t *testing.T) {
	lines := util.GetLinesFromFilename("day20input.txt")
	pulsesSent := CountPulsesSent(lines, 100000, true)
	test.AssertEquals(t, 227411378431763, pulsesSent)
}
