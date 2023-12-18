package day11

import (
	//"aoc-2023/day11"
	"aoc-2023/util"
	"testing"
)


func TestPart1Test(t *testing.T)  {
  const expectedSum = 374
	lines := util.GetLinesFromFilename("day11input_test.txt")
	galaxies := GetGalaxies(lines)
  galaxies = ExpandUniverse(galaxies, 2)
  sumOfDistances := SumDistances(galaxies)
  if sumOfDistances != expectedSum {
    t.Fatalf("Got %d, want %d", sumOfDistances, expectedSum)
  }
}

func TestPart1(t *testing.T)  {
  const expectedSum = 10276166
	lines := util.GetLinesFromFilename("day11input.txt")
	galaxies := GetGalaxies(lines)
  galaxies = ExpandUniverse(galaxies, 2)
  sumOfDistances := SumDistances(galaxies)
  if sumOfDistances != expectedSum {
    t.Fatalf("Got %d, want %d", sumOfDistances, expectedSum)
  }
}

func TestPart2Test(t *testing.T)  {
  const expectedSum = 82000210 
	lines := util.GetLinesFromFilename("./day11input_test.txt")
	galaxies := GetGalaxies(lines)
  galaxies = ExpandUniverse(galaxies, 1000000)
  sumOfDistances := SumDistances(galaxies)
  if sumOfDistances != expectedSum {
    t.Fatalf("Got %d, want %d", sumOfDistances, expectedSum)
  }
}

func TestPart2(t *testing.T)  {
  const expectedSum = 598693078798 
	lines := util.GetLinesFromFilename("./day11input.txt")
	galaxies := GetGalaxies(lines)
  galaxies = ExpandUniverse(galaxies, 1000000)
  sumOfDistances := SumDistances(galaxies)
  if sumOfDistances != expectedSum {
    t.Fatalf("Got %d, want %d", sumOfDistances, expectedSum)
  }
}
