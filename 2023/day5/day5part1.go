package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)


func main() {
	var lines []string
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		lines = append(lines, line)
	}

	var lineIndex = 0
	var seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight, lightToTemperature, temperatureToHumidity, humidityToLocation map[int][]int
	seedNumbers := ExtractSeedNumbers(lines[lineIndex])
	seedToSoil, lineIndex = ExtractMap(lines, "seed-to-soil", 2)
	soilToFertilizer, lineIndex = ExtractMap(lines, "soil-to-fertilizer", lineIndex)	
	fertilizerToWater, lineIndex = ExtractMap(lines, "fertilizer-to-water", lineIndex)
	waterToLight, lineIndex = ExtractMap(lines, "water-to-light", lineIndex)
	lightToTemperature, lineIndex = ExtractMap(lines, "light-to-temperature", lineIndex)
	temperatureToHumidity, lineIndex = ExtractMap(lines, "temperature-to-humidity", lineIndex)
	humidityToLocation, lineIndex = ExtractMap(lines, "humidity-to-location", lineIndex)

	soil := Transform(seedNumbers, seedToSoil)
	fertilizer := Transform(soil, soilToFertilizer)
	water := Transform(fertilizer, fertilizerToWater)
	light := Transform(water, waterToLight)
	temperature := Transform(light, lightToTemperature)
	humidity := Transform(temperature, temperatureToHumidity)
	location := Transform(humidity, humidityToLocation)
	fmt.Println("Lowest location: ", FindLowest(location))

}

func FindLowest(inputValues []int) int {
	lowest := inputValues[0]
	for _, value := range inputValues {
		if (value < lowest) {
			lowest = value
		}
	}
	return lowest
}

func Transform(inputValues []int, valueMap map[int][]int) []int {
	var outputValues []int
	for _, input := range inputValues {
		output := input
		for key, value := range valueMap {
			if (key <= input && input <= key+value[0]) {
				difference := input - key
				output = value[1] + difference
				break
			}
		}
		outputValues = append(outputValues, output)
	}
	return outputValues
}


func ExtractMap(lines []string, header string, lineIndex int) (map[int][]int, int) {
	for lines[lineIndex] == "" || strings.HasPrefix(lines[lineIndex], header) {
		lineIndex++
		continue
	}

	var xToYMap = make(map[int][]int)	
	for lineIndex < len(lines) && lines[lineIndex] != "" {
		xToYFields := strings.Fields(lines[lineIndex])
		x, _ := strconv.Atoi(xToYFields[1])
		xRange, _ := strconv.Atoi(xToYFields[2])
		y, _ := strconv.Atoi(xToYFields[0])
		var entry = make([]int, 2)
		entry[0] = xRange
		entry[1] = y 
		xToYMap[x] = entry
		lineIndex++
	}

	return xToYMap, lineIndex
}


func ExtractSeedNumbers(line string) []int {
	var seedNumbers []int
	// Assume the first line is the seed line 
	splitSeedLine := strings.Split(line, ":")
	seedNumberStrings := strings.Fields(splitSeedLine[1])
	for _, seedNumberString := range seedNumberStrings {
		seedNumber, _ := strconv.Atoi(seedNumberString)
		seedNumbers = append(seedNumbers, seedNumber)
	}
	return seedNumbers
}
