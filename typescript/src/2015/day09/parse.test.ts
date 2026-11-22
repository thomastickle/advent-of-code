import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {parseInput} from "./parse.ts"

describe("Day 09 Parse Input", () => {
    const input = [
        "London to Dublin = 464",
        "London to Belfast = 518",
        "Dublin to Belfast = 141",
    ].join("\n")
    const expected = new Map([
        ["London", [
            {from: "London", to: "Dublin", distance: 464},
            {from: "London", to: "Belfast", distance: 518},
        ]],
        ["Dublin", [
            {from: "Dublin", to: "London", distance: 464},
            {from: "Dublin", to: "Belfast", distance: 141},
        ]],
        ["Belfast", [
            {from: "Belfast", to: "London", distance: 518},
            {from: "Belfast", to: "Dublin", distance: 141},
        ]],
    ])

    it("parses every route in both directions", () => {
        assert.deepEqual(parseInput(input), expected)
    })

    it("trims leading and trailing whitespace", () => {
        assert.deepEqual(parseInput(`\n  ${input}  \n`), expected)
    })

    it("accepts CRLF line separators", () => {
        assert.deepEqual(parseInput(input.replaceAll("\n", "\r\n")), expected)
    })

    it("throws for malformed route lines", () => {
        assert.throws(() => parseInput(`${input}\nnot a route`), /Error parsing line: not a route/)
    })

    it("throws for empty input", () => {
        assert.throws(() => parseInput(""), /Error parsing line: /)
    })

    it("throws when a pair of cities has no distance between them", () => {
        const missingLondonBelfast = "London to Dublin = 464\nDublin to Belfast = 141"
        assert.throws(() => parseInput(missingLondonBelfast), /Missing distance between London and Belfast/)
    })

    it("throws for blank lines within the input", () => {
        assert.throws(() => parseInput("London to Dublin = 464\n\nDublin to Belfast = 141"), /Error parsing line: /)
    })
})
