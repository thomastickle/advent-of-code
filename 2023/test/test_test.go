package test

import "testing"

func TestArrayEquals(t *testing.T) {
	baseArray := []int{1,2,3,4}
	testArrayGood := []int{1,2,3,4}
	testArrayBad := []int{1,2,3,5}

	if !ArrayEquals(baseArray, testArrayGood) {
		t.Fatalf("Equal arrays returned not equals.")
	}

	if ArrayEquals(baseArray, testArrayBad) {
		t.Fatalf("Unequal arrays showed up as equal")
	}
}