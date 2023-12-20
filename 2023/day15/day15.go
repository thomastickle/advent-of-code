package day15

import "strings"


func CalculateSumOfHashes(line string) int {
	initializationValues := strings.Split(line, ",")
	sum := 0
	for _, value := range initializationValues {
		sum += calculateHashValue(value)
	}
	return sum
}

func calculateHashValue(sequence string) int {
	hash := 0
	for _, aRune := range sequence {
		hash += int(aRune)
		hash *= 17
		hash %= 256
	}
	return hash
}
