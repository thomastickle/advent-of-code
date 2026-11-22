import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {fullInputTests} from "../../testing.ts"
import {findLowestNumber, solve} from "./day04.ts"

describe("2015 day 04: examples", () => {
    // The input is the secret key itself.
    it("part 1: \"abcdef\" -> 609043", () => {
        assert.equal(findLowestNumber("abcdef", 5), 609043)
    })
    it("part 1: \"pqrstuv\" -> 1048970", () => {
        assert.equal(findLowestNumber("pqrstuv", 5), 1048970)
    })

    // The page gives no part 2 examples.
})

fullInputTests(2015, 4, solve)
