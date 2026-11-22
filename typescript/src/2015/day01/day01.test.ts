import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {fullInputTests} from "../../testing.ts"
import {part1, part2, solve} from "./day01.ts"

describe("2015 day 01: examples", () => {
    it("part 1: (()) -> 0", () => {
        assert.equal(part1("(())"), 0)
    })
    it("part 1: ()() -> 0", () => {
        assert.equal(part1("()()"), 0)
    })
    it("part 1: ((( -> 3", () => {
        assert.equal(part1("((("), 3)
    })
    it("part 1: (()(()( -> 3", () => {
        assert.equal(part1("(()(()("), 3)
    })
    it("part 1: ))((((( -> 3", () => {
        assert.equal(part1("))((((("), 3)
    })
    it("part 1: ()) -> -1", () => {
        assert.equal(part1("())"), -1)
    })
    it("part 1: ))( -> -1", () => {
        assert.equal(part1("))("), -1)
    })
    it("part 1: ))) -> -3", () => {
        assert.equal(part1(")))"), -3)
    })
    it("part 1: )())()) -> -3", () => {
        assert.equal(part1(")())())"), -3)
    })

    it("part 2: ) -> 1", () => {
        assert.equal(part2(")"), 1)
    })
    it("part 2: ()()) -> 5", () => {
        assert.equal(part2("()())"), 5)
    })
})

fullInputTests(2015, 1, solve)
