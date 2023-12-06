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
	time := strings.ReplaceAll(strings.Split(lines[0],":")[1], " ", "")
	distance := strings.ReplaceAll(strings.Split(lines[1], ":")[1], " ", "")

	fmt.Println("Time: ", time)
	fmt.Println("Distance: ", distance)

	recordTime, _ := strconv.Atoi(time)
	recordDistance, _ := strconv.Atoi(distance)
	floor, ceil := getLowerAndUpperBound(recordTime, recordDistance)
	waysToBeatRecord := ceil - floor



	fmt.Println("Ways to beat:", waysToBeatRecord)
}

func getLowerAndUpperBound(time int, distance int) (int, int) {
	timef := float64(time)

	discriminant := math.Sqrt(math.Pow(timef, 2.0) - 4.0 * float64(distance))

	ceil := (timef + discriminant) / 2.0
	floor := (timef - discriminant) / 2.0

	return int(floor), int(ceil)
}
