package util

import (
	"bufio"
	"io"
	"os"
)

func GetLinesFromFilename(filename string) []string {
	file, err := os.Open(filename)
	if err != nil {
		panic("Could not open file.")
	}
	defer file.Close()

	reader := io.Reader(file)
	return GetLinesFromReader(reader)
}

func GetLinesFromReader(reader io.Reader) []string {
	var lines []string
	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		line := scanner.Text()
		lines = append(lines, line)
	}	
	return lines
}
