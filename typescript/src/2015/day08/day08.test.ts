import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readExpected, readInput} from "../../input.ts"
import {part1, part2} from "./day08.ts"

describe("2015 day 08: examples", () => {
    // Code characters minus in-memory characters over all four example lines: (2 + 5 + 10 + 6) - (0 + 3 + 7 + 1).
    it("part 1: the example (4 lines) -> 12", pending(() => {
        const input = [
            "\"\"",
            "\"abc\"",
            "\"aaa\\\"aaa\"",
            "\"\\x27\"",
        ].join("\n")
        assert.equal(part1(input), 12)
    }))

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them below as it("part 2: ...") calls.
})

// Your answers live in inputs/<year>/dayNN.expected.json (git-ignored), e.g. {"part1": 1, "part2": 2}.
const expected: {part1?: number; part2?: number} = readExpected(2015, 8)

const input = readInput(2015, 8)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 8)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 08: full input", () => {
    it("part 1", {skip: skip(expected.part1)}, pending(() => {
        assert.equal(part1(input!), expected.part1)
    }))
    it("part 2", {skip: skip(expected.part2)}, pending(() => {
        assert.equal(part2(input!), expected.part2)
    }))
})
