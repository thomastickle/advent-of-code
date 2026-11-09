import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readExpected, readInput} from "../../input.ts"
import {part1, part2} from "./day13.ts"

describe("2015 day 13: examples", () => {
    const part1Cases: [string, number][] = [
        [
            "Alice would gain 54 happiness units by sitting next to Bob.\nAlice would lose 79 happiness units by sitting next to Carol.\nAlice would lose 2 happiness units by sitting next to David.\nBob would gain 83 happiness units by sitting next to Alice.\nBob would lose 7 happiness units by sitting next to Carol.\nBob would lose 63 happiness units by sitting next to David.\nCarol would lose 62 happiness units by sitting next to Alice.\nCarol would gain 60 happiness units by sitting next to Bob.\nCarol would gain 55 happiness units by sitting next to David.\nDavid would gain 46 happiness units by sitting next to Alice.\nDavid would lose 7 happiness units by sitting next to Bob.\nDavid would gain 41 happiness units by sitting next to Carol.",
            330,
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

// Your answers live in inputs/<year>/dayNN.expected.json (git-ignored), e.g. {"part1": 1, "part2": 2}.
const expected: {part1?: number; part2?: number} = readExpected(2015, 13)

const input = readInput(2015, 13)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 13)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 13: full input", () => {
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
