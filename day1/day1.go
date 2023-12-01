package main


import (
	"bufio"
	"fmt"
	"math"
	"strconv"
	"os"
	"unicode"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	var sum = 0
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		currentLine := scanner.Text()
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
