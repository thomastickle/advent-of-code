import {inputPath, readInput} from "../../input.ts"

/** 2015 day 24: It Hangs in the Balance. https://adventofcode.com/2015/day/24 */

export function part1(input: string): number {
    throw new Error("not implemented")
}

export function part2(input: string): number {
    throw new Error("not implemented")
}

if (import.meta.main) {
    const input = readInput(2015, 24)
    if (input === undefined) {
        console.error(`No input found at ${inputPath(2015, 24)}`)
        process.exit(1)
    }
    console.log("part 1:", part1(input))
    console.log("part 2:", part2(input))
}
