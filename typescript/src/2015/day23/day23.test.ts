import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {fullInputTests, pending} from "../../testing.ts"
import {run, solve} from "./day23.ts"

describe("2015 day 23: examples", () => {
    it("part 1: the example program leaves 2 in register a", pending(() => {
        assert.equal(run(["inc a", "jio a, +2", "tpl a", "inc a"].join("\n")).a, 2)
    }))

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them below as it("part 2: ...") calls.
})

fullInputTests(2015, 23, solve)
