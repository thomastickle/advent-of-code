import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {answer, fullInputTests, pending} from "../../testing.ts"
import {solve} from "./day15.ts"

describe("2015 day 15: examples", () => {
    it("part 1: the example (2 lines) -> 62842880", pending(() => {
        const input = [
            "Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8",
            "Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3",
        ].join("\n")
        assert.equal(answer(solve(input), 1), 62842880)
    }))

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them below as it("part 2: ...") calls.
})

fullInputTests(2015, 15, solve)
