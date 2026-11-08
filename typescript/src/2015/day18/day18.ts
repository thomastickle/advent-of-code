import {inputPath, readInput} from "../../input.ts"

/** 2015 day 18: Like a GIF For Your Yard. https://adventofcode.com/2015/day/18 */

export function part1(input: string, steps = 100): number {
    throw new Error("not implemented")
}

export function part2(input: string): number {
    throw new Error("not implemented")
}

if (import.meta.main) {
    const input = readInput(2015, 18)
    if (input === undefined) {
        console.error(`No input found at ${inputPath(2015, 18)}`)
        process.exit(1)
    }
    console.log("part 1:", part1(input))
    console.log("part 2:", part2(input))
}
