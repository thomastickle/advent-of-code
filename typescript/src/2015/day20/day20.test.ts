import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readExpected, readInput} from "../../input.ts"
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
        it(
            `part 1: ${JSON.stringify(input)} -> ${expected}`,
            pending(() => {
                assert.equal(part1(input), expected)
            }),
        )
    }

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them here.
    const part2Cases: [string, number][] = []
    for (const [input, expected] of part2Cases) {
        it(
            `part 2: ${JSON.stringify(input)} -> ${expected}`,
            pending(() => {
                assert.equal(part2(input), expected)
            }),
        )
    }
})

// Your answers live in inputs/<year>/dayNN.expected.json (git-ignored), e.g. {"part1": 1, "part2": 2}.
const expected: {part1?: number; part2?: number} = readExpected(2015, 20)

const input = readInput(2015, 20)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 20)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 20: full input", () => {
    it(
        "part 1",
        {skip: skip(expected.part1)},
        pending(() => {
            assert.equal(part1(input!), expected.part1)
        }),
    )
    it(
        "part 2",
        {skip: skip(expected.part2)},
        pending(() => {
            assert.equal(part2(input!), expected.part2)
        }),
    )
})
