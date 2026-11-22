import {printAnswers, unsolved, type Answers} from "../../answers.ts"

/** 2015 day 14: Reindeer Olympics. https://adventofcode.com/2015/day/14 */

/**
 * Solves both parts. Return {@link unsolved} for a part that isn't done yet.
 *
 * @param input One reindeer per line, e.g. "Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds."
 * @param seconds Length of the race in seconds, e.g. 2503 (the example race lasts 1000).
 * @returns [part 1 answer, part 2 answer].
 */
export function solve(input: string, seconds = 2503): Answers<number> {
    return [unsolved, unsolved]
}

if (import.meta.main) {
    printAnswers(2015, 14, solve)
}
