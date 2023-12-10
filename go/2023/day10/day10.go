package day10

import (
	"aoc-2023/util"
	"fmt"
)


func Day10() {
	var filenames = map[string]string{
		"test-input-1": "day10/day10test1.input",
//		"test-input-2": "day10/day10.input",
	}	
	

	fmt.Println("----- Day 10 -----\n")
	fmt.Println("--- Part 1 ---")	
	for key, value := range filenames {
		fmt.Printf("Input file: %s\n", filenames[key])
		testInput := util.GetLinesFromFilename(value) 
		fmt.Printf("Farthest Distance: %d\n", Part1(testInput))
	}

	fmt.Println("\n")
	fmt.Println("--- Part 2. ---")
}
