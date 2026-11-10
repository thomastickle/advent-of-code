import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readExpected, readInput} from "../../input.ts"
import {part1, codeAt, sequenceNumber} from "./day25.ts"

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

// Your answers live in inputs/<year>/dayNN.expected.json (git-ignored), e.g. {"part1": 1, "part2": 2}.
const expected: {part1?: number} = readExpected(2015, 25)

const input = readInput(2015, 25)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 25)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 25: full input", () => {
    it("part 1", {skip: skip(expected.part1)}, pending(() => {
        assert.equal(part1(input!), expected.part1)
    }))
})
