package test

import (
	"cmp"
	"testing"
)

func ArrayEquals(expected, value []int) bool {
	for i, expectedValue := range expected {
		if expectedValue != value[i] {
			return false
		}
	}
	return true
}

func AssertEquals[OrderedType cmp.Ordered](t *testing.T, expectedValue, actualValue OrderedType) {
	if expectedValue != actualValue {
		t.Fatal("Expected value : ", expectedValue, "did not match actual value: ", actualValue)
	}
}

 