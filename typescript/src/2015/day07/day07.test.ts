import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readExpected, readInput} from "../../input.ts"
import {part1, part2} from "./day07.ts"
import {And, Circuit, type Operation} from "./circuit_operators.ts"


describe("2015 day 07: examples", () => {
    const example = [
        "123 -> x",
        "456 -> y",
        "x AND y -> d",
        "x OR y -> e",
        "x LSHIFT 2 -> f",
        "y RSHIFT 2 -> g",
        "NOT x -> h",
        "NOT y -> i",
        "x -> a",
        "1 AND y -> j"
    ].join("\n")

    // The example has no wire a, so each case reads a different wire.
    it("part 1: wire x -> 123", pending(() => {
        assert.equal(part1(example, "x"), 123)
    }))
    it("part 1: wire y -> 456", pending(() => {
        assert.equal(part1(example, "y"), 456)
    }))
    it("part 1: wire d -> 72", pending(() => {
        assert.equal(part1(example, "d"), 72)
    }))
    it("part 1: wire e -> 507", pending(() => {
        assert.equal(part1(example, "e"), 507)
    }))
    it("part 1: wire f -> 492", pending(() => {
        assert.equal(part1(example, "f"), 492)
    }))
    it("part 1: wire g -> 114", pending(() => {
        assert.equal(part1(example, "g"), 114)
    }))
    it("part 1: wire h -> 65412", pending(() => {
        assert.equal(part1(example, "h"), 65412)
    }))
    it("part 1: wire i -> 65079", pending(() => {
        assert.equal(part1(example, "i"), 65079)
    }))
    it("part 1: wire a -> 123", pending(() => {
        assert.equal(part1(example, "a"), 123)
    }))
    it("part 1: wire j -> 0", pending(() => {
        assert.equal(part1(example, "j"), 0)
    }))

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them below as it("part 2: ...") calls.
})

describe("2015 day 07: numeric operands", () => {
    it("evaluates numeric operands in AND", () => {
        assert.equal(part1("1 AND 3 -> a"), 1)
    })

    it("evaluates numeric operands in OR", () => {
        assert.equal(part1("1 OR 2 -> a"), 3)
    })

    it("evaluates numeric operands in NOT", () => {
        assert.equal(part1("NOT 0 -> a"), 65535)
    })

    it("evaluates numeric operands in shifts", () => {
        assert.equal(part1("2 LSHIFT 3 -> a"), 16)
        assert.equal(part1("8 RSHIFT 2 -> a"), 2)
    })

    it("resolves wire and numeric operands after the full circuit is built", () => {
        assert.equal(part1("x AND 3 -> a\n2 -> x"), 2)
        assert.equal(part1("2 AND x -> a\n3 -> x"), 2)
        assert.equal(part1("x OR 4 -> a\n2 -> x"), 6)
        assert.equal(part1("4 OR x -> a\n2 -> x"), 6)
    })

    it("keeps left-shift results within the 16-bit signal width", () => {
        assert.equal(part1("1 LSHIFT 16 -> a"), 0)
    })

    it("reports missing wires when evaluating other gates", () => {
        assert.throws(() => part1("missing OR 1 -> a"), /Wire missing not found/)
    })
})

describe("2015 day 07: circuit construction", () => {
    it("builds a circuit from instructions", () => {
        assert.equal(Circuit.fromInput("1 AND 3 -> a").evaluate("a"), 1)
    })
})

describe("2015 day 07: evaluation cache", () => {
    it("evaluates a shared zero-valued wire once per mapping", () => {
        const mapping = new Circuit()
        let evaluations = 0
        const zero: Operation = {
            evaluate: () => {
                evaluations += 1
                return 0
            },
        }
        const instruction = "zero AND zero -> a"

        mapping.set("zero", zero)
        mapping.set("a", new And(instruction, [instruction, "zero", "zero", "a"]))

        assert.equal(mapping.evaluate("a"), 0)
        assert.equal(mapping.evaluate("a"), 0)
        assert.equal(evaluations, 1)

        mapping.set("zero", {evaluate: () => 1})
        assert.equal(mapping.evaluate("a"), 1)
    })

    it("does not reuse cached results across circuit mappings", () => {
        let firstEvaluations = 0
        let secondEvaluations = 0
        const firstMapping = new Circuit()
        firstMapping.set("a", {
            evaluate: () => {
                firstEvaluations += 1
                return 1
            },
        })
        const secondMapping = new Circuit()
        secondMapping.set("a", {
            evaluate: () => {
                secondEvaluations += 1
                return 2
            },
        })

        assert.equal(firstMapping.evaluate("a"), 1)
        assert.equal(secondMapping.evaluate("a"), 2)
        assert.equal(firstEvaluations, 1)
        assert.equal(secondEvaluations, 1)
    })

    it("uses the evaluating circuit for a shared operation instance", () => {
        const instruction = "x AND 3 -> a"
        const operation = new And(instruction, [instruction, "x", "3", "a"])
        let firstInputEvaluations = 0
        let secondInputEvaluations = 0
        let replacementEvaluations = 0
        const firstCircuit = new Circuit()
        firstCircuit.set("x", {
            evaluate: () => {
                firstInputEvaluations += 1
                return 1
            },
        })
        firstCircuit.set("a", operation)
        const secondCircuit = new Circuit()
        secondCircuit.set("x", {
            evaluate: () => {
                secondInputEvaluations += 1
                return 2
            },
        })
        secondCircuit.set("a", operation)

        assert.equal(firstCircuit.evaluate("a"), 1)
        assert.equal(firstCircuit.evaluate("a"), 1)
        assert.equal(secondCircuit.evaluate("a"), 2)
        assert.equal(secondCircuit.evaluate("a"), 2)
        assert.equal(firstInputEvaluations, 1)
        assert.equal(secondInputEvaluations, 1)

        firstCircuit.set("x", {
            evaluate: () => {
                replacementEvaluations += 1
                return 3
            },
        })
        assert.equal(firstCircuit.evaluate("a"), 3)
        assert.equal(firstCircuit.evaluate("a"), 3)
        assert.equal(secondCircuit.evaluate("a"), 2)
        assert.equal(replacementEvaluations, 1)
    })
})

// Your answers live in inputs/<year>/dayNN.expected.json (git-ignored), e.g. {"part1": 1, "part2": 2}.
const expected: {part1?: number; part2?: number} = readExpected(2015, 7)

const input = readInput(2015, 7)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 7)}`
        : answer === undefined
            ? "expected answer not recorded yet"
            : false

describe("2015 day 07: full input", () => {
    it("part 1", {skip: skip(expected.part1)}, pending(() => {
        assert.equal(part1(input!), expected.part1)
    }))
    it("part 2", {skip: skip(expected.part2)}, pending(() => {
        assert.equal(part2(input!), expected.part2)
    }))
})
