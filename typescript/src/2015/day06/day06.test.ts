import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readExpected, readInput} from "../../input.ts"
import {part1, part2} from "./day06.ts"

describe("2015 day 06: examples", () => {
    // The page gives no numeric results. These counts are derived from its descriptions (the grid starts all off).
    const part1Cases: [string, number][] = [
        ["turn on 0,0 through 999,999", 1000000],
        ["toggle 0,0 through 999,0", 1000],
        ["turn off 499,499 through 500,500", 0],
        ["turn on 0,0 through 999,999\nturn off 499,499 through 500,500", 999996],
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
const expected: {part1?: number; part2?: number} = readExpected(2015, 6)

const input = readInput(2015, 6)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 6)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 06: full input", () => {
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
