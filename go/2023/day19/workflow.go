package day19

import "slices"

type WorkFlow struct {
	Id    string
	Rules []Rule
}

type Rule struct {
	WorksOn     string
	Operator    string
	Value       int
	Destination string
}

type Part struct {
	Values map[string][]int
}

func (part Part) copyPart() Part {
	newPart := Part{make(map[string][]int)}
	for key, value := range part.Values {
		newPart.Values[key] = slices.Clone(value)
	}
	return newPart
}

func (rule *Rule) process(part Part) string {
	if rule.WorksOn == "" {
		return rule.Destination
	}

	value := part.Values[string(rule.WorksOn)]

	applies := true
	if rule.Operator == ">" {
		applies = applies && greaterThan(value[0], rule.Value)
	} else if rule.Operator == "<" {
		applies = applies && lessThan(value[1], rule.Value)
	}

	if applies {
		return rule.Destination
	}

	return ""
}

func greaterThan(x, y int) bool {
	return x > y
}

func lessThan(x, y int) bool {
	return x < y
}
