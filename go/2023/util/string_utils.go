package util


func TransposeArrayOfStrings(strings []string) []string {
	if len(strings) == 0 {
		return []string{}
	}

	// Allocate the intermediate array to do the transposition
	var temp [][]rune = make([][]rune, len(strings[0]))
	for i := 0; i < len(strings[0]); i++ {
		temp[i] = make([]rune, len(strings))
	}

	// Transpositionally copy all the values from the original
	for i, line := range strings {
		for j, aRune := range line {
			temp[j][i] = aRune
		}
	}

	// Copy the values from the transposed array into the output
	output := make([]string, len(temp))
	for i, runes := range temp {
		output[i] = string(runes)
	}

	return output
}
