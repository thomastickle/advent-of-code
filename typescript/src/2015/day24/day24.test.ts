import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {answer, fullInputTests, pending} from "../../testing.ts"
import {solve} from "./day24.ts"

describe("2015 day 24: examples", () => {
    // Ten packages split into three equal groups.
    it("part 1: the example (10 lines) -> 99", pending(() => {
        const input = [
            "1",
            "2",
            "3",
            "4",
            "5",
            "7",
            "8",
            "9",
            "10",
            "11",
        ].join("\n")
        assert.equal(answer(solve(input), 1), 99)
    }))

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them below as it("part 2: ...") calls.
})

fullInputTests(2015, 24, solve)
