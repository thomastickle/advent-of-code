import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readExpected, readInput} from "../../input.ts"
import {part1, part2} from "./day01.ts"

describe("2015 day 01: examples", () => {
    const part1Cases: [string, number][] = [
        ["(())", 0],
        ["()()", 0],
        ["(((", 3],
        ["(()(()(", 3],
        ["))(((((", 3],
        ["())", -1],
        ["))(", -1],
        [")))", -3],
        [")())())", -3],
    ]
    for (const [input, expected] of part1Cases) {
        it(
            `part 1: ${input} -> ${expected}`,
            pending(() => {
                assert.equal(part1(input), expected)
            }),
        )
    }

    const part2Cases: [string, number][] = [
        [")", 1],
        ["()())", 5],
    ]
    for (const [input, expected] of part2Cases) {
        it(
            `part 2: ${input} -> ${expected}`,
            pending(() => {
                assert.equal(part2(input), expected)
            }),
        )
    }
})

// Your answers live in inputs/<year>/dayNN.expected.json (git-ignored), e.g. {"part1": 1, "part2": 2}.
const expected: {part1?: number; part2?: number} = readExpected(2015, 1)

const input = readInput(2015, 1)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 1)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 01: full input", () => {
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
