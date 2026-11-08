import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readInput} from "../../input.ts"
import {part1, part2, run} from "./day23.ts"

describe("2015 day 23: examples", () => {
    it(
        "part 1: the example program leaves 2 in register a",
        pending(() => {
            assert.equal(run(["inc a", "jio a, +2", "tpl a", "inc a"].join("\n")).a, 2)
        }),
    )

    // Part 2 examples only appear on the puzzle page once part 1 is solved. Add them here.
})

// Fill these in once you've solved it, so the full input stays a regression test.
const expected: {part1?: number; part2?: number} = {}

const input = readInput(2015, 23)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 23)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 23: full input", () => {
    it(
        "part 1",
        {skip: skip(expected.part1)},
        pending(() => {
            assert.equal(part1(input!), expected.part1)
        }),
    )
    it(
        "part 2",
        {skip: skip(expected.part2)},
        pending(() => {
            assert.equal(part2(input!), expected.part2)
        }),
    )
})
