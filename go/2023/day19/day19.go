package day19

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"
)

type WorkFlow struct {
	Id    string
	Rules []Rule
}

type RuleType int

const (
	GreaterThan = iota
	LessThan
	Default
)

type Rule struct {
	Quality     string
	TestType    RuleType
	TestValue   int
	Destination string
}

func (rule *Rule) process(part Part) string {
	value := part.PartValues[rule.Quality]

	applies := true
	if rule.TestType == GreaterThan {
		applies = applies && greaterThan(value, rule.TestValue)
	} else if rule.TestType == LessThan {
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

type Part struct {
	PartValues map[string]int
}

var WorkFlowRegex = regexp.MustCompile(`^(\w+){(.*?,?)}`)
var WorkRuleParser = regexp.MustCompile(`(\w)(<|>)(\d+):(\w+)`)
var PartMatcher = regexp.MustCompile(`^{(.*)}`)

func ProcessWorkFlowsAndParts(lines []string) int {
	workFlows := BuildWorkFlows(lines)
	return ProcessParts(lines, workFlows)
}

func BuildWorkFlows(lines []string) map[string]WorkFlow {
	var workFlows = make(map[string]WorkFlow)
	workFlows["A"] = WorkFlow{"A", nil}
	workFlows["R"] = WorkFlow{"R", nil}
	for _, line := range lines {
		if WorkFlowRegex.MatchString(line) {
			results := WorkFlowRegex.FindStringSubmatch(line)
			workFlowName := results[1]

			var rules []Rule
			ruleStrings := strings.Split(results[2], ",")
			for _, work := range ruleStrings {
				if WorkRuleParser.MatchString(work) {
					parsedWorkRule := WorkRuleParser.FindStringSubmatch(work)
					quality := parsedWorkRule[1]
					testType := LessThan
					if parsedWorkRule[2] == ">" {
						testType = GreaterThan
					}
					value, _ := strconv.Atoi(parsedWorkRule[3])
					rule := Rule{quality, RuleType(testType), value, parsedWorkRule[4]}
					rules = append(rules, rule)
				} else {
					rules = append(rules, Rule{"", Default, -1, work})
				}
			}
			workFlow := WorkFlow{workFlowName, rules}
			workFlows[workFlowName] = workFlow
		}
	}

	return workFlows
}

func ProcessParts(lines []string, workFlows map[string]WorkFlow) int {
	accept := 0
	for _, line := range lines {

		if PartMatcher.MatchString(line) {
			part := obtainPartFromLine(line)
			if processPart(workFlows, part) {
				for _, value := range part.PartValues {
					accept += value
				}
			}
		}
	}
	return accept
}

func processPart(workFlows map[string]WorkFlow, part Part) bool {
	currentWorkFlow := workFlows["in"]
	terminated := false
	for !terminated {
		for _, rule := range currentWorkFlow.Rules {
			destination := rule.process(part)
			switch (destination) {
				case "A" : return true
				case "R" : return false
			}
			if destination != "" {
				currentWorkFlow = workFlows[destination]
				break
			}
		}

	}
	return false
}


func obtainPartFromLine(line string) Part {
	var partValues map[string]int = make(map[string]int)
	var extreme, musical, aerodynamic, shiny int
	fmt.Sscanf(line, "{x=%d,m=%d,a=%d,s=%d}", &extreme, &musical, &aerodynamic, &shiny)
	partValues["x"] = extreme
	partValues["m"] = musical
	partValues["a"] = aerodynamic
	partValues["s"] = shiny
	return Part{PartValues: partValues}
}
