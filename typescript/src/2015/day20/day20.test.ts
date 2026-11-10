import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readExpected, readInput} from "../../input.ts"
import {part1, part2} from "./day20.ts"

describe("2015 day 20: examples", () => {
    // Lowest house getting at least N presents. Derived from the page's table:
    // houses 1-9 get 10, 30, 40, 70, 60, 120, 80, 150, 130.
    it("part 1: \"10\" -> 1", pending(() => {
        assert.equal(part1("10"), 1)
    }))
    it("part 1: \"30\" -> 2", pending(() => {
        assert.equal(part1("30"), 2)
    }))
    it("part 1: \"40\" -> 3", pending(() => {
        assert.equal(part1("40"), 3)
    }))
    it("part 1: \"70\" -> 4", pending(() => {
        assert.equal(part1("70"), 4)
    }))
    it("part 1: \"120\" -> 6", pending(() => {
        assert.equal(part1("120"), 6)
    }))
    it("part 1: \"150\" -> 8", pending(() => {
        assert.equal(part1("150"), 8)
    }))

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them below as it("part 2: ...") calls.
})

// Your answers live in inputs/<year>/dayNN.expected.json (git-ignored), e.g. {"part1": 1, "part2": 2}.
const expected: {part1?: number; part2?: number} = readExpected(2015, 20)

const input = readInput(2015, 20)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 20)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 20: full input", () => {
    it("part 1", {skip: skip(expected.part1)}, pending(() => {
        assert.equal(part1(input!), expected.part1)
    }))
    it("part 2", {skip: skip(expected.part2)}, pending(() => {
        assert.equal(part2(input!), expected.part2)
    }))
})
