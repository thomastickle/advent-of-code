import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {fullInputTests} from "../../testing.ts"
import {solve, walk} from "./day01.ts"

describe("2015 day 01: examples", () => {
    // Most part 1 examples never reach the basement, so solve() would throw on them; they check the walk instead.
    it("part 1: (()) -> 0", () => {
        assert.equal(walk("(())").floor, 0)
    })
    it("part 1: ()() -> 0", () => {
        assert.equal(walk("()()").floor, 0)
    })
    it("part 1: ((( -> 3", () => {
        assert.equal(walk("(((").floor, 3)
    })
    it("part 1: (()(()( -> 3", () => {
        assert.equal(walk("(()(()(").floor, 3)
    })
    it("part 1: ))((((( -> 3", () => {
        assert.equal(walk("))(((((").floor, 3)
    })
    it("part 1: ()) -> -1", () => {
        assert.equal(walk("())").floor, -1)
    })
    it("part 1: ))( -> -1", () => {
        assert.equal(walk("))(").floor, -1)
    })
    it("part 1: ))) -> -3", () => {
        assert.equal(walk(")))").floor, -3)
    })
    it("part 1: )())()) -> -3", () => {
        assert.equal(walk(")())())").floor, -3)
    })

    it("part 2: ) -> 1", () => {
        assert.equal(solve(")")[1], 1)
    })
    it("part 2: ()()) -> 5", () => {
        assert.equal(solve("()())")[1], 5)
    })
})

fullInputTests(2015, 1, solve)
