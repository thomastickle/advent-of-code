import {printAnswers, type Answers} from "../../answers.ts"
import {hash} from "node:crypto"

/** 2015 day 4: The Ideal Stocking Stuffer. https://adventofcode.com/2015/day/4 */

/**
 * Mine AdventCoins: find the first number that gives the secret key an MD5 hash starting with enough zeros.
 * Tries 0, 1, 2, ... and stops at the first number whose hash, in hex, starts with the required zeros.
 * The one-shot crypto.hash is used instead of createHash because it is about twice as fast: no hash object is
 * created for every attempt.
 * @param secretKey The secret key from the puzzle, e.g. "abcdef"
 * @param zeros How many zeros the hex hash must start with
 * @param start The first number to try, e.g. 0. Lets part 2 pick up where part 1 stopped.
 * @returns The lowest number from `start` on that, appended to the secret key as decimal digits, gives a hash that
 * starts with the required zeros, e.g. 609043 for "abcdef" with five zeros
 */
export function findLowestNumber(secretKey: string, zeros: number, start = 0): number {
    const prefix = "0".repeat(zeros)
    for (let x = start; ; x++) {
        if (hash("md5", secretKey + x, "hex").startsWith(prefix)) {
            return x
        }
    }
}

/**
 * Solves both parts in one search. A hash that starts with six zeros also starts with five, so no number below
 * part 1's answer can satisfy part 2, and the six-zero search starts there instead of at 0. Part 2 takes about 16
 * times as many attempts as part 1, so this runs for a few seconds.
 *
 * @param input The secret key from the puzzle, e.g. "abcdef".
 * @returns [lowest number whose hash starts with five zeros, lowest number whose hash starts with six zeros].
 */
export function solve(input: string): Answers<number> {
    const fiveZeros = findLowestNumber(input, 5)
    return [fiveZeros, findLowestNumber(input, 6, fiveZeros)]
}

if (import.meta.main) {
    printAnswers(2015, 4, solve)
}
