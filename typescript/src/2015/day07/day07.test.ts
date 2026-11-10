import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readExpected, readInput} from "../../input.ts"
import {part1, part2} from "./day07.ts"

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
    ].join("\n")

    // The example has no wire a, so each case reads a different wire.
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
    it("part 1: wire x -> 123", pending(() => {
        assert.equal(part1(example, "x"), 123)
    }))
    it("part 1: wire y -> 456", pending(() => {
        assert.equal(part1(example, "y"), 456)
    }))

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them below as it("part 2: ...") calls.
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
