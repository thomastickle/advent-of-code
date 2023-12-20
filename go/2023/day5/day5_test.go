package day5

import (
	"aoc-2023/test"
	"aoc-2023/util"
	"fmt"
	"testing"
)

func TestDay5Part1Test(t *testing.T) {
	lines := util.GetLinesFromFilename("day5input_test.txt")
	lowestLocationNumber := FindLowestLocationNumber(lines)
	test.AssertEquals(t, 35, lowestLocationNumber)
}

func TestDay5Part1(t *testing.T) {
	lines := util.GetLinesFromFilename("day5input.txt")
	lowestLocationNumber := FindLowestLocationNumber(lines)
	test.AssertEquals(t, 177942185, lowestLocationNumber)
}

func BenchmarkDay5Part1Benchmark(b *testing.B) {
	lines := util.GetLinesFromFilename("day5input_test.txt")
	b.Run(fmt.Sprintf("input_size:_%d", len(lines)), func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			FindLowestLocationNumber(lines)
		}
	})
}

func BenchmarkDay5Part1(b *testing.B) {
	lines := util.GetLinesFromFilename("day5input.txt")
	b.Run(fmt.Sprintf("input_size:_%d", len(lines)), func(b *testing.B) {
		for i := 0; i < b.N; i++ {
			FindLowestLocationNumber(lines)
		}
	})
}
