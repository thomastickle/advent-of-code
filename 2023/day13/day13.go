package day13

import (
	"aoc-2023/util"
	"slices"
)

type PatternMap struct {
	Horizontal []string
	Verticle   []string
}

func ScorePatterns(patterns []PatternMap) int {
	score := 0
	for _, pattern := range patterns {
		patternScore := scorePattern(pattern, matchExact)
		score += patternScore
	}
	return score
}

func ScorePatterns2(patterns []PatternMap) int {
	score := 0
	for _, pattern := range patterns {
		patternScore := scorePattern(pattern, matchSingle)
		score += patternScore
	}
	return score
}

func scorePattern(pattern PatternMap, matchFunction func([]string,[]string) bool) int {
	score := 0
	h := (findReflection(pattern.Horizontal, matchFunction) + 1) * 100
	v := findReflection(pattern.Verticle, matchFunction) + 1

	if h > 0 {
		score += h
	} else {
		score += v
	}

	return score
}

func findReflection(patternMap []string, matchFunction func([]string,[]string) bool) int {
	for i := range patternMap {
		var before = make([]string, i + 1)
		var after = make([]string, len(patternMap) - i - 1)
		copy(before, patternMap[:i+1])
		copy(after, patternMap[i+1:])
		slices.Reverse(before)

		if len(after) < len(before) {
			before = before[:len(after)]
		} else {
			after = after[:len(before)]
		}

		if matchFunction(before, after) {
			return i
		}
	}
	return -1
}

func matchSingle(before, after []string) bool {
	if len(before) == 0 || len(after) == 0 || len(before) != len(after) {
		return false 
	}
	x := stringArraysCountDifferences(before, after)
	return x == 1 
}

func matchExact(before, after []string) bool {
	if len(before) == 0 || len(after) == 0 || len(before) != len(after) {
		return false 
	}
	return stringArraysCountDifferences(before, after) == 0 
}


func stringArraysCountDifferences(before, after []string) int {
	count := 0
	for i := range before {
		a := []rune(before[i])
		b := []rune(after[i])
		for j := 0; j < len(a); j++ {
			if a[j] != b[j] {
				count++
			}
		}
	}
	return count
}


func ConvertLinesToPattern(patterns [][]string) []PatternMap {
	var patternRecords []PatternMap
	for _, pattern := range patterns {
		horizontal := pattern
		verticle := convertVerticle(pattern)
		patternRecords = append(patternRecords, PatternMap{horizontal, verticle})
	}
	return patternRecords
}

func convertVerticle(lines []string) []string {
	return util.TransposeArrayOfStrings(lines)
}

func GetPatterns(lines []string) [][]string {
	var patterns [][]string
	var pattern []string
	for _, line := range lines {
		if line != "" {
			pattern = append(pattern, line)
		} else {
			patterns = append(patterns, slices.Clone(pattern))
			pattern = pattern[:0]
		}
	}
	patterns = append(patterns, slices.Clone(pattern))
	return patterns
}
