import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {fullInputTests} from "../../testing.ts"
import {solve} from "./day03.ts"

describe("2015 day 03: examples", () => {
    it("part 1: \">\" -> 2", () => {
        assert.equal(solve(">")[0], 2)
    })
    it("part 1: \"^>v<\" -> 4", () => {
        assert.equal(solve("^>v<")[0], 4)
    })
    it("part 1: \"^v^v^v^v^v\" -> 2", () => {
        assert.equal(solve("^v^v^v^v^v")[0], 2)
    })

    // Santa and Robo-Santa take turns, starting from the same house.
    it("part 2: \"^v\" -> 3", () => {
        assert.equal(solve("^v")[1], 3)
    })
    it("part 2: \"^>v<\" -> 3", () => {
        assert.equal(solve("^>v<")[1], 3)
    })
    it("part 2: \"^v^v^v^v^v\" -> 11", () => {
        assert.equal(solve("^v^v^v^v^v")[1], 11)
    })
})

fullInputTests(2015, 3, solve)
