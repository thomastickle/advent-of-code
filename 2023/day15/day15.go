package day15

import (
	"regexp"
	"slices"
	"strconv"
)

type Box struct {
	BoxId  int
	Lenses []Lens
}

type Lens struct {
	Id          string
	FocalLength int
}

func FocusPower(line string) int {
	boxes := make([]Box, 256)
	for i := 0; i < 256; i++ {
		boxes[i] = Box{BoxId: i, Lenses: make([]Lens, 0)}
	}

	var regex = regexp.MustCompile(`(\w+)(=|-)(\d*)`)
	extractedValues := regex.FindAllStringSubmatch(line, -1)
	for _, extractedValue := range extractedValues {
		hashValue := calculateHashValue(extractedValue[1])
		box := boxes[hashValue]
		updateBox(extractedValue[1:], &box)
		boxes[hashValue] = box
	}

	sum := 0
	for _, box := range boxes {
		for j, lens := range box.Lenses {
			value := (1 + box.BoxId) * (j + 1) * lens.FocalLength
			sum += value
		}
	}
	return sum
}

func updateBox(value []string, box *Box) {
	if value[1] == "=" {
		lens := box.Lenses
		focalLength, _ := strconv.Atoi(value[2])
		index := slices.IndexFunc(lens, func(n Lens) bool {
			return n.Id == value[0]
		})
		if index == -1 {
			box.Lenses = append(box.Lenses, Lens{value[0], focalLength})
		} else {
			box.Lenses[index] = Lens{value[0], focalLength}
		}
	} else {
		lens := box.Lenses
		index := slices.IndexFunc(lens, func(n Lens) bool {
			return n.Id == value[0]
		})
		if index != -1 {
			box.Lenses = append(box.Lenses[:index], box.Lenses[index+1:]...)
		}
	}
}

func CalculateSumOfHashes(line string) int {
	sum := 0
	var regex = regexp.MustCompile(`(\w+)(=|-)(\d*)`)
	extractedValues := regex.FindAllStringSubmatch(line, -1)
	for _, extractedValue := range extractedValues {
		sum += calculateHashValue(extractedValue[0])
	}
	return sum
}

func calculateHashValue(sequence string) int {
	hash := 0
	for _, aRune := range sequence {
		hash += int(aRune)
		hash *= 17
		hash %= 256
	}
	return hash
}
