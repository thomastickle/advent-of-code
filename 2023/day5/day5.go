package day5

import (
	"fmt"
	"slices"
	"sort"
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
	fmt.Println("Seed numbers: ", seedNumbers)
	mapStack := createMappingStack(lines)
	fmt.Println("Map Stack: ", mapStack)
	destinations := mapSeedsToDestination(seedNumbers, mapStack)
	fmt.Println("Destinations: ", destinations)
	sort.Slice(destinations, func(a, b int) bool {
		return destinations[a] < destinations[b]
	})
	fmt.Println("Destinations: ", destinations)
	return destinations[0]
}

func mapSeedsToDestination(seeds []int, mapStack []Map) []int {
	var destinations []int
	for _, seed := range seeds {
		var transition []int
		transition = append(transition, seed)
		for _, amap := range mapStack {
			for _, mapRange := range amap.MapRange {
				if mapRange.Source <= transition[len(transition)-1] && transition[len(transition)-1] <= mapRange.Source+mapRange.Range {
					transition = append(transition, mapRange.Destination+(transition[len(transition)-1]-mapRange.Source))
					break
				}
			}
		}
		fmt.Println("Transition Map: ", transition)
		destinations = append(destinations, transition[len(transition)-1])
	}
	return destinations
}

func createMappingStack(lines []string) []Map {
	var output []Map
	output = append(output, extractMapValues(lines, "seed-to-soil"))
	output = append(output, extractMapValues(lines, "soil-to-fertilizer"))
	output = append(output, extractMapValues(lines, "fertilizer-to-water"))
	output = append(output, extractMapValues(lines, "water-to-light"))
	output = append(output, extractMapValues(lines, "light-to-temperature"))
	output = append(output, extractMapValues(lines, "temperature-to-humidity"))
	output = append(output, extractMapValues(lines, "humidity-to-location"))
	return output
}

func extractMapValues(lines []string, prefix string) Map {
	i := 0
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
	return aMap
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
