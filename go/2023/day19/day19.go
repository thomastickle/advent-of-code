package day19

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"
)

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
					worksOn := parsedWorkRule[1]
					testType := parsedWorkRule[2]
					value, _ := strconv.Atoi(parsedWorkRule[3])
					rule := Rule{worksOn, testType, value, parsedWorkRule[4]}
					rules = append(rules, rule)
				} else {
					rules = append(rules, Rule{"", "", -1, work})
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
				for key := range part.Values {
					accept += part.Values[key][0]
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
			switch destination {
			case "A":
				return true
			case "R":
				return false
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
	var partValues map[string][]int = make(map[string][]int)
	var extreme, musical, aerodynamic, shiny int
	fmt.Sscanf(line, "{x=%d,m=%d,a=%d,s=%d}", &extreme, &musical, &aerodynamic, &shiny)
	partValues["x"] = []int{extreme, extreme}
	partValues["m"] = []int{musical, musical}
	partValues["a"] = []int{aerodynamic, aerodynamic}
	partValues["s"] = []int{shiny, shiny}
	return Part{Values: partValues}
}

func FindCombinations(lines []string) int {
	workflows := BuildWorkFlows(lines)

	part := Part{
		Values: map[string][]int{
			`x`: {1, 4000},
			`m`: {1, 4000},
			`a`: {1, 4000},
			`s`: {1, 4000},
		},
	}

	w := workflows["in"]

	acceptedParts := findCombinations(workflows, w, part)
	for i, part := range acceptedParts {
		fmt.Printf("Part = %d\n", i)
		for key, rating := range part.Values {
			fmt.Printf("\t%s:%d\n", key, rating)
		}

	}

	score := 0
	for _, acceptedPart := range acceptedParts {
		combinations := 1
		for _, partRating := range acceptedPart.Values {
			combinations *= (partRating[1] - partRating[0]) + 1
		}
		score += combinations
	}
	return score
}

func findCombinations(workFlows map[string]WorkFlow, currentWorkFlow WorkFlow, part Part) []Part {

	accepted := make([]Part, 0)

	if currentWorkFlow.Id == `R` {
		return nil
	}

	if currentWorkFlow.Id == `A` {
		return append(accepted, part)
	}

	for _, rule := range currentWorkFlow.Rules {
		if rule.WorksOn == `` {
			return append(accepted, findCombinations(workFlows, workFlows[rule.Destination], part)...)
		}
		if rule.Operator == `>` {
			if part.Values[rule.WorksOn][0] > rule.Value {
				return append(accepted, findCombinations(workFlows, workFlows[rule.Destination], part)...)
			}
			if part.Values[rule.WorksOn][1] > rule.Value {
				newPart := part.copyPart()
				newPart.Values[rule.WorksOn][0] = rule.Value + 1
				part.Values[rule.WorksOn][1] = rule.Value
				accepted = append(accepted, findCombinations(workFlows, workFlows[rule.Destination], newPart)...)
			}
		} else {
			if part.Values[rule.WorksOn][1] < rule.Value {
				return append(accepted, findCombinations(workFlows, workFlows[rule.Destination], part)...)
			}
			if part.Values[rule.WorksOn][0] < rule.Value {
				newPart := part.copyPart()
				newPart.Values[rule.WorksOn][1] = rule.Value - 1
				part.Values[rule.WorksOn][0] = rule.Value
				accepted = append(accepted, findCombinations(workFlows, workFlows[rule.Destination], newPart)...)
			}
		}
	}

	return accepted
}
