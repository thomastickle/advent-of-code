import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {inputPath, readInput} from "../../input.ts"
import {part1, part2} from "./day05.ts"

describe("2015 day 05: examples", () => {
    // Each example is one string; the last case runs all five as separate lines.
    const part1Cases: [string, number][] = [
        ["ugknbfddgicrmopn", 1],
        ["aaa", 1],
        ["jchzalrnumimnmhp", 0],
        ["haegwjzuvuyypxyu", 0],
        ["dvszwmarrgswjxmb", 0],
        ["ugknbfddgicrmopn\naaa\njchzalrnumimnmhp\nhaegwjzuvuyypxyu\ndvszwmarrgswjxmb", 2],
    ]
    for (const [input, expected] of part1Cases) {
        it(`part 1: ${JSON.stringify(input)} -> ${expected}`, () => {
            assert.equal(part1(input), expected)
        })
    }

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them here.
    const part2Cases: [string, number][] = []
    for (const [input, expected] of part2Cases) {
        it(`part 2: ${JSON.stringify(input)} -> ${expected}`, () => {
            assert.equal(part2(input), expected)
        })
    }
})

// Fill these in once you've solved it, so the full input stays a regression test.
const expected: {part1?: number; part2?: number} = {}

const input = readInput(2015, 5)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 5)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 05: full input", () => {
    it("part 1", {skip: skip(expected.part1)}, () => {
        assert.equal(part1(input!), expected.part1)
    })
    it("part 2", {skip: skip(expected.part2)}, () => {
        assert.equal(part2(input!), expected.part2)
    })
})
