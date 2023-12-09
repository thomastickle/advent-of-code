package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)



func main() {
	sum := 0
	lines := GetInput()
	for _, line := range lines {
		integers := GetIntValues(line)
		sum += GetNextValue(integers)
	}
	fmt.Println("Sum of all final values: ", sum)
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
		return integers[0]
	} else {
		return integers[0] - GetNextValue(nextValueArray)
	}
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

func GetInput() []string {
	var lines []string
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		lines = append(lines, line)
	}
	return lines
}
