import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {answer, fullInputTests, pending} from "../../testing.ts"
import {solve} from "./day18.ts"

describe("2015 day 18: examples", () => {
    // The example is a 6x6 grid run for 4 steps; the real one is 100x100 for 100 steps.
    it("part 1: the example (6 lines) (steps 4) -> 4", pending(() => {
        const input = [
            ".#.#.#",
            "...##.",
            "#....#",
            "..#...",
            "#.#..#",
            "####..",
        ].join("\n")
        assert.equal(answer(solve(input, 4), 1), 4)
    }))

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them below as it("part 2: ...") calls.
})

fullInputTests(2015, 18, solve)
