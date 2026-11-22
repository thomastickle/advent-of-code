import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {fullInputTests} from "../../testing.ts"
import {solve} from "./day12.ts"

describe("2015 day 12: examples", () => {
    it("part 1: \"[1,2,3]\" -> 6", () => {
        assert.equal(solve("[1,2,3]")[0], 6)
    })
    it("part 1: \"{\\\"a\\\":2,\\\"b\\\":4}\" -> 6", () => {
        assert.equal(solve("{\"a\":2,\"b\":4}")[0], 6)
    })
    it("part 1: \"[[[3]]]\" -> 3", () => {
        assert.equal(solve("[[[3]]]")[0], 3)
    })
    it("part 1: \"{\\\"a\\\":{\\\"b\\\":4},\\\"c\\\":-1}\" -> 3", () => {
        assert.equal(solve("{\"a\":{\"b\":4},\"c\":-1}")[0], 3)
    })
    it("part 1: \"{\\\"a\\\":[-1,1]}\" -> 0", () => {
        assert.equal(solve("{\"a\":[-1,1]}")[0], 0)
    })
    it("part 1: \"[-1,{\\\"a\\\":1}]\" -> 0", () => {
        assert.equal(solve("[-1,{\"a\":1}]")[0], 0)
    })
    it("part 1: \"[]\" -> 0", () => {
        assert.equal(solve("[]")[0], 0)
    })
    it("part 1: \"{}\" -> 0", () => {
        assert.equal(solve("{}")[0], 0)
    })

    it("part 2: \"[1,2,3]\" -> 6", () => {
        assert.equal(solve("[1,2,3]")[1], 6)
    })
    it("part 2: \"[1,{\\\"c\\\":\\\"red\\\",\\\"b\\\":2},3]\" -> 4", () => {
        assert.equal(solve("[1,{\"c\":\"red\",\"b\":2},3]")[1], 4)
    })
    it("part 2: \"{\\\"d\\\":\\\"red\\\",\\\"e\\\":[1,2,3,4],\\\"f\\\":5}\" -> 0", () => {
        assert.equal(solve("{\"d\":\"red\",\"e\":[1,2,3,4],\"f\":5}")[1], 0)
    })
    it("part 2: \"[1,\\\"red\\\",5]\" -> 6", () => {
        assert.equal(solve("[1,\"red\",5]")[1], 6)
    })
})

describe("2015 day 12: edge cases", () => {
    it("counts a document that is just a number", () => {
        assert.deepEqual(solve("5"), [5, 5])
    })
    it("only ignores \"red\" as a value, not as a property name", () => {
        assert.deepEqual(solve("{\"red\":1}"), [1, 1])
    })
    it("still counts a red object's numbers in part 1", () => {
        assert.deepEqual(solve("[1,{\"c\":\"red\",\"b\":2},3]"), [6, 4])
    })
    it("throws on input that is not JSON", () => {
        assert.throws(() => solve("[1,2"), SyntaxError)
    })
})

fullInputTests(2015, 12, solve)
