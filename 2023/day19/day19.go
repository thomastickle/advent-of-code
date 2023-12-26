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
					quality := parsedWorkRule[1]
					testType := parsedWorkRule[2] 
					value, _ := strconv.Atoi(parsedWorkRule[3])
					rule := Rule{RuleType(quality), testType, value, parsedWorkRule[4]}
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
	var partValues map[string]int = make(map[string]int)
	var extreme, musical, aerodynamic, shiny int
	fmt.Sscanf(line, "{x=%d,m=%d,a=%d,s=%d}", &extreme, &musical, &aerodynamic, &shiny)
	partValues["x"] = extreme
	partValues["m"] = musical
	partValues["a"] = aerodynamic
	partValues["s"] = shiny
	return Part{PartValues: partValues}
}

func findCombinations(workflows map[string]WorkFlow, currentWorkFlow WorkFlow, partsRecord PartsRecord) int {
	if currentWorkFlow.Id == "R" {
		return 0
	}

	if currentWorkFlow.Id == "A" {
		extremeAccepted := partsRecord.Extreme.Stop - partsRecord.Extreme.Start
		musicalAccepted := partsRecord.Musical.Stop - partsRecord.Musical.Start
		aerodynamicAccepted := partsRecord.Aerodynamic.Stop - partsRecord.Aerodynamic.Start
		shinyAccepted := partsRecord.Shiny.Stop - partsRecord.Shiny.Start
		return extremeAccepted * musicalAccepted * aerodynamicAccepted * shinyAccepted
	}

	combinations := 0

	for _, rule := range currentWorkFlow.Rules {
		switch(rule.WorksOn) {
		case Extreme :
			newPartsRecord := partsRecord
			newPartsRecord.Extreme.Start = rule.TestValue + 1
			newPartsRecord.Extreme.Stop = partsRecord.Extreme.Stop
			break
		case Musical:
			break
		case Aerodynamic:
			break
		case Shiny:

		}
	}

	return combinations
}
