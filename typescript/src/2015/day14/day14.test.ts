import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {answer, fullInputTests, pending} from "../../testing.ts"
import {solve} from "./day14.ts"

const EXAMPLE = [
    "Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.",
    "Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.",
].join("\n")

describe("2015 day 14: examples", () => {
    // The example race lasts 1000 seconds; the real one lasts 2503.
    it("part 1: the example (2 lines) (seconds 1000) -> 1120", pending(() => {
        assert.equal(answer(solve(EXAMPLE, 1000), 1), 1120)
    }))

    it("part 2: the example (2 lines) (seconds 1000) -> 689", pending(() => {
        assert.equal(answer(solve(EXAMPLE, 1000), 2), 689)
    }))
})

fullInputTests(2015, 14, solve)
