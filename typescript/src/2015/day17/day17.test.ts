import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {answer, fullInputTests, pending} from "../../testing.ts"
import {solve} from "./day17.ts"

describe("2015 day 17: examples", () => {
    // The example stores 25 liters; the real puzzle stores 150.
    it("part 1: the example (5 lines) (liters 25) -> 4", pending(() => {
        const input = [
            "20",
            "15",
            "10",
            "5",
            "5",
        ].join("\n")
        assert.equal(answer(solve(input, 25), 1), 4)
    }))

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them below as it("part 2: ...") calls.
})

fullInputTests(2015, 17, solve)
