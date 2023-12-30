package day8

import (
	"aoc-2023/math"
	"aoc-2023/util"
	"testing"
)

func TestPart1Test(t *testing.T) {
	const expectedSteps = 2
	lines := util.GetLinesFromFilename("day8test1.txt")

	movements, nodes := GetMovementsAndNodes(lines)
	stepsToReach := FindStepsToReach(movements, nodes, "AAA", "ZZZ")

	if stepsToReach != expectedSteps {
		t.Fatalf("Expected steps %d did not match actual steps %d", expectedSteps, stepsToReach)
	}
}

func TestPart1Test2(t *testing.T) {
	const expectedSteps = 6
	lines := util.GetLinesFromFilename("day8test2.txt")

	movements, nodes := GetMovementsAndNodes(lines)
	stepsToReach := FindStepsToReach(movements, nodes, "AAA", "ZZZ")

	if stepsToReach != expectedSteps {
		t.Fatalf("Expected steps %d did not match actual steps %d", expectedSteps, stepsToReach)
	}
}

func TestPart1(t *testing.T) {
	const expectedSteps = 12169
	lines := util.GetLinesFromFilename("day8input.txt")

	movements, nodes := GetMovementsAndNodes(lines)
	stepsToReach := FindStepsToReach(movements, nodes, "AAA", "ZZZ")

	if stepsToReach != expectedSteps {
		t.Fatalf("Expected steps %d did not match actual steps %d", expectedSteps, stepsToReach)
	}
}

func TestPart2Test(t *testing.T) {
	const expectedSteps = 6
	lines := util.GetLinesFromFilename("day8test3.txt")
	movements, nodes := GetMovementsAndNodes(lines)
	endsA := GetNodesByPattern(nodes, `..A`)
	var steps []int
	for _, startNode := range endsA {
		steps = append(steps, FindStepsToReach(movements, nodes, startNode.Id, `..Z`))
	}

	minimumSteps := math.Lcm(steps[0], steps[1], steps...)

	if minimumSteps != expectedSteps {
		t.Fatalf("Expected steps %d did not match actual steps %d", expectedSteps, minimumSteps)
	}
}

func TestPart2(t *testing.T) {
	const expectedSteps = 12030780859469
	lines := util.GetLinesFromFilename("day8input.txt")
	movements, nodes := GetMovementsAndNodes(lines)
	endsA := GetNodesByPattern(nodes, `..A`)
	var steps []int
	for _, startNode := range endsA {
		steps = append(steps, FindStepsToReach(movements, nodes, startNode.Id, `..Z`))
	}

	minimumSteps := math.Lcm(steps[0], steps[1], steps...)

	if minimumSteps != expectedSteps {
		t.Fatalf("Expected steps %d did not match actual steps %d", expectedSteps, minimumSteps)
	}
}
