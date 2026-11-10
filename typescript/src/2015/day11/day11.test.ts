import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readExpected, readInput} from "../../input.ts"
import {part1, part2} from "./day11.ts"

describe("2015 day 11: examples", () => {
    it("part 1: \"abcdefgh\" -> abcdffaa", pending(() => {
        assert.equal(part1("abcdefgh"), "abcdffaa")
    }))
    it("part 1: \"ghijklmn\" -> ghjaabcc", pending(() => {
        assert.equal(part1("ghijklmn"), "ghjaabcc")
    }))

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them below as it("part 2: ...") calls.
})

// Your answers live in inputs/<year>/dayNN.expected.json (git-ignored), e.g. {"part1": 1, "part2": 2}.
const expected: {part1?: string; part2?: string} = readExpected(2015, 11)

const input = readInput(2015, 11)
const skip = (answer: string | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 11)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 11: full input", () => {
    it("part 1", {skip: skip(expected.part1)}, pending(() => {
        assert.equal(part1(input!), expected.part1)
    }))
    it("part 2", {skip: skip(expected.part2)}, pending(() => {
        assert.equal(part2(input!), expected.part2)
    }))
})
