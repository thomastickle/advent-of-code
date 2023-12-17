package test


func ArrayEquals(expected, value []int) bool {
	for i, expectedValue := range expected {
		if expectedValue != value[i] {
			return false
		}
	}
	return true
}