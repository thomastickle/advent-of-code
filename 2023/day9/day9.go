package day9

import (
	"strconv"
	"strings"
)

type ValueGenerator func([]int) int

func ComputeSumOfPredictions(lines []string, valueGenerator ValueGenerator) int {
	sum := 0
	for _, line := range lines {
		integers := GetIntValues(line)
		sum += valueGenerator(integers)
	}
	return sum
}

func GetIntValues(line string) []int {
	var integers []int
	fields := strings.Fields(line)
	for _, field := range fields {
		integer, _ := strconv.Atoi(field)
		integers = append(integers, integer)
	}
	return integers
}

func GetNextValue(integers []int) int {
	nextValueArray := make([]int, len(integers) - 1)
	allZeros := true 
	for i := 0; i < len(integers) - 1; i++ {
		nextValueArray[i] = integers[i+1] - integers[i]
		if (nextValueArray[i] != 0) {
			allZeros = false
		}
	}

	if allZeros {
		return integers[len(integers) - 1]
	} else {
		return integers[len(integers) - 1] + GetNextValue(nextValueArray)
	}
}

func GetPreviousValue(integers []int) int {
	nextValueArray := make([]int, len(integers) - 1)
	allZeros := true
	for i := 0; i < len(integers) - 1; i++ {
		nextValueArray[i] = integers[i+1] - integers[i]
		if (nextValueArray[i] != 0) {
			allZeros = false
		}
	}

	if allZeros {
		return integers[0]
	} else {
		return integers[0] - GetPreviousValue(nextValueArray)
	}
}
