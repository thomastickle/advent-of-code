import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readExpected, readInput} from "../../input.ts"
import {part1, part2} from "./day18.ts"

describe("2015 day 18: examples", () => {
    // The example is a 6x6 grid run for 4 steps; the real one is 100x100 for 100 steps.
    it("part 1: the example (6 lines) (steps 4) -> 4", pending(() => {
        const input = [
            ".#.#.#",
            "...##.",
            "#....#",
            "..#...",
            "#.#..#",
            "####..",
        ].join("\n")
        assert.equal(part1(input, 4), 4)
    }))

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them below as it("part 2: ...") calls.
})

// Your answers live in inputs/<year>/dayNN.expected.json (git-ignored), e.g. {"part1": 1, "part2": 2}.
const expected: {part1?: number; part2?: number} = readExpected(2015, 18)

const input = readInput(2015, 18)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 18)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 18: full input", () => {
    it("part 1", {skip: skip(expected.part1)}, pending(() => {
        assert.equal(part1(input!), expected.part1)
    }))
    it("part 2", {skip: skip(expected.part2)}, pending(() => {
        assert.equal(part2(input!), expected.part2)
    }))
})
