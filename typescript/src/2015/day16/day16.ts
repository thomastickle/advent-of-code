import {printAnswers, unsolved, type Answers} from "../../answers.ts"

/** 2015 day 16: Aunt Sue. https://adventofcode.com/2015/day/16 */

/**
 * Solves both parts. Return {@link unsolved} for a part that isn't done yet.
 *
 * @param input One aunt per line, e.g. "Sue 1: goldfish: 6, trees: 9, akitas: 0".
 * @returns [part 1 answer, part 2 answer].
 */
export function solve(input: string): Answers<number> {
    return [unsolved, unsolved]
}

if (import.meta.main) {
    printAnswers(2015, 16, solve)
}
