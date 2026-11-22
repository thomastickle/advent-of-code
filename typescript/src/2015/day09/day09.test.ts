import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {fullInputTests} from "../../testing.ts"
import {solve} from "./day09.ts"

describe("2015 day 09: examples", () => {
    it("part 1: the example (3 lines) -> 605", () => {
        const input = [
            "London to Dublin = 464",
            "London to Belfast = 518",
            "Dublin to Belfast = 141",
        ].join("\n")
        assert.equal(solve(input)[0], 605)
    })

    // Longest route, derived from the six route totals the page lists.
    // Check it against the page once part 2 is unlocked.
    it("part 2: the example (3 lines) -> 982", () => {
        const input = [
            "London to Dublin = 464",
            "London to Belfast = 518",
            "Dublin to Belfast = 141",
        ].join("\n")
        assert.equal(solve(input)[1], 982)
    })
})

fullInputTests(2015, 9, solve)
