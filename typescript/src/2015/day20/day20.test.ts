import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {answer, fullInputTests, pending} from "../../testing.ts"
import {solve} from "./day20.ts"

describe("2015 day 20: examples", () => {
    // Lowest house getting at least N presents. Derived from the page's table:
    // houses 1-9 get 10, 30, 40, 70, 60, 120, 80, 150, 130.
    it("part 1: \"10\" -> 1", pending(() => {
        assert.equal(answer(solve("10"), 1), 1)
    }))
    it("part 1: \"30\" -> 2", pending(() => {
        assert.equal(answer(solve("30"), 1), 2)
    }))
    it("part 1: \"40\" -> 3", pending(() => {
        assert.equal(answer(solve("40"), 1), 3)
    }))
    it("part 1: \"70\" -> 4", pending(() => {
        assert.equal(answer(solve("70"), 1), 4)
    }))
    it("part 1: \"120\" -> 6", pending(() => {
        assert.equal(answer(solve("120"), 1), 6)
    }))
    it("part 1: \"150\" -> 8", pending(() => {
        assert.equal(answer(solve("150"), 1), 8)
    }))

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them below as it("part 2: ...") calls.
})

fullInputTests(2015, 20, solve)
