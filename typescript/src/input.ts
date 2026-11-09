import {existsSync, readFileSync} from "node:fs"
import {join, resolve} from "node:path"

/** Where puzzle inputs live: `<repo>/inputs`, or `AOC_INPUTS_DIR` if set. Never committed. */
const inputsDir = process.env["AOC_INPUTS_DIR"] ?? resolve(import.meta.dirname, "../../inputs")

/** Path of the input file for a given day, e.g. inputs/2015/day01.txt. */
export function inputPath(year: number, day: number): string {
    return join(inputsDir, String(year), `day${String(day).padStart(2, "0")}.txt`)
}

/** Reads a day's puzzle input, or returns undefined if it hasn't been saved. */
export function readInput(year: number, day: number): string | undefined {
    const path = inputPath(year, day)
    return existsSync(path) ? readFileSync(path, "utf8").trimEnd() : undefined
}

/** Path of the recorded answers for a day, e.g. inputs/2015/day01.expected.json. */
export function expectedPath(year: number, day: number): string {
    return inputPath(year, day).replace(/\.txt$/, ".expected.json")
}

/**
 * Reads the answers you recorded for a day, e.g. `{"part1": 232, "part2": 1783}`, or `{}` if there are none.
 * They live beside the inputs (never committed) because answers are specific to your puzzle input.
 */
export function readExpected<T extends object>(year: number, day: number): T {
    const path = expectedPath(year, day)
    return (existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : {}) as T
}
