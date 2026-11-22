/*
 * 2015 day 12: JSAbacusFramework.io. https://adventofcode.com/2015/day/12
 */

import {type Answers, printAnswers} from "../../answers.ts"

/** An object as JSON.parse returns it: string keys, any JSON value. */
type JsonObject = {[key: string]: unknown}

/** Totals of the numbers in a JSON value, counted both ways at once. */
interface Sums {
    all: number
    withoutRed: number
}

const NO_NUMBERS: Sums = {all: 0, withoutRed: 0}

/**
 * Tells whether a parsed JSON value is an object, as opposed to an array, string, number, boolean or null.
 * @param value Any value JSON.parse returned, e.g. {"a": 1}.
 * @returns True for an object.
 */
function isJsonObject(value: unknown): value is JsonObject {
    return typeof value === "object" && value !== null && !Array.isArray(value)
}

/**
 * Tells whether any of an object's properties holds the string "red", which makes part 2 ignore the whole object.
 * @param object A parsed JSON object, e.g. {"c": "red", "b": 2}.
 * @returns True if some property's value is exactly "red".
 */
function hasRedValue(object: JsonObject): boolean {
    return Object.values(object).includes("red")
}

/**
 * Adds up a list of totals.
 * @param sums Totals of several JSON values, e.g. [{all: 1, withoutRed: 1}, {all: 2, withoutRed: 0}].
 * @returns Their combined totals, e.g. {all: 3, withoutRed: 1}.
 */
function addSums(sums: Sums[]): Sums {
    return sums.reduce((total, sum) => ({
        all: total.all + sum.all,
        withoutRed: total.withoutRed + sum.withoutRed,
    }), NO_NUMBERS)
}

/**
 * Totals every number in a parsed JSON value, walking it once for both parts.
 * @param value Any value JSON.parse returned, e.g. [1, {"c": "red", "b": 2}, 3].
 * @returns The sum of all numbers, and the sum without objects that have a "red" property, e.g. {all: 6,
 * withoutRed: 4}. A red object's numbers still count toward `all`.
 */
function sumNumbers(value: unknown): Sums {
    if (typeof value === "number") {
        return {all: value, withoutRed: value}
    }
    if (Array.isArray(value)) {
        return addSums(value.map(sumNumbers))
    }
    if (isJsonObject(value)) {
        const inside = addSums(Object.values(value).map(sumNumbers))
        return hasRedValue(value) ? {all: inside.all, withoutRed: 0} : inside
    }
    return NO_NUMBERS
}

/**
 * Solves both parts from one walk over the document.
 *
 * @param input A JSON document, e.g. "[1,{\"c\":\"red\",\"b\":2},3]".
 * @returns [sum of every number, sum ignoring objects with a "red" property].
 * @throws {SyntaxError} If the input is not valid JSON.
 */
export function solve(input: string): Answers<number> {
    const {all, withoutRed} = sumNumbers(JSON.parse(input))
    return [all, withoutRed]
}

if (import.meta.main) {
    printAnswers(2015, 12, solve)
}
