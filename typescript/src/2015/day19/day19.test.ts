import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {answer, fullInputTests, pending} from "../../testing.ts"
import {solve} from "./day19.ts"

describe("2015 day 19: examples", () => {
    // Input is the replacement rules, a blank line, then the molecule.
    it("part 1: the example (5 lines) -> 4", pending(() => {
        const input = [
            "H => HO",
            "H => OH",
            "O => HH",
            "",
            "HOH",
        ].join("\n")
        assert.equal(answer(solve(input), 1), 4)
    }))
    it("part 1: the example (5 lines) -> 7", pending(() => {
        const input = [
            "H => HO",
            "H => OH",
            "O => HH",
            "",
            "HOHOHO",
        ].join("\n")
        assert.equal(answer(solve(input), 1), 7)
    }))

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them below as it("part 2: ...") calls.
})

fullInputTests(2015, 19, solve)
