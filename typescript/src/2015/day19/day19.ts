import {printAnswers, unsolved, type Answers} from "../../answers.ts"

/** 2015 day 19: Medicine for Rudolph. https://adventofcode.com/2015/day/19 */

/**
 * Solves both parts. Return {@link unsolved} for a part that isn't done yet.
 *
 * @param input The replacements, one per line as "<from> => <to>", e.g. "H => HO", then a blank line and the molecule.
 * @returns [part 1 answer, part 2 answer].
 */
export function solve(input: string): Answers<number> {
    return [unsolved, unsolved]
}

if (import.meta.main) {
    printAnswers(2015, 19, solve)
}
