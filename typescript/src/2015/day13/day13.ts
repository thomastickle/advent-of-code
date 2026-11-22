/*
 * 2015 day 13: Knights of the Dinner Table. https://adventofcode.com/2015/day/13
 */

import {printAnswers, unsolved, type Answers} from "../../answers.ts"

/**
 * Solves both parts. Return {@link unsolved} for a part that isn't done yet.
 *
 * @param input One happiness rule per line, e.g. "Alice would gain 54 happiness units by sitting next to Bob."
 * @returns [part 1 answer, part 2 answer].
 */
export function solve(input: string): Answers<number> {
    return [unsolved, unsolved]
}

if (import.meta.main) {
    printAnswers(2015, 13, solve)
}
