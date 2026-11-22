import {printAnswers, unsolved, type Answers} from "../../answers.ts"

/** 2015 day 23: Opening the Turing Lock. https://adventofcode.com/2015/day/23 */

export interface Registers {
    a: number
    b: number
}

/** Runs the program with both registers starting at 0 and returns them when it finishes. */
export function run(input: string): Registers {
    throw new Error("not implemented")
}

/**
 * Solves both parts. Return {@link unsolved} for a part that isn't done yet.
 *
 * @param input The program, one instruction per line, e.g. "jio a, +2".
 * @returns [part 1 answer, part 2 answer].
 */
export function solve(input: string): Answers<number> {
    return [unsolved, unsolved]
}

if (import.meta.main) {
    printAnswers(2015, 23, solve)
}
