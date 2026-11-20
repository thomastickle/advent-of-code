import {describe} from "node:test"
import {parseInput} from "./parse.ts"
import assert from "node:assert/strict"

describe("Day 09 Parse Input", () => {
    const input = [
        "London to Dublin = 464",
        "London to Belfast = 518",
        "Dublin to Belfast = 141",
    ].join("\n")

    const parsedInput = parseInput(input)
    assert.equal(parsedInput.get("London")?.filter(route => route.to === "Dublin")[0]?.distance, 464)


    //     assert.equal(parsedInput.get("Dublin")?.get("London")?.distance, 464)
    // assert.equal(parsedInput.get("London")?.get("Belfast")?.distance, 518)
    // assert.equal(parsedInput.get("Belfast")?.get("London")?.distance, 518)
    // assert.equal(parsedInput.get("Dublin")?.get("Belfast")?.distance, 141)
    // assert.equal(parsedInput.get("Belfast")?.get("Dublin")?.distance, 141)
})
