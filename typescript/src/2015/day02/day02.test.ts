import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {fullInputTests} from "../../testing.ts"
import {part1, part2, solve} from "./day02.ts"

describe("2015 day 02: examples", () => {
    // Square feet of wrapping paper: surface area plus the area of the smallest side.
    it("part 1: \"2x3x4\" -> 58", () => {
        assert.equal(part1("2x3x4"), 58)
    })
    it("part 1: \"1x1x10\" -> 43", () => {
        assert.equal(part1("1x1x10"), 43)
    })
    it("part 1: the example (2 lines) -> 101", () => {
        const input = [
            "2x3x4",
            "1x1x10",
        ].join("\n")
        assert.equal(part1(input), 101)
    })

    // Feet of ribbon: the shortest perimeter around one face plus the volume for the bow.
    it("part 2: \"2x3x4\" -> 34", () => {
        assert.equal(part2("2x3x4"), 34)
    })
    it("part 2: \"1x1x10\" -> 14", () => {
        assert.equal(part2("1x1x10"), 14)
    })
    it("part 2: the example (2 lines) -> 48", () => {
        const input = [
            "2x3x4",
            "1x1x10",
        ].join("\n")
        assert.equal(part2(input), 48)
    })
})

fullInputTests(2015, 2, solve)
