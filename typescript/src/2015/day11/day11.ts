import {printAnswers, type Answers} from "../../answers.ts"

/** 2015 day 11: Corporate Policy. https://adventofcode.com/2015/day/11 */

const A_CHAR = "a".charCodeAt(0)
const Z_CHAR = "z".charCodeAt(0)
const I_CHAR = "i".charCodeAt(0)
const O_CHAR = "o".charCodeAt(0)
const L_CHAR = "l".charCodeAt(0)

/**
 * Tells whether a letter is one that passwords may not contain.
 * @param char A character code, e.g. 105 for "i".
 * @returns True for i, o and l.
 */
function isBadChar(char: number): boolean {
    return char === I_CHAR || char === O_CHAR || char === L_CHAR
}

/**
 * Moves a password on to the next one in place, like counting in base 26: the last letter goes up by one, and a "z"
 * rolls over to "a" and carries into the letter before it. Changing the array in place avoids building a new one for
 * every one of the many candidates the search goes through.
 * @param password The password as character codes, e.g. "abcdefgz" encoded; becomes "abcdefha".
 */
export function incrementPassword(password: Uint8Array): void {
    // Deliberate: "zzzzzzzz" wraps around to "aaaaaaaa" (the carry runs off the front), and the search carries on.
    for (let index = password.length - 1; index >= 0; index--) {
        if (password[index] !== Z_CHAR) {
            password[index] = password[index]! + 1
            // Every password with i, o or l here is invalid, so step straight past it (h -> j, k -> m, n -> p).
            // None of them is z, so this never carries, and everything to the right is already "a".
            if (isBadChar(password[index]!)) {
                password[index] = password[index]! + 1
            }
            return
        }
        password[index] = A_CHAR
    }
}

const BAD_CHARS = new TextEncoder().encode("iol")

/**
 * Checks the rule that passwords may not contain the letters i, o or l, which are easily mistaken for others.
 * @param password The password as character codes, e.g. "abcdffaa" encoded.
 * @returns True if none of the three letters appears.
 */
export function hasNoBadCharacters(password: Uint8Array): boolean {
    for (let index = 0; index < password.length; index++) {
        if (password[index] === BAD_CHARS[0] || password[index] === BAD_CHARS[1] || password[index] === BAD_CHARS[2]) {
            return false
        }
    }
    return true
}

/**
 * Checks the rule that a password holds two pairs of different letters that don't overlap, like "aa" and "bb".
 * @param password The password as character codes, e.g. "abcdffaa" encoded.
 * @returns True if there are two non-overlapping pairs of different letters. "aaa" holds only one pair, and "aaaa"
 * two pairs of the same letter, so neither counts on its own.
 */
export function hasTwoDifferentPairs(password: Uint8Array): boolean {
    let firstPair: number | undefined = undefined

    for (let index = 1; index < password.length; index++) {
        if (password[index - 1] === password[index]) {
            if (firstPair === undefined) {
                firstPair = password[index]
            } else if (firstPair !== password[index]) {
                return true
            }
            // Step past the pair so the next one can't share its second letter.
            index++
        }
    }

    return false
}

/**
 * Checks the rule that a password holds a straight of three increasing letters, like "abc" or "xyz".
 * @param password The password as character codes, e.g. "abcdffaa" encoded.
 * @returns True if three letters in a row each go up by one. "yza" doesn't count: z does not wrap to a.
 */
export function hasIncreasingStraight(password: Uint8Array): boolean {
    for (let index = 2; index < password.length; index++) {
        if (password[index - 2]! + 1 === password[index - 1] && password[index - 1]! + 1 === password[index]) {
            return true
        }
    }
    return false
}

/**
 * Checks a password against all three of the security elf's rules.
 * @param password The password as character codes, e.g. "abcdffaa" encoded.
 * @returns True if the password has no i, o or l, two different pairs, and an increasing straight.
 */
export function checkPassword(password: Uint8Array): boolean {
    return hasNoBadCharacters(password) && hasTwoDifferentPairs(password) && hasIncreasingStraight(password)
}

/**
 * Jumps past a bad letter in a starting password: bumps the first i, o or l and resets everything after it to "a",
 * e.g. "ghijklmn" becomes "ghjaaaaa". Every password in between still has the bad letter, so none can be valid.
 * @param password The password as character codes, e.g. "ghijklmn" encoded. Changed in place.
 * @returns True if the password was changed. It is then already past the starting one, and may itself be valid.
 */
export function skipBadChars(password: Uint8Array): boolean {
    const index = password.findIndex(isBadChar)
    if (index === -1) {
        return false
    }
    password[index] = password[index]! + 1
    password.fill(A_CHAR, index + 1)
    return true
}

/** Every password is exactly eight lowercase letters. */
const PASSWORD_PATTERN = /^[a-z]{8}$/

/**
 * Finds the next valid password after the given one.
 * @param input The current password, eight lowercase letters, e.g. "abcdefgh".
 * @returns The first password after it that passes every rule, e.g. "abcdffaa".
 * @throws If the input is not exactly eight lowercase letters.
 */
export function nextPassword(input: string): string {
    if (!PASSWORD_PATTERN.test(input)) {
        throw new Error(`Invalid password "${input}": expected 8 lowercase letters`)
    }

    const password = new TextEncoder().encode(input)
    if (!skipBadChars(password)) {
        incrementPassword(password)
    }
    while (!checkPassword(password)) {
        incrementPassword(password)
    }

    return String.fromCharCode(...password)
}

/**
 * Solves both parts, starting part 2's search from part 1's password instead of finding it a second time.
 *
 * @param input The current password, eight lowercase letters, e.g. "abcdefgh".
 * @returns [next valid password, the valid password after that].
 * @throws If the input is not exactly eight lowercase letters.
 */
export function solve(input: string): Answers<string> {
    const next = nextPassword(input)
    return [next, nextPassword(next)]
}

if (import.meta.main) {
    printAnswers(2015, 11, solve)
}
