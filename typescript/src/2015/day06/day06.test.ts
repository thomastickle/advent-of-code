import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {pending} from "../../testing.ts"
import {inputPath, readExpected, readInput} from "../../input.ts"
import {parseCommand, part1, part2} from "./day06.ts"

describe("2015 day 06: examples", () => {
    // The page gives no numeric results. These counts are derived from its descriptions (the grid starts all off).
    it("part 1: turning on every light", pending(() => {
        assert.equal(part1("turn on 0,0 through 999,999"), 1000000)
    }))
    it("part 1: toggling the first row of 1000 lights", pending(() => {
        assert.equal(part1("toggle 0,0 through 999,0"), 1000)
    }))
    it("part 1: turning off the middle four lights on an off grid", pending(() => {
        assert.equal(part1("turn off 499,499 through 500,500"), 0)
    }))
    it("part 1: turning on everything then turning off the middle four", pending(() => {
        assert.equal(part1("turn on 0,0 through 999,999\nturn off 499,499 through 500,500"), 999996)
    }))

    // Part 2 reinterprets the commands as brightness: turn on +1, turn off -1 (minimum 0), toggle +2.
    it("part 2: turning on one light raises the brightness by 1", pending(() => {
        assert.equal(part2("turn on 0,0 through 0,0"), 1)
    }))
    it("part 2: toggling every light raises the brightness by 2000000", pending(() => {
        assert.equal(part2("toggle 0,0 through 999,999"), 2000000)
    }))
})

describe("2015 day 06: parser", () => {
    it("parses turn on", () => {
        assert.deepEqual(parseCommand("turn on 0,0 through 999,999"), {
            action: "turn on",
            xRange: {start: 0, end: 999},
            yRange: {start: 0, end: 999},
        })
    })
    it("parses turn off", () => {
        assert.deepEqual(parseCommand("turn off 499,499 through 500,500"), {
            action: "turn off",
            xRange: {start: 499, end: 500},
            yRange: {start: 499, end: 500},
        })
    })
    it("parses toggle", () => {
        assert.deepEqual(parseCommand("toggle 0,0 through 999,0"), {
            action: "toggle",
            xRange: {start: 0, end: 999},
            yRange: {start: 0, end: 0},
        })
    })
    // Corners are written as x,y through x,y, so the two x values are the first number of each corner.
    it("reads x from the first number of each corner and y from the second", () => {
        assert.deepEqual(parseCommand("turn off 660,55 through 986,197"), {
            action: "turn off",
            xRange: {start: 660, end: 986},
            yRange: {start: 55, end: 197},
        })
    })

    it("rejects an empty line", () => {
        assert.throws(() => parseCommand(""), /Invalid line/)
    })
    it("rejects an unknown action", () => {
        assert.throws(() => parseCommand("turn sideways 0,0 through 1,1"), /Invalid line/)
    })
    it("rejects a corner with a missing coordinate", () => {
        assert.throws(() => parseCommand("toggle 0,0 through 999"), /Invalid line/)
    })
    it("rejects trailing text", () => {
        assert.throws(() => parseCommand("toggle 0,0 through 999,999 and more"), /Invalid line/)
    })
    it("rejects a stray space inside a corner", () => {
        assert.throws(() => parseCommand("toggle 0 ,0 through 1,1"), /Invalid line/)
    })
    it("rejects the wrong case", () => {
        assert.throws(() => parseCommand("TURN ON 0,0 through 1,1"), /Invalid line/)
    })
    it("rejects a range that runs backwards", () => {
        assert.throws(() => parseCommand("toggle 5,0 through 4,9"), /Invalid line/)
        assert.throws(() => parseCommand("toggle 0,9 through 9,5"), /Invalid line/)
    })
    it("rejects coordinates outside the 1000-wide grid", () => {
        assert.throws(() => parseCommand("toggle 0,0 through 1000,1000"), /Invalid line/)
    })
})

// Your answers live in inputs/<year>/dayNN.expected.json (git-ignored), e.g. {"part1": 1, "part2": 2}.
const expected: {part1?: number; part2?: number} = readExpected(2015, 6)

const input = readInput(2015, 6)
const skip = (answer: number | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 6)}`
        : answer === undefined
          ? "expected answer not recorded yet"
          : false

describe("2015 day 06: full input", () => {
    it("part 1", {skip: skip(expected.part1)}, pending(() => {
        assert.equal(part1(input!), expected.part1)
    }))
    it("part 2", {skip: skip(expected.part2)}, pending(() => {
        assert.equal(part2(input!), expected.part2)
    }))
})
