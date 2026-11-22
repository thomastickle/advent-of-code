/*
 * 2015 day 15: Science for Hungry People. https://adventofcode.com/2015/day/15
 */

import {printAnswers, unsolved, type Answers} from "../../answers.ts"

/**
 * Solves both parts. Return {@link unsolved} for a part that isn't done yet.
 *
 * @param input One ingredient per line, e.g. "Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3".
 * @returns [part 1 answer, part 2 answer].
 */
export function solve(input: string): Answers<number> {
    return [unsolved, unsolved]
}

if (import.meta.main) {
    printAnswers(2015, 15, solve)
}
