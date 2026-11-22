import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {fullInputTests, pending} from "../../testing.ts"
import {codeAt, sequenceNumber, solve} from "./day25.ts"

describe("2015 day 25: examples", () => {
    it("part 1: row 1, column 1 is code number 1", pending(() => {
        assert.equal(sequenceNumber(1, 1), 1)
    }))
    it("part 1: row 2, column 1 is code number 2", pending(() => {
        assert.equal(sequenceNumber(2, 1), 2)
    }))
    it("part 1: row 4, column 2 is code number 12", pending(() => {
        assert.equal(sequenceNumber(4, 2), 12)
    }))
    it("part 1: row 1, column 5 is code number 15", pending(() => {
        assert.equal(sequenceNumber(1, 5), 15)
    }))

    it("part 1: the code at row 1, column 1 is 20151125", pending(() => {
        assert.equal(codeAt(1, 1), 20151125)
    }))
    it("part 1: the code at row 2, column 1 is 31916031", pending(() => {
        assert.equal(codeAt(2, 1), 31916031)
    }))
})

fullInputTests(2015, 25, solve)
