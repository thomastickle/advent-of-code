import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {fullInputTests, pending} from "../../testing.ts"
import {solve} from "./day16.ts"

describe("2015 day 16: examples", () => {
    // The page has no worked example with a stated result (just the ticker tape readings).

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them below as it("part 2: ...") calls.
})

fullInputTests(2015, 16, solve)
