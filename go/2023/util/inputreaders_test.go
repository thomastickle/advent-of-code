package util

import (
	"bufio"
	"os"
	"testing"
)

func TestGetLines(t *testing.T) {
	filename := "testfile.txt"
	file, err := os.Open(filename)
	if err != nil {
		t.Fatalf("Unable to open file: %s", filename)
	}

	defer file.Close()

	reader := bufio.NewReader(file)
	lines := GetLinesFromReader(reader)
	if len(lines) == 0 {
		t.Errorf("Did not read any lines from file.") 
	}	
}
