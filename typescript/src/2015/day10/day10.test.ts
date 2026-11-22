import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {fullInputTests} from "../../testing.ts"
import {lookAndSayLengths, solve} from "./day10.ts"

describe("2015 day 10: lookAndSayLengths examples", () => {
    // Lengths of 11, 21, 1211, 111221, 312211: the first five steps shown on the page.
    it("\"1\" (rounds 0) -> 1", () => {
        assert.deepEqual(lookAndSayLengths("1", [0]), [1])
    })
    it("\"1\" (rounds 1) -> 2", () => {
        assert.deepEqual(lookAndSayLengths("1", [1]), [2])
    })
    it("\"1\" (rounds 2) -> 2", () => {
        assert.deepEqual(lookAndSayLengths("1", [2]), [2])
    })
    it("\"1\" (rounds 3) -> 4", () => {
        assert.deepEqual(lookAndSayLengths("1", [3]), [4])
    })
    it("\"1\" (rounds 4) -> 6", () => {
        assert.deepEqual(lookAndSayLengths("1", [4]), [6])
    })
    it("\"1\" (rounds 5) -> 6", () => {
        assert.deepEqual(lookAndSayLengths("1", [5]), [6])
    })

    // Other starting strings: "211" says "1221" and "111221" says "312211".
    it("\"211\" (rounds 1) -> 4", () => {
        assert.deepEqual(lookAndSayLengths("211", [1]), [4])
    })
    it("\"111221\" (rounds 1) -> 6", () => {
        assert.deepEqual(lookAndSayLengths("111221", [1]), [6])
    })

    // Part 1 and part 2 are the same walk run for 40 and 50 rounds, so check the lengths it reaches there.
    it("\"1\" (rounds 40) -> 82350", () => {
        assert.deepEqual(lookAndSayLengths("1", [40]), [82350])
    })
    it("\"1\" (rounds 50) -> 1166642", () => {
        assert.deepEqual(lookAndSayLengths("1", [50]), [1166642])
    })
})

describe("2015 day 10: lookAndSayLengths checkpoints", () => {
    // Derived from the page's first five steps from "1": lengths 1, 2, 2, 4, 6, 6 after rounds 0-5.
    it("measures \"1\" at several checkpoints in one run", () => {
        assert.deepEqual(lookAndSayLengths("1", [0, 3, 5]), [1, 4, 6])
    })
    it("returns the checkpoints in the order asked, not sorted", () => {
        assert.deepEqual(lookAndSayLengths("1", [5, 3]), [6, 4])
    })
    it("rejects a negative number of rounds", () => {
        assert.throws(() => lookAndSayLengths("1", [-1]), /Invalid number of rounds: -1/)
    })
    it("rejects a fractional number of rounds", () => {
        assert.throws(() => lookAndSayLengths("1", [1.5]), /Invalid number of rounds: 1.5/)
    })
})

describe("2015 day 10: part examples", () => {
    it("part 1 runs 40 rounds: \"1113222113\" -> 252594", () => {
        assert.equal(solve("1113222113")[0], 252594)
    })
    it("part 2 runs 50 rounds: \"1113222113\" -> 3579328", () => {
        assert.equal(solve("1113222113")[1], 3579328)
    })
})

fullInputTests(2015, 10, solve)
