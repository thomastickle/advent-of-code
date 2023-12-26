package day19

type RuleType string 

const (
	Extreme = "x"
	Musical = "m"
	Aerodynamic = "a"
	Shiny = "s"
	Everything = ""
)


type WorkFlow struct {
	Id    string
	Rules []Rule
}


type Rule struct {
	WorksOn     RuleType
	Comparison  string 
	TestValue   int
	Destination string
}

type Part struct {
	PartValues map[string]int
}

type PartsRecord struct {
	Extreme     RecordExtent
	Musical     RecordExtent
	Aerodynamic RecordExtent
	Shiny       RecordExtent
}

type RecordExtent struct {
	Id    string
	Start int
	Stop  int
}

func (rule *Rule) process(part Part) string {
	if rule.WorksOn == Everything {
		return rule.Destination 
	}

	value := part.PartValues[string(rule.WorksOn)]

	applies := true
	if rule.Comparison == ">" {
		applies = applies && greaterThan(value, rule.TestValue)
	} else if rule.Comparison == "<"  {
		applies = applies && lessThan(value, rule.TestValue)
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
