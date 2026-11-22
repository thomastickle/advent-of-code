/*
 * 2015 day 20: Infinite Elves and Infinite Houses. https://adventofcode.com/2015/day/20
 */

import {printAnswers, unsolved, type Answers} from "../../answers.ts"

/**
 * Solves both parts. Return {@link unsolved} for a part that isn't done yet.
 *
 * @param input The target number of presents, e.g. "150".
 * @returns [part 1 answer, part 2 answer].
 */
export function solve(input: string): Answers<number> {
    return [unsolved, unsolved]
}

if (import.meta.main) {
    printAnswers(2015, 20, solve)
}
