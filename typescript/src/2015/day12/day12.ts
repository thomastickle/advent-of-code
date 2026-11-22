/*
 * 2015 day 12: JSAbacusFramework.io. https://adventofcode.com/2015/day/12
 */

import {printAnswers, unsolved, type Answers} from "../../answers.ts"

/**
 * Solves both parts. Return {@link unsolved} for a part that isn't done yet.
 *
 * @param input A JSON document, e.g. "[1,2,3]".
 * @returns [part 1 answer, part 2 answer].
 */
export function solve(input: string): Answers<number> {
    return [unsolved, unsolved]
}

if (import.meta.main) {
    printAnswers(2015, 12, solve)
}
