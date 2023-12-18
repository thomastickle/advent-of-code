package day13

import (
	"slices"
)

type PatternsRecord struct {
	Verticle   []uint
	Horizontal []uint
}

func ScorePatterns(patterns []PatternsRecord) int {
	score := 0
	for _, pattern := range patterns {
		patternScore := scorePattern(pattern)
		score += patternScore
	}
	return score
}

func scorePattern(pattern PatternsRecord) int {
	score := 0
	score += scoreVerticle(pattern)
	score += scoreHorizontal(pattern)
	return score
}

func scorePatternRecordField(patternRecordField []uint) int {
	match := 0
	for i := 0; i < len(patternRecordField)-1; i++ {
		if patternRecordField[i] == patternRecordField[i+1] {
			j := i
			k := i + 1
			for 0 <= j && k < len(patternRecordField) && patternRecordField[j] == patternRecordField[k] {
				j--
				k++
			}

			// See if we reached a bounds while matching, that was our mirror
			if j < 0 || k == len(patternRecordField) {
				match = i + 1
				break
			}
		}
	}

	return match
}

func scoreHorizontal(pattern PatternsRecord) int {
	return scorePatternRecordField(pattern.Horizontal) * 100
}

func scoreVerticle(pattern PatternsRecord) int {
	return scorePatternRecordField(pattern.Verticle)
}

func ConvertLinesToPattern(patterns [][]string) []PatternsRecord {
	var patternRecords []PatternsRecord
	for _, pattern := range patterns {
		horizontal := convertHorizontal(pattern)
		verticle := convertVerticle(pattern)
		patternRecords = append(patternRecords, PatternsRecord{verticle, horizontal})
	}
	return patternRecords
}

func convertHorizontal(patterns []string) []uint {
	var horizontal []uint
	for _, patternLine := range patterns {
		var value uint = 0
		for _, aRune := range patternLine {
			value <<= 1
			if aRune == '#' {
				value = value | 1
			}
		}
		horizontal = append(horizontal, value)
	}
	return horizontal
}

func convertVerticle(lines []string) []uint {
	var verticle []uint
	for i := 0; i < len(lines[0]); i++ {
		var value uint = 0
		for j := 0; j < len(lines); j++ {
			value <<= 1
			if lines[j][i] == '#' {
				value = value | 1
			}
		}
		verticle = append(verticle, value)
	}
	return verticle
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
