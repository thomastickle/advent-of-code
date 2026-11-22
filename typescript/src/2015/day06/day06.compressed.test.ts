import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {fullInputTests} from "../../testing.ts"
import {solve} from "./day06.compressed.ts"
import {solve as gridSolve} from "./day06.ts"

describe("2015 day 06 (compressed): examples", () => {
    // The page gives no numeric results for part 1. These counts are derived from its descriptions.
    it("part 1: turning on every light", () => {
        assert.equal(solve("turn on 0,0 through 999,999")[0], 1000000)
    })
    it("part 1: toggling the first row of 1000 lights", () => {
        assert.equal(solve("toggle 0,0 through 999,0")[0], 1000)
    })
    it("part 1: turning off the middle four lights on an off grid", () => {
        assert.equal(solve("turn off 499,499 through 500,500")[0], 0)
    })
    it("part 1: turning on everything then turning off the middle four", () => {
        assert.equal(solve("turn on 0,0 through 999,999\nturn off 499,499 through 500,500")[0], 999996)
    })
    it("part 2: turning on one light raises the brightness by 1", () => {
        assert.equal(solve("turn on 0,0 through 0,0")[1], 1)
    })
    it("part 2: toggling every light raises the brightness by 2000000", () => {
        assert.equal(solve("toggle 0,0 through 999,999")[1], 2000000)
    })
})

/** A small seeded random generator (mulberry32), so a failure can be reproduced. */
function seededRandom(seed: number): () => number {
    let state = seed
    return () => {
        state = (state + 0x6d2b79f5) | 0
        let t = Math.imul(state ^ (state >>> 15), 1 | state)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

/**
 * Make a random puzzle input
 * @param random A random generator returning numbers from 0 up to (not including) 1
 * @param span The largest rectangle side to use; small values force lots of overlap
 * @returns Between 1 and 60 instructions, one per line
 */
function randomInput(random: () => number, span: number): string {
    const actions = ["turn on", "turn off", "toggle"]
    const below = (limit: number) => Math.floor(random() * limit)
    const lines = Array.from({length: 1 + below(60)}, () => {
        const x1 = below(span)
        const y1 = below(span)
        const x2 = x1 + below(Math.min(span, 1000 - x1))
        const y2 = y1 + below(Math.min(span, 1000 - y1))
        return `${actions[below(3)]} ${x1},${y1} through ${x2},${y2}`
    })
    return lines.join("\n")
}

describe("2015 day 06 (compressed): agrees with the grid version", () => {
    // A full-grid turn on followed by one toggle in the far corner.
    const cornerToggle = "turn on 0,0 through 999,999\ntoggle 999,999 through 999,999"
    it("part 1 matches on a full-grid turn on followed by one toggle in the far corner", () => {
        assert.equal(solve(cornerToggle)[0], gridSolve(cornerToggle)[0])
    })
    it("part 2 matches on a full-grid turn on followed by one toggle in the far corner", () => {
        assert.equal(solve(cornerToggle)[1], gridSolve(cornerToggle)[1])
    })
    it("matches on 300 random inputs, including heavily overlapping ones", () => {
        const random = seededRandom(2015)
        for (const span of [1000, 10, 3]) {
            for (let round = 0; round < 100; round++) {
                const input = randomInput(random, span)
                assert.deepEqual(solve(input), gridSolve(input), `span ${span}:\n${input}`)
            }
        }
    })
})

fullInputTests(2015, 6, solve, "compressed")
