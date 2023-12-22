package day12

import (
	"fmt"
	"slices"
	"strconv"
	"strings"
)

type CacheKey struct {
	SpringMap string
	SpringValues string 
}

var cache = make(map[CacheKey]int)

func GenerateKeyFromMapAndCounts(springMap []rune, springCounts []int) CacheKey{
	return CacheKey{string(springMap), fmt.Sprintf("%v", springCounts)}
}

func CountCombinations(springMap []rune, springCounts []int) int {
	// Return cached results.
	key := GenerateKeyFromMapAndCounts(springMap, springCounts) 
	value, ok := cache[key] 
	if ok {
		return value
	} 

	if len(springMap) == 0 {
		if len(springCounts) == 0 {
			return 1
		} else {
			return 0
		}
	}

	if len(springCounts) == 0 {
		if slices.Contains(springMap, '#') {
			return 0
		} else {
			return 1
		}
	}

	results := 0
	if strings.ContainsRune(".?", springMap[0]) {
		results += CountCombinations(springMap[1:], springCounts)
	}

	if strings.ContainsRune("#?", springMap[0]) && 
		springCounts[0] <= len(springMap) &&
		!slices.Contains(springMap[:springCounts[0]], '.') &&
		(springCounts[0] == len(springMap) || springMap[springCounts[0]] != '#') {
			// While we want to skip ahead, we need to make sure we are in bounds.	
			bsmIndex := springCounts[0] + 1
			if bsmIndex > len(springMap) {
				bsmIndex = len(springMap)
			}

			results += CountCombinations(springMap[bsmIndex:], springCounts[1:])
	}
	cache[key] = results

	return results
}

func SumCombinations(lines []string) int {
	count := 0
	for _, line := range lines {
		springMap, springCounts := getMapAndValues(line)
		count += CountCombinations([]rune(springMap), springCounts)
	}
	return count
}

func SumCombinationsFolded(lines []string) int {
	count := 0
	for i, line := range lines {
		fmt.Println("Doing folded Combination: ", i)
		springCounts, brokenSprings := getMapAndValues(line)
		springCounts = unfoldSpringMap(springCounts)
		brokenSprings = unfoldSpringCounts(brokenSprings)
		count += CountCombinations([]rune(springCounts), brokenSprings)
	}
	return count
}

func unfoldSpringMap(springMap []rune) []rune {
	var unfolded []rune
	for i := 0; i < 5; i++ {
		unfolded = append(unfolded, springMap... )
		unfolded = append(unfolded, '?')
	}
	return unfolded[:len(unfolded) - 1]
}

func unfoldSpringCounts(springCounts []int) []int {
	var unfolded []int
	for i := 0; i < 5; i++ {
		unfolded = append(unfolded, springCounts...)
	}
	return unfolded
}

func getMapAndValues(line string) ([]rune, []int) {
	splitString := strings.Fields(line)
	brokenSpringMap := splitString[0]
	brokenSpringValues := getDamagedSpringValues(splitString[1])
	return []rune(brokenSpringMap), brokenSpringValues
}

func getDamagedSpringValues(damageSpringString string) []int {
	damagedSpringStrings := strings.Split(damageSpringString, ",")
	damagedSpringValues := make([]int, len(damagedSpringStrings))
	for i := 0; i < len(damagedSpringStrings); i++ {
		convertedValue, err := strconv.Atoi(damagedSpringStrings[i])
		if err != nil {
			panic("Unable to convert value.")
		}
		damagedSpringValues[i] = convertedValue
	}
	return damagedSpringValues
}
