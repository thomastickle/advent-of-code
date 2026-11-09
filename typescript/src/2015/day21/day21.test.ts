import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readExpected, readInput} from "../../input.ts"
import {part1, part2, playerWins} from "./day21.ts"

describe("2015 day 21: examples", () => {
    it(
        "part 1: the player barely wins the example fight",
        pending(() => {
            const player = {hitPoints: 8, damage: 5, armor: 5}
            const boss = {hitPoints: 12, damage: 7, armor: 2}
            assert.equal(playerWins(player, boss), true)
        }),
    )

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them here.
})

// Your answers live in inputs/<year>/dayNN.expected.json (git-ignored), e.g. {"part1": 1, "part2": 2}.
const expected: {part1?: number; part2?: number} = readExpected(2015, 21)

const input = readInput(2015, 21)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 21)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 21: full input", () => {
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
