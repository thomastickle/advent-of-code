package test

import "testing"

func ArrayEquals(expected, value []int) bool {
	for i, expectedValue := range expected {
		if expectedValue != value[i] {
			return false
		}
	}
	return true
}

func AssertEquals(t *testing.T, expectedValue, actualValue int) {
	if expectedValue != actualValue {
		t.Fatalf("Expected value %d did not match actual value %d", expectedValue, actualValue)
	}
}