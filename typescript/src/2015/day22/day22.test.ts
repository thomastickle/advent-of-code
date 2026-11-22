import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {fullInputTests, pending} from "../../testing.ts"
import {playerWins, solve, type Spell} from "./day22.ts"

describe("2015 day 22: examples", () => {
    it("part 1: first example fight, Poison then Magic Missile", pending(() => {
        assert.equal(
            playerWins({hitPoints: 10, mana: 250}, {hitPoints: 13, damage: 8}, ["Poison", "Magic Missile"]),
            true,
        )
    }))

    it("part 1: second example fight, five spells against a 14 hit point boss", pending(() => {
        const spells: Spell[] = ["Recharge", "Shield", "Drain", "Poison", "Magic Missile"]
        assert.equal(playerWins({hitPoints: 10, mana: 250}, {hitPoints: 14, damage: 8}, spells), true)
    }))

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them below as it("part 2: ...") calls.
})

fullInputTests(2015, 22, solve)
