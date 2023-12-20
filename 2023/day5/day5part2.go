package day5 



// func v() {
// 	var lines []string
// 	scanner := bufio.NewScanner(os.Stdin)
// 	for scanner.Scan() {
// 		line := scanner.Text()
// 		lines = append(lines, line)
// 	}
// 	var lineIndex = 0
// 	var seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight, lightToTemperature, temperatureToHumidity, humidityToLocation map[int][]int
// 	seedNumbers := ExtractSeedNumbers(lines[lineIndex])
// 	seedToSoil, lineIndex = ExtractMap(lines, "seed-to-soil", 2)
// 	soilToFertilizer, lineIndex = ExtractMap(lines, "soil-to-fertilizer", lineIndex)	
// 	fertilizerToWater, lineIndex = ExtractMap(lines, "fertilizer-to-water", lineIndex)
// 	waterToLight, lineIndex = ExtractMap(lines, "water-to-light", lineIndex)
// 	lightToTemperature, lineIndex = ExtractMap(lines, "light-to-temperature", lineIndex)
// 	temperatureToHumidity, lineIndex = ExtractMap(lines, "temperature-to-humidity", lineIndex)
// 	humidityToLocation, lineIndex = ExtractMap(lines, "humidity-to-location", lineIndex)
// 	var lowest = math.MaxInt64
// 	for i := 0; i < len(seedNumbers); i += 2 {
// 		startSeedNumber := seedNumbers[i]
// 		endSeedNumber := seedNumbers[i] + seedNumbers[i+1]
// 		for seedNumber := startSeedNumber;  seedNumber < endSeedNumber; seedNumber++ {
// 			soil := Transform(seedNumber, seedToSoil)
// 			fertilizer := Transform(soil, soilToFertilizer)
// 			water := Transform(fertilizer, fertilizerToWater)
// 			light := Transform(water, waterToLight)
// 			temperature := Transform(light, lightToTemperature)
// 			humidity := Transform(temperature, temperatureToHumidity)
// 			location := Transform(humidity, humidityToLocation)

// 			if (location < lowest) {
// 				lowest = location
// 			}
// 		}

// 	}
// 	fmt.Println("Lowest location: ", lowest)
// }


// func Transform(input int, valueMap map[int][]int) int {
// 	var output = input 
// 	for key, value := range valueMap {
// 		if (key <= input && input <= key+value[0]) {
// 			difference := input - key
// 			output = value[1] + difference
// 			break
// 		}
// 	}
// 	return output
// }


// func ExtractMap(lines []string, header string, lineIndex int) (map[int][]int, int) {
// 	for lines[lineIndex] == "" || strings.HasPrefix(lines[lineIndex], header) {
// 		lineIndex++
// 		continue
// 	}

// 	var xToYMap = make(map[int][]int)	
// 	for lineIndex < len(lines) && lines[lineIndex] != "" {
// 		xToYFields := strings.Fields(lines[lineIndex])
// 		x, _ := strconv.Atoi(xToYFields[1])
// 		xRange, _ := strconv.Atoi(xToYFields[2])
// 		y, _ := strconv.Atoi(xToYFields[0])
// 		var entry = make([]int, 2)
// 		entry[0] = xRange
// 		entry[1] = y 
// 		xToYMap[x] = entry
// 		lineIndex++
// 	}

// 	return xToYMap, lineIndex
// }
