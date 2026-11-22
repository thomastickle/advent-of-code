import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {fullInputTests, pending} from "../../testing.ts"
import {playerWins, solve} from "./day21.ts"

describe("2015 day 21: examples", () => {
    it("part 1: the player barely wins the example fight", pending(() => {
        const player = {hitPoints: 8, damage: 5, armor: 5}
        const boss = {hitPoints: 12, damage: 7, armor: 2}
        assert.equal(playerWins(player, boss), true)
    }))

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them below as it("part 2: ...") calls.
})

fullInputTests(2015, 21, solve)
