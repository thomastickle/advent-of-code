import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readExpected, readInput} from "../../input.ts"
import {part1, part2} from "./day12.ts"

describe("2015 day 12: examples", () => {
    const part1Cases: [string, number][] = [
        ["[1,2,3]", 6],
        ['{"a":2,"b":4}', 6],
        ["[[[3]]]", 3],
        ['{"a":{"b":4},"c":-1}', 3],
        ['{"a":[-1,1]}', 0],
        ['[-1,{"a":1}]', 0],
        ["[]", 0],
        ["{}", 0],
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
const expected: {part1?: number; part2?: number} = readExpected(2015, 12)

const input = readInput(2015, 12)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 12)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 12: full input", () => {
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
