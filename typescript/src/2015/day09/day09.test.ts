import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {inputPath, readInput} from "../../input.ts"
import {part1, part2} from "./day09.ts"

describe("2015 day 09: examples", () => {
    const part1Cases: [string, number][] = [
        ["London to Dublin = 464\nLondon to Belfast = 518\nDublin to Belfast = 141", 605],
    ]
    for (const [input, expected] of part1Cases) {
        it(`part 1: ${JSON.stringify(input)} -> ${expected}`, () => {
            assert.equal(part1(input), expected)
        })
    }

    // Longest route, derived from the six route totals the page lists. Check it against the page once part 2 is unlocked.
    const part2Cases: [string, number][] = [
        ["London to Dublin = 464\nLondon to Belfast = 518\nDublin to Belfast = 141", 982],
    ]
    for (const [input, expected] of part2Cases) {
        it(`part 2: ${JSON.stringify(input)} -> ${expected}`, () => {
            assert.equal(part2(input), expected)
        })
    }
})

// Fill these in once you've solved it, so the full input stays a regression test.
const expected: {part1?: number; part2?: number} = {}

const input = readInput(2015, 9)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 9)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 09: full input", () => {
    it("part 1", {skip: skip(expected.part1)}, () => {
        assert.equal(part1(input!), expected.part1)
    })
    it("part 2", {skip: skip(expected.part2)}, () => {
        assert.equal(part2(input!), expected.part2)
    })
})
