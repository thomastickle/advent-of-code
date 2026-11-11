import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readExpected, readInput} from "../../input.ts"
import {part1, part2} from "./day08.ts"

describe("2015 day 08: examples", () => {
    // The page gives each line's characters of code and characters in memory. The answer for one line is the first
    // minus the second, so these per-line results are derived by subtraction. The last case runs all four as lines.
    it("part 1: the empty string literal (2 of code, 0 in memory) -> 2", pending(() => {
        assert.equal(part1("\"\""), 2)
    }))
    it("part 1: abc (5 of code, 3 in memory) -> 2", pending(() => {
        assert.equal(part1("\"abc\""), 2)
    }))
    it("part 1: aaa with an escaped quote (10 of code, 7 in memory) -> 3", pending(() => {
        assert.equal(part1("\"aaa\\\"aaa\""), 3)
    }))
    it("part 1: a hex escape, x27 (6 of code, 1 in memory) -> 5", pending(() => {
        assert.equal(part1("\"\\x27\""), 5)
    }))
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
