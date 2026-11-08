import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readInput} from "../../input.ts"
import {part1, part2} from "./day08.ts"

describe("2015 day 08: examples", () => {
    // Code characters minus in-memory characters over all four example lines: (2 + 5 + 10 + 6) - (0 + 3 + 7 + 1).
    const part1Cases: [string, number][] = [
        [
            String.raw`""
"abc"
"aaa\"aaa"
"\x27"`,
            12,
        ],
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

// Fill these in once you've solved it, so the full input stays a regression test.
const expected: {part1?: number; part2?: number} = {}

const input = readInput(2015, 8)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 8)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 08: full input", () => {
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
