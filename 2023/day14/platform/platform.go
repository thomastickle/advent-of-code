package platform

import (
	"strings"
)

type Platform struct {
	Map    []rune
	Width  int
	Height int
}

func ConstructPlatform(lines []string) Platform {
	maxLineLength := findLongestLineLength(lines)
	var aMap []rune = make([]rune, len(lines)*maxLineLength)

	for i, line := range lines {
		for j, aRune := range line {
			aMap[i*maxLineLength+j] = aRune
		}
	}

	return Platform{aMap, maxLineLength, len(lines)}
}

func findLongestLineLength(lines []string) int {
	longest := 0
	for _, line := range lines {
		if len(line) > longest {
			longest = len(line)
		}
	}
	return longest
}

func (platform Platform) GetPrintableStringRepresentation() string {
	var builder strings.Builder
	builder.WriteString("[")
	for i := 0; i < platform.Height; i++ {
		if i != 0 {
			builder.WriteString(" [")
		} else {
			builder.WriteString("[")
		}

		builder.WriteString(string(platform.Map[i*platform.Width : i*platform.Width+platform.Width]))

		if i != platform.Height-1 {
			builder.WriteString("]\n")
		} else {
			builder.WriteString("]")
		}
	}
	builder.WriteString("]\n")
	return builder.String()
}

func (platform *Platform) Rotate90Clockwise() {
	var platformMap []rune = make([]rune, platform.Height*platform.Width)
	width := platform.Width
	height := platform.Height

	for i := 0; i < width; i++ {
		for j := 0; j < height; j++ {
			destination := i*height + j
			source := (height-j-1)*(width) + i
			platformMap[destination] = platform.Map[source]
		}
	}
	platform.Map = platformMap
	platform.Height = width
	platform.Width = height
}

func (platform *Platform) TiltRight() {
	width := platform.Width
	height := platform.Height
	platformMap := platform.Map
	for i := 0; i < height; i++ {
		for j := width - 2; j >= 0; j-- {
			index := i*width + j
			if platformMap[index] == 'O' {
				moveRollableRock(platformMap, index, (i*width)+width-1)
			}
		}
	}
}

func moveRollableRock(platform []rune, start, stopBy int) {
	index := start
	for index < stopBy {
		if platform[index+1] == 'O' || platform[index+1] == '#' {
			break
		} else {
			temp := platform[index+1]
			platform[index+1] = platform[index]
			platform[index] = temp
			index++
		}
	}
}
