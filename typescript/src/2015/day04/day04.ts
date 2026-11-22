/*
 * 2015 day 4: The Ideal Stocking Stuffer. https://adventofcode.com/2015/day/4
 */

import {printAnswers, type Answers} from "../../answers.ts"
import {hash} from "node:crypto"

const ZERO = "0".charCodeAt(0)
const NINE = "9".charCodeAt(0)

/**
 * Room for the digits of any safe integer (at most 16) after the secret key.
 */
const MAX_DIGITS = 16

/**
 * The secret key followed by a number's decimal digits, as bytes that are counted up in place. `inUse` is the key and
 * digits in use: a view of `bytes`, so it sees every increment without being rebuilt.
 */
interface KeyedNumber {
    bytes: Uint8Array
    keyLength: number
    inUse: Uint8Array
}

/**
 * Writes the secret key and a starting number into a buffer with room for the number to grow.
 * @param secretKey The secret key from the puzzle, e.g. "abcdef"
 * @param start The number to start from, e.g. 0
 * @returns The key and number as bytes, e.g. "abcdef0"
 */
function keyedNumber(secretKey: string, start: number): KeyedNumber {
    const key = new TextEncoder().encode(secretKey)
    const digits = new TextEncoder().encode(String(start))
    const bytes = new Uint8Array(key.length + MAX_DIGITS)
    bytes.set(key)
    bytes.set(digits, key.length)
    return {bytes, keyLength: key.length, inUse: bytes.subarray(0, key.length + digits.length)}
}

/**
 * Adds one to the number in place, like counting by hand: a 9 becomes 0 and carries into the digit before it.
 * @param keyed The key and number, e.g. "abcdef129"; becomes "abcdef130"
 */
function incrementNumber(keyed: KeyedNumber): void {
    for (let index = keyed.inUse.length - 1; index >= keyed.keyLength; index--) {
        if (keyed.bytes[index] !== NINE) {
            keyed.bytes[index] = keyed.bytes[index]! + 1
            return
        }
        keyed.bytes[index] = ZERO
    }
    addLeadingOne(keyed)
}

/**
 * Finishes a carry out of the first digit: every digit is now 0, so "999" + 1 becomes "1000".
 * @param keyed The key and number, e.g. "abcdef000" after the carry; becomes "abcdef1000"
 */
function addLeadingOne(keyed: KeyedNumber): void {
    const length = keyed.inUse.length
    keyed.bytes[keyed.keyLength] = ZERO + 1
    keyed.bytes[length] = ZERO
    keyed.inUse = keyed.bytes.subarray(0, length + 1)
}

/**
 * Mine AdventCoins: find the first number that gives the secret key an MD5 hash starting with enough zeros.
 * Counts up the digits in a reused buffer, so no string is built per attempt. The hash stays hex because asking for
 * raw bytes builds a Buffer per call, which measured twice as slow. One-shot crypto.hash beats createHash by about 2x.
 * @param secretKey The secret key from the puzzle, e.g. "abcdef"
 * @param zeros How many zeros the hex hash must start with
 * @param start The first number to try, e.g. 0. Lets part 2 pick up where part 1 stopped.
 * @returns The lowest number from `start` on that, appended to the secret key as decimal digits, gives a hash that
 * starts with the required zeros, e.g. 609043 for "abcdef" with five zeros
 */
export function findLowestNumber(secretKey: string, zeros: number, start = 0): number {
    const prefix = "0".repeat(zeros)
    const keyed = keyedNumber(secretKey, start)
    for (let x = start; ; x++) {
        if (hash("md5", keyed.inUse, "hex").startsWith(prefix)) {
            return x
        }
        incrementNumber(keyed)
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
