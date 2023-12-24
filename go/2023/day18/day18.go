package day18

import (
	"math"
	"regexp"
	"strconv"
	"strings"
)

type Point struct {
	X int
	Y int
}

type Direction struct {
	T rune
	X int
	Y int
}

var DIRECTION_MAP = map[string]Direction{
	"U": {'U', -1, 0},
	"D": {'D', 1, 0},
	"L": {'L', 0, -1},
	"R": {'R', 0, 1},
}

var regex = regexp.MustCompile(`\w \d+? \(#(.*?)(\d)\)`)


func ComputeLavaSpace(lines []string, alternativeDecode bool) int {
	lineDecoder := decodeLine
	if (alternativeDecode) {
		lineDecoder = decodeLineHex
	}

	points := []Point{Point{0,0}} 
	boundaryArea := 0	
	for _, line := range lines {
		direction, number := lineDecoder(line)
		currentPoint := points[len(points) - 1]	
		boundaryArea += number
		points = append(points, Point{currentPoint.X + direction.X * number, currentPoint.Y + direction.Y * number})
	}

	return computeArea(points)
}

func decodeLineHex(line string) (Direction, int) {
	parsedLine := regex.FindAllStringSubmatch(line, -1)
	number, err := strconv.ParseUint(parsedLine[0][1], 16, 64)
	if err != nil {
		panic("Could not parse line")
	}

	var direction Direction
	switch(parsedLine[0][2]) {
	case "0" : direction = DIRECTION_MAP["R"]
	case "1" : direction = DIRECTION_MAP["D"]
	case "2" : direction = DIRECTION_MAP["L"]
	case "3" : direction = DIRECTION_MAP["U"]
	}

	return direction, int(number)
}
func computeArea(points []Point) int {
	boundaryArea := boundaryArea(points)
	polygonArea := polygonArea(points)	
	interiorArea := polygonArea - (boundaryArea / 2) + 1.0
	return int(boundaryArea + interiorArea)
 }

 func boundaryArea(points []Point) float64 {
	boundaryArea := 0.0
	j := len(points) - 1
	for i := range points {
		boundaryArea += math.Abs(float64(points[j].X - points[i].X)) + math.Abs(float64(points[j].Y - points[i].Y))
		j = i
	}
	return boundaryArea
 }

func polygonArea(points []Point) float64 {
	area := 0.0
	j := len(points) - 1
	for i := range points {
		area += float64((points[j].X + points[i].X) * (points[j].Y - points[i].Y))
		j = i
	} 
	polygonArea := math.Abs(area) / 2.0
	return polygonArea 
}

func decodeLine(line string) (Direction, int) {
	fields := strings.Fields(line)
	directionString, numberString := fields[0], fields[1]
	direction := DIRECTION_MAP[directionString]
	count, err := strconv.Atoi(numberString)
	if err != nil {
		panic("Error converting value.")
	}
	return direction, count 
}
