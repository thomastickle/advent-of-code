import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readExpected, readInput} from "../../input.ts"
import {part1, part2} from "./day05.ts"

describe("2015 day 05: examples", () => {
    // Each example is one string; the last case runs all five as separate lines.
    it("part 1: \"ugknbfddgicrmopn\" -> 1", pending(() => {
        assert.equal(part1("ugknbfddgicrmopn"), 1)
    }))
    it("part 1: \"aaa\" -> 1", pending(() => {
        assert.equal(part1("aaa"), 1)
    }))
    it("part 1: \"jchzalrnumimnmhp\" -> 0", pending(() => {
        assert.equal(part1("jchzalrnumimnmhp"), 0)
    }))
    it("part 1: \"haegwjzuvuyypxyu\" -> 0", pending(() => {
        assert.equal(part1("haegwjzuvuyypxyu"), 0)
    }))
    it("part 1: \"dvszwmarrgswjxmb\" -> 0", pending(() => {
        assert.equal(part1("dvszwmarrgswjxmb"), 0)
    }))
    it("part 1: the example (5 lines) -> 2", pending(() => {
        const input = [
            "ugknbfddgicrmopn",
            "aaa",
            "jchzalrnumimnmhp",
            "haegwjzuvuyypxyu",
            "dvszwmarrgswjxmb",
        ].join("\n")
        assert.equal(part1(input), 2)
    }))

    // Each example is one string; the last case (derived, not on the page) runs all four as separate lines.
    it("part 2: \"qjhvhtzxzqqjkmpb\" -> 1", pending(() => {
        assert.equal(part2("qjhvhtzxzqqjkmpb"), 1)
    }))
    it("part 2: \"xxyxx\" -> 1", pending(() => {
        assert.equal(part2("xxyxx"), 1)
    }))
    it("part 2: \"uurcxstgmygtbstg\" -> 0", pending(() => {
        assert.equal(part2("uurcxstgmygtbstg"), 0)
    }))
    it("part 2: \"ieodomkazucvgmuy\" -> 0", pending(() => {
        assert.equal(part2("ieodomkazucvgmuy"), 0)
    }))
    it("part 2: the example (4 lines) -> 2", pending(() => {
        const input = [
            "qjhvhtzxzqqjkmpb",
            "xxyxx",
            "uurcxstgmygtbstg",
            "ieodomkazucvgmuy",
        ].join("\n")
        assert.equal(part2(input), 2)
    }))
})

// Your answers live in inputs/<year>/dayNN.expected.json (git-ignored), e.g. {"part1": 1, "part2": 2}.
const expected: {part1?: number; part2?: number} = readExpected(2015, 5)

const input = readInput(2015, 5)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 5)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 05: full input", () => {
    it("part 1", {skip: skip(expected.part1)}, pending(() => {
        assert.equal(part1(input!), expected.part1)
    }))
    it("part 2", {skip: skip(expected.part2)}, pending(() => {
        assert.equal(part2(input!), expected.part2)
    }))
})
