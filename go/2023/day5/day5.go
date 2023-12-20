package day5

import (
	"fmt"
	"math"
	"slices"
	"strconv"
	"strings"
)

type Map struct {
	MapTitle string
	MapRange []MapRange
}

type MapRange struct {
	Source      int
	Destination int
	Range       int
}

func FindLowestLocationNumber(lines []string) int {
	seedNumbers := extractSeedNumbers(lines)
	mapStack := createMappingStack(lines)
	lowest := math.MaxInt 
	for _, seedNumber := range seedNumbers {
		output := mapSeedsToDestination(seedNumber, mapStack)
		lowest = min(lowest, output)
	}
	return lowest 
}

// Solves problem but needs optimizations
func FindLowestLocationNumber2(lines []string) int {
	seedNumbers := extractSeedNumbers(lines)
	mapStack := createMappingStack(lines)
	lowest := math.MaxInt
	for i := 0; i < len(seedNumbers) - 1; i += 2 { 
		start := seedNumbers[i]
		end := seedNumbers[i] + seedNumbers[i + 1]
		fmt.Printf("Start: %d End: %d\n", start, end)
		for j := start; j < end; j++ {
			output := mapSeedsToDestination(j, mapStack)
			lowest = min(lowest, output)
		}
	}
	return lowest 
}

func mapSeedsToDestination(seed int, mapStack []Map) int {
	value := seed
	for _, amap := range mapStack {
		for _, mapRange := range amap.MapRange {
			if mapRange.Source <= value && value < mapRange.Source+mapRange.Range {
				value =  mapRange.Destination + (value - mapRange.Source)
				break
			}
		}
	}
	return value 
}

func createMappingStack(lines []string) []Map {
	var output []Map
	headers := []string{"seed-to-soil", "soil-to-fertilizer", "fertilizer-to-water", "water-to-light", "light-to-temperature", "temperature-to-humidity", "humidity-to-location"}

	lineIndex := 0
	for _, header := range headers {
		var extractedMap Map
		extractedMap, lineIndex = extractMapValues(lines, header, lineIndex)
		output = append(output, extractedMap)
	}
	return output
}

func extractMapValues(lines []string, prefix string, lineIndex int) (Map, int) {
	i := lineIndex
	for i < len(lines) && !strings.HasPrefix(lines[i], prefix) {
		i++
	}

	aMap := Map{MapTitle: prefix}
	for i = i + 1; i < len(lines) && lines[i] != ""; i++ {
		var destination, source, coverageRange int
		fmt.Sscanf(lines[i], "%d %d %d", &destination, &source, &coverageRange)
		aMap.MapRange = append(aMap.MapRange, MapRange{source, destination, coverageRange})
	}

	mapRange := aMap.MapRange
	slices.SortFunc(mapRange, mapRangeSorter)
	return aMap, i
}

func mapRangeSorter(a, b MapRange) int {
	difference := a.Source - b.Source
	if difference != 0 {
		return difference
	}

	difference = a.Destination - b.Destination
	return difference
}

func extractSeedNumbers(lines []string) []int {
	var seedNumbers []int
	for _, line := range lines {
		if strings.HasPrefix(line, "seeds:") {
			seedNumberStrings := strings.Fields(strings.Split(line, ":")[1])
			for _, seedNumberString := range seedNumberStrings {
				seedNumber, err := strconv.Atoi(seedNumberString)
				if err == nil {
					seedNumbers = append(seedNumbers, seedNumber)
				}
			}
			break
		}
	}
	return seedNumbers
}
