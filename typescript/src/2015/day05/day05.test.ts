import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {fullInputTests} from "../../testing.ts"
import {solve} from "./day05.ts"

describe("2015 day 05: examples", () => {
    // Each example is one string; the last case runs all five as separate lines.
    it("part 1: \"ugknbfddgicrmopn\" -> 1", () => {
        assert.equal(solve("ugknbfddgicrmopn")[0], 1)
    })
    it("part 1: \"aaa\" -> 1", () => {
        assert.equal(solve("aaa")[0], 1)
    })
    it("part 1: \"jchzalrnumimnmhp\" -> 0", () => {
        assert.equal(solve("jchzalrnumimnmhp")[0], 0)
    })
    it("part 1: \"haegwjzuvuyypxyu\" -> 0", () => {
        assert.equal(solve("haegwjzuvuyypxyu")[0], 0)
    })
    it("part 1: \"dvszwmarrgswjxmb\" -> 0", () => {
        assert.equal(solve("dvszwmarrgswjxmb")[0], 0)
    })
    it("part 1: the example (5 lines) -> 2", () => {
        const input = [
            "ugknbfddgicrmopn",
            "aaa",
            "jchzalrnumimnmhp",
            "haegwjzuvuyypxyu",
            "dvszwmarrgswjxmb",
        ].join("\n")
        assert.equal(solve(input)[0], 2)
    })

    // Each example is one string; the last case (derived, not on the page) runs all four as separate lines.
    it("part 2: \"qjhvhtzxzqqjkmpb\" -> 1", () => {
        assert.equal(solve("qjhvhtzxzqqjkmpb")[1], 1)
    })
    it("part 2: \"xxyxx\" -> 1", () => {
        assert.equal(solve("xxyxx")[1], 1)
    })
    it("part 2: \"uurcxstgmygtbstg\" -> 0", () => {
        assert.equal(solve("uurcxstgmygtbstg")[1], 0)
    })
    it("part 2: \"ieodomkazucvgmuy\" -> 0", () => {
        assert.equal(solve("ieodomkazucvgmuy")[1], 0)
    })
    it("part 2: the example (4 lines) -> 2", () => {
        const input = [
            "qjhvhtzxzqqjkmpb",
            "xxyxx",
            "uurcxstgmygtbstg",
            "ieodomkazucvgmuy",
        ].join("\n")
        assert.equal(solve(input)[1], 2)
    })
})

fullInputTests(2015, 5, solve)
