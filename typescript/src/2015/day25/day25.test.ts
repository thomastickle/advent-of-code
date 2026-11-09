import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readExpected, readInput} from "../../input.ts"
import {part1, codeAt, sequenceNumber} from "./day25.ts"

describe("2015 day 25: examples", () => {
    for (const [row, column, expected] of [
        [1, 1, 1],
        [2, 1, 2],
        [4, 2, 12],
        [1, 5, 15],
    ] as const) {
        it(
            `part 1: row ${row}, column ${column} is code number ${expected}`,
            pending(() => {
                assert.equal(sequenceNumber(row, column), expected)
            }),
        )
    }

    for (const [row, column, expected] of [
        [1, 1, 20151125],
        [2, 1, 31916031],
    ] as const) {
        it(
            `part 1: the code at row ${row}, column ${column} is ${expected}`,
            pending(() => {
                assert.equal(codeAt(row, column), expected)
            }),
        )
    }
})

// Your answers live in inputs/<year>/dayNN.expected.json (git-ignored), e.g. {"part1": 1, "part2": 2}.
const expected: {part1?: number} = readExpected(2015, 25)

const input = readInput(2015, 25)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 25)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 25: full input", () => {
    it(
        "part 1",
        {skip: skip(expected.part1)},
        pending(() => {
            assert.equal(part1(input!), expected.part1)
        }),
    )
})
