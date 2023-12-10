package day1

import (
	"aoc-2023/util"
	"fmt"
)


func Day1() {
	var filenames = map[string]string{
		"test-input-1": "day1/day1test.input",
		"test-input-2": "day1/day1.input",
	}	
	

	fmt.Println("----- Day 1 -----\n")
	fmt.Println("--- Part 1 ---")	

	fmt.Println("\n")
	fmt.Println("--- Part 2. ---")
	for key, value := range filenames {
		testInput := util.GetLinesFromFilename(value) 
		fmt.Printf("Sum of calibration values for file: '%s': %d\n", filenames[key], Part2(testInput))
	}
}
