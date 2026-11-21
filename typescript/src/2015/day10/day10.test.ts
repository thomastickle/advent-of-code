import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readExpected, readInput} from "../../input.ts"
import {lookAndSay, part1, part2} from "./day10.ts"

describe("2015 day 10: lookAndSay examples", () => {
    // Lengths of 11, 21, 1211, 111221, 312211: the first five steps shown on the page.
    it("\"1\" (rounds 0) -> 1", () => {
        assert.equal(lookAndSay("1", 0), 1)
    })
    it("\"1\" (rounds 1) -> 2", () => {
        assert.equal(lookAndSay("1", 1), 2)
    })
    it("\"1\" (rounds 2) -> 2", () => {
        assert.equal(lookAndSay("1", 2), 2)
    })
    it("\"1\" (rounds 3) -> 4", () => {
        assert.equal(lookAndSay("1", 3), 4)
    })
    it("\"1\" (rounds 4) -> 6", () => {
        assert.equal(lookAndSay("1", 4), 6)
    })
    it("\"1\" (rounds 5) -> 6", () => {
        assert.equal(lookAndSay("1", 5), 6)
    })

    // Other starting strings: "211" says "1221" and "111221" says "312211".
    it("\"211\" (rounds 1) -> 4", () => {
        assert.equal(lookAndSay("211", 1), 4)
    })
    it("\"111221\" (rounds 1) -> 6", () => {
        assert.equal(lookAndSay("111221", 1), 6)
    })

    // Part 1 and part 2 are the same walk run for 40 and 50 rounds, so check the lengths it reaches there.
    it("\"1\" (rounds 40) -> 82350", () => {
        assert.equal(lookAndSay("1", 40), 82350)
    })
    it("\"1\" (rounds 50) -> 1166642", () => {
        assert.equal(lookAndSay("1", 50), 1166642)
    })
})

describe("2015 day 10: part examples", () => {
    it("part 1 runs 40 rounds: \"1113222113\" -> 252594", () => {
        assert.equal(part1("1113222113"), 252594)
    })
    it("part 2 runs 50 rounds: \"1113222113\" -> 3579328", () => {
        assert.equal(part2("1113222113"), 3579328)
    })
})

// Your answers live in inputs/<year>/dayNN.expected.json (git-ignored), e.g. {"part1": 1, "part2": 2}.
const expected: {part1?: number; part2?: number} = readExpected(2015, 10)

const input = readInput(2015, 10)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 10)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 10: full input", () => {
    it("part 1", {skip: skip(expected.part1)}, pending(() => {
        assert.equal(part1(input!), expected.part1)
    }))
    it("part 2", {skip: skip(expected.part2)}, pending(() => {
        assert.equal(part2(input!), expected.part2)
    }))
})
