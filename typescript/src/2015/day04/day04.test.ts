import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {fullInputTests} from "../../testing.ts"
import {part1, part2, solve} from "./day04.ts"

describe("2015 day 04: examples", () => {
    // The input is the secret key itself.
    it("part 1: \"abcdef\" -> 609043", () => {
        assert.equal(part1("abcdef"), 609043)
    })
    it("part 1: \"pqrstuv\" -> 1048970", () => {
        assert.equal(part1("pqrstuv"), 1048970)
    })

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them below as it("part 2: ...") calls.
})

fullInputTests(2015, 4, solve)
