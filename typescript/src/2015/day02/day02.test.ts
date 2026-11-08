import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readInput} from "../../input.ts"
import {part1, part2} from "./day02.ts"

describe("2015 day 02: examples", () => {
    // Square feet of wrapping paper: surface area plus the area of the smallest side.
    const part1Cases: [string, number][] = [
        ["2x3x4", 58],
        ["1x1x10", 43],
        ["2x3x4\n1x1x10", 101],
    ]
    for (const [input, expected] of part1Cases) {
        it(
            `part 1: ${JSON.stringify(input)} -> ${expected}`,
            pending(() => {
                assert.equal(part1(input), expected)
            }),
        )
    }

    // Feet of ribbon: the shortest perimeter around one face plus the volume for the bow.
    const part2Cases: [string, number][] = [
        ["2x3x4", 34],
        ["1x1x10", 14],
        ["2x3x4\n1x1x10", 48],
    ]
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

const input = readInput(2015, 2)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 2)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 02: full input", () => {
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
