/*
 * 2015 day 17: No Such Thing as Too Much. https://adventofcode.com/2015/day/17
 */

import {printAnswers, unsolved, type Answers} from "../../answers.ts"

/**
 * Solves both parts. Return {@link unsolved} for a part that isn't done yet.
 *
 * @param input One container size in liters per line, e.g. "20".
 * @param liters Eggnog to store in liters, e.g. 150 (the example stores 25).
 * @returns [part 1 answer, part 2 answer].
 */
export function solve(input: string, liters = 150): Answers<number> {
    return [unsolved, unsolved]
}

if (import.meta.main) {
    printAnswers(2015, 17, solve)
}
