package main

import (
	"fmt"
	"io/ioutil"
	"math"
	"os"
	"strconv"
	"strings"
)


func main() {
	input, _ := ioutil.ReadAll(os.Stdin)
	lines := strings.Split(string(input), "\n")
	times := strings.Fields(strings.Split(lines[0],":")[1])
	distances := strings.Fields(strings.Split(lines[1], ":")[1])

	var results []int
	for i, value := range times {
		time, _ := strconv.Atoi(value)
		recordDistance, _ := strconv.Atoi(distances[i])
		floor, ceil := getLowerAndUpperBound(time, recordDistance)
		waysToBeatRecord := ceil - floor
		results = append(results, waysToBeatRecord)
	}

	product := 1
	for _, value := range results {
		product *= value
	}


	fmt.Println("Results: ", product)
}

func getLowerAndUpperBound(time int, distance int) (int, int) {
	timef := float64(time)

	discriminant := math.Sqrt(math.Pow(timef, 2.0) - 4.0 * float64(distance))

	ceil := (timef + discriminant) / 2.0
	floor := (timef - discriminant) / 2.0

	return int(floor), int(ceil)
}
