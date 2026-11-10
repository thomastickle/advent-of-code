import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readExpected, readInput} from "../../input.ts"
import {part1, part2} from "./day01.ts"

describe("2015 day 01: examples", () => {
    it("part 1: (()) -> 0", pending(() => {
        assert.equal(part1("(())"), 0)
    }))
    it("part 1: ()() -> 0", pending(() => {
        assert.equal(part1("()()"), 0)
    }))
    it("part 1: ((( -> 3", pending(() => {
        assert.equal(part1("((("), 3)
    }))
    it("part 1: (()(()( -> 3", pending(() => {
        assert.equal(part1("(()(()("), 3)
    }))
    it("part 1: ))((((( -> 3", pending(() => {
        assert.equal(part1("))((((("), 3)
    }))
    it("part 1: ()) -> -1", pending(() => {
        assert.equal(part1("())"), -1)
    }))
    it("part 1: ))( -> -1", pending(() => {
        assert.equal(part1("))("), -1)
    }))
    it("part 1: ))) -> -3", pending(() => {
        assert.equal(part1(")))"), -3)
    }))
    it("part 1: )())()) -> -3", pending(() => {
        assert.equal(part1(")())())"), -3)
    }))

    it("part 2: ) -> 1", pending(() => {
        assert.equal(part2(")"), 1)
    }))
    it("part 2: ()()) -> 5", pending(() => {
        assert.equal(part2("()())"), 5)
    }))
})

// Your answers live in inputs/<year>/dayNN.expected.json (git-ignored), e.g. {"part1": 1, "part2": 2}.
const expected: {part1?: number; part2?: number} = readExpected(2015, 1)

const input = readInput(2015, 1)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 1)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 01: full input", () => {
    it("part 1", {skip: skip(expected.part1)}, pending(() => {
        assert.equal(part1(input!), expected.part1)
    }))
    it("part 2", {skip: skip(expected.part2)}, pending(() => {
        assert.equal(part2(input!), expected.part2)
    }))
})
