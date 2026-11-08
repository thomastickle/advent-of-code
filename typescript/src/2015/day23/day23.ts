import {inputPath, readInput} from "../../input.ts"

/** 2015 day 23: Opening the Turing Lock. https://adventofcode.com/2015/day/23 */

export interface Registers {
    a: number
    b: number
}

/** Runs the program with both registers starting at 0 and returns them when it finishes. */
export function run(input: string): Registers {
    throw new Error("not implemented")
}

export function part1(input: string): number {
    throw new Error("not implemented")
}

export function part2(input: string): number {
    throw new Error("not implemented")
}

if (import.meta.main) {
    const input = readInput(2015, 23)
    if (input === undefined) {
        console.error(`No input found at ${inputPath(2015, 23)}`)
        process.exit(1)
    }
    console.log("part 1:", part1(input))
    console.log("part 2:", part2(input))
}
