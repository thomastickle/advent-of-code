import {printAnswers, unsolved, type Answers} from "../../answers.ts"

/** 2015 day 18: Like a GIF For Your Yard. https://adventofcode.com/2015/day/18 */

/**
 * Solves both parts. Return {@link unsolved} for a part that isn't done yet.
 *
 * @param input The light grid, one row per line of "#" (on) and "." (off), e.g. ".#.#.#".
 * @param steps Number of animation steps, e.g. 100 (the example runs 4).
 * @returns [part 1 answer, part 2 answer].
 */
export function solve(input: string, steps = 100): Answers<number> {
    return [unsolved, unsolved]
}

if (import.meta.main) {
    printAnswers(2015, 18, solve)
}
