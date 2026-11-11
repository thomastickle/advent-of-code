import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readExpected, readInput} from "../../input.ts"
import {part1, part2} from "./day07.ts"
import {BinaryGate, Circuit, Wire, type Operation} from "./circuit_operators.ts"


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

    // The page gives no example for part 2, so these are derived by hand from its rule: take the signal on wire a,
    // override wire b with it, reset every other wire (a included), and read a again. Each circuit has wires a and b.
    it("part 2: NOT undoes itself once b holds a's inverted signal (derived)", pending(() => {
        // a is first 65528, so b becomes 65528 and NOT of that is 7.
        assert.equal(part2("7 -> b\nNOT b -> a"), 7)
    }))
    it("part 2: a is read once more, not fed back again (derived)", pending(() => {
        // a is first 6, so b becomes 6 and a becomes 12. A second pass would give 24.
        assert.equal(part2("3 -> b\nb LSHIFT 1 -> a"), 12)
    }))
    it("part 2: wires between b and a are recomputed, not reused (derived)", pending(() => {
        // First x is 4 and a is 5. Then b becomes 5, so x becomes 10 and a becomes 11. A stale x would give 5.
        assert.equal(part2("2 -> b\nb LSHIFT 1 -> x\nx OR 1 -> a"), 11)
    }))
    it("part 2: the override replaces b's own gate (derived)", pending(() => {
        // a is first 12, so b becomes 12 whatever x says, and a becomes 24. Keeping b's gate would give 12.
        assert.equal(part2("3 -> x\nx LSHIFT 1 -> b\nb LSHIFT 1 -> a"), 24)
    }))
    it("part 2: a keeps its value when it doesn't depend on b (derived)", pending(() => {
        assert.equal(part2("10 -> a\n1 -> b"), 10)
    }))
    it("part 2: an override of 0 still counts as an override (derived)", pending(() => {
        // a is first 0, so b becomes 0 and NOT of that is 65535. Ignoring a zero would leave b at 65535 and give 0.
        assert.equal(part2("65535 -> b\nNOT b -> a"), 65535)
    }))
    it("part 2: the override keeps its full 16 bits (derived)", pending(() => {
        // a is first 32768, so b becomes 32768 and shifting it left by 15 leaves no bits within 16, giving 0.
        assert.equal(part2("1 -> b\nb LSHIFT 15 -> a"), 0)
    }))
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

    it("keeps NOT results within the 16-bit signal width", () => {
        assert.equal(part1("NOT 65535 -> a"), 0)
    })

    it("reports missing wires when evaluating other gates", () => {
        assert.throws(() => part1("missing OR 1 -> a"), /Wire missing not found/)
    })
})

describe("2015 day 07: missing wire errors name the instruction", () => {
    it("AND", () => {
        assert.throws(() => part1("missing AND 1 -> a"), /Wire missing not found\. missing AND 1 -> a$/)
    })
    it("OR", () => {
        assert.throws(() => part1("1 OR missing -> a"), /Wire missing not found\. 1 OR missing -> a$/)
    })
    it("LSHIFT", () => {
        assert.throws(() => part1("missing LSHIFT 2 -> a"), /Wire missing not found\. missing LSHIFT 2 -> a$/)
    })
    it("RSHIFT", () => {
        assert.throws(() => part1("missing RSHIFT 2 -> a"), /Wire missing not found\. missing RSHIFT 2 -> a$/)
    })
    it("NOT", () => {
        assert.throws(() => part1("NOT missing -> a"), /Wire missing not found\. NOT missing -> a$/)
    })
    it("a plain wire", () => {
        assert.throws(() => part1("missing -> a"), /Wire missing not found\. missing -> a$/)
    })
})

describe("2015 day 07: circuit construction", () => {
    it("builds a circuit from instructions", () => {
        assert.equal(Circuit.fromInput("1 AND 3 -> a").evaluate("a"), 1)
    })

    it("rejects an unknown gate", () => {
        assert.throws(() => Circuit.fromInput("1 -> x\nx XOR 2 -> y"), /Invalid line: x XOR 2 -> y/)
    })
    it("rejects an instruction with a missing operand", () => {
        assert.throws(() => Circuit.fromInput("x AND -> a"), /Invalid line: x AND -> a/)
    })
    it("rejects a blank line", () => {
        assert.throws(() => Circuit.fromInput("1 -> x\n\n2 -> y"), /Invalid line: $/)
    })
})

describe("2015 day 07: any input can be a number or a wire", () => {
    it("takes a shift count from a wire", () => {
        assert.equal(part1("2 -> n\n1 LSHIFT n -> a"), 4)
        assert.equal(part1("2 -> n\n8 RSHIFT n -> a"), 2)
    })
    it("takes a number as the left input of a shift", () => {
        assert.equal(part1("3 -> n\n1 LSHIFT n -> a"), 8)
    })
    it("passes a number straight through NOT", () => {
        assert.equal(part1("NOT 65535 -> a"), 0)
    })
})

describe("2015 day 07: signal range", () => {
    it("accepts the largest signal, 65535", () => {
        assert.equal(part1("65535 -> a"), 65535)
    })
    it("rejects a number above 65535 assigned to a wire", () => {
        assert.throws(() => part1("65536 -> a"), /Signal 65536 is out of range \(0 to 65535\): 65536 -> a/)
    })
    it("rejects a number above 65535 as an input to a gate", () => {
        assert.throws(() => part1("x AND 70000 -> a\n1 -> x"), /Signal 70000 is out of range/)
        assert.throws(() => part1("70000 OR x -> a\n1 -> x"), /Signal 70000 is out of range/)
    })
    it("rejects a number above 65535 as the input to NOT", () => {
        assert.throws(() => part1("NOT 70000 -> a"), /Signal 70000 is out of range/)
    })
    it("rejects an out-of-range number even if no one reads that wire", () => {
        assert.throws(() => Circuit.fromInput("1 -> a\n70000 -> unused"), /Signal 70000 is out of range/)
    })
})

describe("2015 day 07: large shift counts", () => {
    it("shifts left by 15 into the top bit", () => {
        assert.equal(part1("1 LSHIFT 15 -> a"), 32768)
    })
    it("empties the signal when shifting left by 16 or more", () => {
        assert.equal(part1("1 LSHIFT 16 -> a"), 0)
        assert.equal(part1("1 LSHIFT 32 -> a"), 0)
    })
    it("empties the signal when shifting right by 16 or more", () => {
        assert.equal(part1("65535 RSHIFT 16 -> a"), 0)
        assert.equal(part1("65535 RSHIFT 32 -> a"), 0)
    })
})

describe("2015 day 07: cycles", () => {
    it("rejects a wire that feeds itself", () => {
        assert.throws(() => part1("a -> a"), /Circuit has a cycle: a -> a$/)
    })
    it("rejects two wires that feed each other", () => {
        assert.throws(() => part1("a -> b\nb -> a"), /Circuit has a cycle: b -> a -> b$/)
    })
    it("rejects a cycle behind a gate", () => {
        assert.throws(() => part1("x AND a -> b\nb -> a\n1 -> x"), /Circuit has a cycle: b -> a -> b$/)
    })
    it("rejects a cycle through a NOT and a shift", () => {
        assert.throws(() => part1("NOT b -> a\na LSHIFT 1 -> b"), /Circuit has a cycle: a -> b -> a$/)
    })
    it("reports the cycle even when asked for a wire outside it", () => {
        assert.throws(() => part1("1 -> ok\na -> b\nb -> a", "ok"), /Circuit has a cycle/)
    })
    it("does not mistake a wire shared by two paths for a cycle", () => {
        assert.equal(part1("1 -> x\nx -> y\nx -> z\ny AND z -> a"), 1)
    })
    it("accepts the cycle being broken by replacing a wire's operation", () => {
        const circuit = Circuit.fromInput("a -> b\nb -> a")
        assert.throws(() => circuit.evaluate("a"), /Circuit has a cycle/)

        circuit.set("b", {evaluate: () => 5})
        assert.equal(circuit.evaluate("a"), 5)
    })
    it("rejects a cycle that is introduced by replacing a wire's operation", () => {
        const circuit = Circuit.fromInput("1 -> b\nb -> a")
        assert.equal(circuit.evaluate("a"), 1)

        circuit.set("b", new Wire("a -> b", ["a -> b", "a", "b"]))
        assert.throws(() => circuit.evaluate("a"), /Circuit has a cycle: b -> a -> b$/)
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
        mapping.set("a", new BinaryGate(instruction, [instruction, "zero", "AND", "zero", "a"]))

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
        const operation = new BinaryGate(instruction, [instruction, "x", "AND", "3", "a"])
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
