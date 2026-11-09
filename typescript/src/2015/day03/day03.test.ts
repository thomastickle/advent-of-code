import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readExpected, readInput} from "../../input.ts"
import {part1, part2} from "./day03.ts"

describe("2015 day 03: examples", () => {
    const part1Cases: [string, number][] = [
        [">", 2],
        ["^>v<", 4],
        ["^v^v^v^v^v", 2],
    ]
    for (const [input, expected] of part1Cases) {
        it(
            `part 1: ${JSON.stringify(input)} -> ${expected}`,
            pending(() => {
                assert.equal(part1(input), expected)
            }),
        )
    }

    // Santa and Robo-Santa take turns, starting from the same house.
    const part2Cases: [string, number][] = [
        ["^v", 3],
        ["^>v<", 3],
        ["^v^v^v^v^v", 11],
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

// Your answers live in inputs/<year>/dayNN.expected.json (git-ignored), e.g. {"part1": 1, "part2": 2}.
const expected: { part1?: number; part2?: number } = readExpected(2015, 3)

const input = readInput(2015, 3)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 3)}`
        : answer === undefined
            ? "expected answer not recorded yet"
            : false

describe("2015 day 03: full input", () => {
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
