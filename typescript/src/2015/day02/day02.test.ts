import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readExpected, readInput} from "../../input.ts"
import {part1, part2} from "./day02.ts"

describe("2015 day 02: examples", () => {
    // Square feet of wrapping paper: surface area plus the area of the smallest side.
    it("part 1: \"2x3x4\" -> 58", pending(() => {
        assert.equal(part1("2x3x4"), 58)
    }))
    it("part 1: \"1x1x10\" -> 43", pending(() => {
        assert.equal(part1("1x1x10"), 43)
    }))
    it("part 1: the example (2 lines) -> 101", pending(() => {
        const input = [
            "2x3x4",
            "1x1x10",
        ].join("\n")
        assert.equal(part1(input), 101)
    }))

    // Feet of ribbon: the shortest perimeter around one face plus the volume for the bow.
    it("part 2: \"2x3x4\" -> 34", pending(() => {
        assert.equal(part2("2x3x4"), 34)
    }))
    it("part 2: \"1x1x10\" -> 14", pending(() => {
        assert.equal(part2("1x1x10"), 14)
    }))
    it("part 2: the example (2 lines) -> 48", pending(() => {
        const input = [
            "2x3x4",
            "1x1x10",
        ].join("\n")
        assert.equal(part2(input), 48)
    }))
})

// Your answers live in inputs/<year>/dayNN.expected.json (git-ignored), e.g. {"part1": 1, "part2": 2}.
const expected: {part1?: number; part2?: number} = readExpected(2015, 2)

const input = readInput(2015, 2)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 2)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 02: full input", () => {
    it("part 1", {skip: skip(expected.part1)}, pending(() => {
        assert.equal(part1(input!), expected.part1)
    }))
    it("part 2", {skip: skip(expected.part2)}, pending(() => {
        assert.equal(part2(input!), expected.part2)
    }))
})
