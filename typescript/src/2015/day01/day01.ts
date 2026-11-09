import {inputPath, readInput} from "../../input.ts"

/**
 * How a single instruction character moves Santa
 * @param instruction One character of the input: "(" goes up a floor, ")" goes down a floor
 * @returns 1 for "(", -1 for ")", and 0 for anything else (such as a trailing newline)
 */
function floorChange(instruction: string): number {
    if (instruction === "(") {
        return 1
    }
    return instruction === ")" ? -1 : 0
}

/**
 * Part 1: the floor Santa ends up on
 * @param input The instructions, a string of "(" and ")" characters, e.g. "(()(()("
 * @returns The final floor, where 0 is the ground floor and negative floors are below it
 */
export function part1(input: string): number {
    let floor = 0
    for (const instruction of input) {
        floor += floorChange(instruction)
    }
    return floor
}

/**
 * Part 2: the first instruction that takes Santa into the basement
 * @param input The instructions, a string of "(" and ")" characters, e.g. "()())"
 * @returns The 1-based position of the instruction that first reaches floor -1
 * @throws Error if Santa never enters the basement
 */
export function part2(input: string): number {
    let floor = 0
    for (let index = 0; index < input.length; index++) {
        floor += floorChange(input[index]!)
        if (floor === -1) {
            return index + 1
        }
    }
    throw new Error("Santa never enters the basement")
}

if (import.meta.main) {
    const input = readInput(2015, 1)
    if (input === undefined) {
        console.error(`No input found at ${inputPath(2015, 1)}`)
        process.exit(1)
    }
    console.log("part 1:", part1(input))
    console.log("part 2:", part2(input))
}
