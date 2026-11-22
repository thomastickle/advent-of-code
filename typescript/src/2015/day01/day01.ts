import {printAnswers, type Answers} from "../../answers.ts"

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
 * Follows every instruction once, noting both the final floor and the first step into the basement.
 * @param input The instructions, a string of "(" and ")" characters, e.g. "()())"
 * @returns The final floor (0 is the ground floor, negative floors are below it), and the 1-based position of the
 * instruction that first reaches floor -1, or undefined if Santa never gets there
 */
export function walk(input: string): {floor: number, basementAt: number | undefined} {
    let floor = 0
    let basementAt: number | undefined
    for (let index = 0; index < input.length; index++) {
        floor += floorChange(input[index]!)
        if (floor === -1 && basementAt === undefined) {
            basementAt = index + 1
        }
    }
    return {floor, basementAt}
}

/**
 * Solves both parts from a single walk through the instructions.
 * @param input The instructions, a string of "(" and ")" characters, e.g. "(()(()(".
 * @returns [final floor, 1-based position of the first instruction that reaches the basement].
 * @throws Error if Santa never enters the basement
 */
export function solve(input: string): Answers<number> {
    const {floor, basementAt} = walk(input)
    if (basementAt === undefined) {
        throw new Error("Santa never enters the basement")
    }
    return [floor, basementAt]
}

if (import.meta.main) {
    printAnswers(2015, 1, solve)
}
