package day1

import (
	"strconv"
	"strings"
	"unicode"
)

func FindSumOfAllFirstLastDigits(lines []string) int {
	sum := 0
	for _, line := range lines {
		first, last := findFirstLastDigit(line)
		number, err := strconv.Atoi(string([]rune{first, last}))
		if err != nil {
			panic(err)
		}
		sum += number
	}
	return sum
}

func findFirstLastDigit(line string) (rune, rune) {
	first := findFirstDigit(line)
	last := findLastDigit(line)
	return first, last
}

func findFirstDigit(line string) rune {
	runes := []rune(line)
	for i := 0; i < len(runes); i++ {
		if unicode.IsDigit(runes[i]) {
			return runes[i]
		}
	}
	return ' '
}

func findLastDigit(line string) rune {
	runes := []rune(line)
	for i := len(runes) - 1; i >= 0; i-- {
		if unicode.IsDigit(runes[i]) {
			return runes[i]
		}
	}
	return ' '
}


func SanitizeLines(lines []string) []string {
	var outputLines []string
	for _, line := range lines {
		outputLines = append(outputLines, sanitizeLine(line))
	}
	return outputLines
}


func sanitizeLine(line string) string {
	for key, value := range strNumsDouble {
		line = strings.ReplaceAll(line, key, value)
	}
	for key, value := range strNumsSingle {
		line = strings.ReplaceAll(line, key, value)
	}
	return line
}


var strNumsSingle = map[string]string{"one": "1",
	"two":   "2",
	"three": "3",
	"four":  "4",
	"five":  "5",
	"six":   "6",
	"seven": "7",
	"eight": "8",
	"nine":  "9"}

var strNumsDouble = map[string]string{"oneight": "18",
	"twone":     "21",
	"threeight": "38",
	"fiveight":  "58",
	"sevenine":  "79",
	"eightwo":   "82",
	"eighthree": "83",
	"nineight":  "98"}
