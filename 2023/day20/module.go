package day20

type State bool

const (
	Off State = false
	On  State = true
)

type NodeType string

const (
	Broadcaster NodeType = ""
	Button      NodeType = ""
	FlipFlop    NodeType = "%"
	Conjunctor  NodeType = "&"
)

type PulseLevel bool

const (
	Low  PulseLevel = false
	High            = true
)

type Pulse struct {
	Source string
	Target string
	Pulse  PulseLevel
}

type StateMachineNode struct {
	Name    string
	Type    NodeType
	Outputs []string
	State   State
	Memory  map[string]PulseLevel
}
