import {printAnswers, unsolved, type Answers} from "../../answers.ts"

/** 2015 day 24: It Hangs in the Balance. https://adventofcode.com/2015/day/24 */

/**
 * Solves both parts. Return {@link unsolved} for a part that isn't done yet.
 *
 * @param input One package weight per line, e.g. "11".
 * @returns [part 1 answer, part 2 answer].
 */
export function solve(input: string): Answers<number> {
    return [unsolved, unsolved]
}

if (import.meta.main) {
    printAnswers(2015, 24, solve)
}
