import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {answer, fullInputTests, pending} from "../../testing.ts"
import {solve} from "./day12.ts"

describe("2015 day 12: examples", () => {
    it("part 1: \"[1,2,3]\" -> 6", pending(() => {
        assert.equal(answer(solve("[1,2,3]"), 1), 6)
    }))
    it("part 1: \"{\\\"a\\\":2,\\\"b\\\":4}\" -> 6", pending(() => {
        assert.equal(answer(solve("{\"a\":2,\"b\":4}"), 1), 6)
    }))
    it("part 1: \"[[[3]]]\" -> 3", pending(() => {
        assert.equal(answer(solve("[[[3]]]"), 1), 3)
    }))
    it("part 1: \"{\\\"a\\\":{\\\"b\\\":4},\\\"c\\\":-1}\" -> 3", pending(() => {
        assert.equal(answer(solve("{\"a\":{\"b\":4},\"c\":-1}"), 1), 3)
    }))
    it("part 1: \"{\\\"a\\\":[-1,1]}\" -> 0", pending(() => {
        assert.equal(answer(solve("{\"a\":[-1,1]}"), 1), 0)
    }))
    it("part 1: \"[-1,{\\\"a\\\":1}]\" -> 0", pending(() => {
        assert.equal(answer(solve("[-1,{\"a\":1}]"), 1), 0)
    }))
    it("part 1: \"[]\" -> 0", pending(() => {
        assert.equal(answer(solve("[]"), 1), 0)
    }))
    it("part 1: \"{}\" -> 0", pending(() => {
        assert.equal(answer(solve("{}"), 1), 0)
    }))

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them below as it("part 2: ...") calls.
})

fullInputTests(2015, 12, solve)
