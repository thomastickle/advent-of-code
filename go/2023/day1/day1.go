package main


import (
	"bufio"
	"fmt"
	"math"
	"strconv"
	"strings"
	"os"
	"unicode"
)


func main() {
	var sum = 0
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		currentLine := scanner.Text()
		currentLine = sanitizeLine(currentLine)
		var first, last int = math.MinInt32, math.MinInt32
		for _,letter := range currentLine {
		   if unicode.IsDigit(letter) {
	                last,_ = strconv.Atoi(string(letter))
			if first == math.MinInt32 {
				first = last 
			}
		   }
		}

		number := first * 10 + last 
		sum = sum + number
	}
	fmt.Println(sum)
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



var strNumsSingle = map[string]string {  "one": "1",
					 "two": "2", 
					 "three": "3",
					 "four": "4",
					 "five": "5", 
					 "six": "6",
					 "seven": "7",
					 "eight": "8",
					 "nine": "9"}

var strNumsDouble = map[string]string {  "oneight": "18", 
					 "twone": "21", 
					 "threeight": "38", 
					 "fiveight": "58", 
					 "sevenine": "79", 
					 "eightwo": "82", 
					 "eighthree": "83",
					 "nineight": "98" }


