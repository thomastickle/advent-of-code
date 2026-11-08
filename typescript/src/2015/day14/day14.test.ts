import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readInput} from "../../input.ts"
import {part1, part2} from "./day14.ts"

describe("2015 day 14: examples", () => {
    // The example race lasts 1000 seconds; the real one lasts 2503.
    const part1Cases: [string, number, number][] = [
        [
            "Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.\nDancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.",
            1000,
            1120,
        ],
    ]
    for (const [input, seconds, expected] of part1Cases) {
        it(
            `part 1: ${JSON.stringify(input)} (seconds ${seconds}) -> ${expected}`,
            pending(() => {
                assert.equal(part1(input, seconds), expected)
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

// Fill these in once you've solved it, so the full input stays a regression test.
const expected: {part1?: number; part2?: number} = {}

const input = readInput(2015, 14)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 14)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 14: full input", () => {
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
