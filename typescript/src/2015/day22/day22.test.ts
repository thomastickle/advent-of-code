import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readInput} from "../../input.ts"
import {part1, part2, playerWins, type Spell} from "./day22.ts"

describe("2015 day 22: examples", () => {
    it(
        "part 1: first example fight, Poison then Magic Missile",
        pending(() => {
            assert.equal(
                playerWins({hitPoints: 10, mana: 250}, {hitPoints: 13, damage: 8}, ["Poison", "Magic Missile"]),
                true,
            )
        }),
    )

    it(
        "part 1: second example fight, five spells against a 14 hit point boss",
        pending(() => {
            const spells: Spell[] = ["Recharge", "Shield", "Drain", "Poison", "Magic Missile"]
            assert.equal(playerWins({hitPoints: 10, mana: 250}, {hitPoints: 14, damage: 8}, spells), true)
        }),
    )

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them here.
})

// Fill these in once you've solved it, so the full input stays a regression test.
const expected: {part1?: number; part2?: number} = {}

const input = readInput(2015, 22)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 22)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 22: full input", () => {
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
