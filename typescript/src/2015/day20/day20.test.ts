import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {inputPath, readInput} from "../../input.ts"
import {part1, part2} from "./day20.ts"

describe("2015 day 20: examples", () => {
    // Lowest house getting at least N presents. Derived from the page's table: houses 1-9 get 10, 30, 40, 70, 60, 120, 80, 150, 130.
    const part1Cases: [string, number][] = [
        ["10", 1],
        ["30", 2],
        ["40", 3],
        ["70", 4],
        ["120", 6],
        ["150", 8],
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

const input = readInput(2015, 20)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 20)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 20: full input", () => {
    it("part 1", {skip: skip(expected.part1)}, () => {
        assert.equal(part1(input!), expected.part1)
    })
    it("part 2", {skip: skip(expected.part2)}, () => {
        assert.equal(part2(input!), expected.part2)
    })
})
