import {inputPath, readInput} from "../../input.ts"

/** 2015 day 25: Let It Snow. https://adventofcode.com/2015/day/25 */

/** Which code in the sequence (1-based) lands at this row and column? Codes fill the grid along diagonals. */
export function sequenceNumber(row: number, column: number): number {
    throw new Error("not implemented")
}

/** The code at this row and column: start at 20151125, then multiply by 252533 and take the remainder mod 33554393. */
export function codeAt(row: number, column: number): number {
    throw new Error("not implemented")
}

export function part1(input: string): number {
    throw new Error("not implemented")
}

if (import.meta.main) {
    const input = readInput(2015, 25)
    if (input === undefined) {
        console.error(`No input found at ${inputPath(2015, 25)}`)
        process.exit(1)
    }
    console.log("part 1:", part1(input))
}
