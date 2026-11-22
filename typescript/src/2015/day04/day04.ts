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
 * @returns The lowest number that, appended to the secret key as decimal digits, gives a hash that starts with
 * the required zeros, e.g. 609043 for "abcdef" with five zeros
 */
function findLowestNumber(secretKey: string, zeros: number): number {
    const prefix = "0".repeat(zeros)
    for (let x = 0; ; x++) {
        if (hash("md5", secretKey + x, "hex").startsWith(prefix)) {
            return x
        }
    }
}

/**
 * Part 1: the lowest number that gives a hash starting with five zeros
 * @param input The secret key from the puzzle, e.g. "abcdef"
 * @returns The lowest number that gives a hash starting with five zeros, e.g. 609043 for "abcdef"
 */
export function part1(input: string): number {
    return findLowestNumber(input, 5)
}

/**
 * Part 2: the lowest number that gives a hash starting with six zeros.
 * This takes about 16 times as many attempts as part 1, so it runs for a few seconds.
 * @param input The secret key from the puzzle, e.g. "abcdef"
 * @returns The lowest number that gives a hash starting with six zeros
 */
export function part2(input: string): number {
    return findLowestNumber(input, 6)
}

/**
 * Solves both parts. Each part is worked out on its own for now; share the work here if part 2 can build on
 * part 1.
 *
 * @param input The secret key from the puzzle, e.g. "abcdef".
 * @returns [lowest number whose hash starts with five zeros, lowest number whose hash starts with six zeros].
 */
export function solve(input: string): Answers<number> {
    return [part1(input), part2(input)]
}

if (import.meta.main) {
    printAnswers(2015, 4, solve)
}
