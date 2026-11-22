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
 * The letter after this one, skipping i, o and l. None of them is z, so skipping one never needs a carry.
 * @param char A character code below "z", e.g. 104 for "h".
 * @returns The next letter's code that a password may contain, e.g. 106 for "j".
 */
function nextAllowedChar(char: number): number {
    const next = char + 1
    return isBadChar(next) ? next + 1 : next
}

/**
 * Moves a password on to the next one in place, like counting in base 26, skipping i, o and l. In place so the
 * search doesn't build a new array for every candidate.
 * @param password The password as character codes, e.g. "abcdefgz" encoded; becomes "abcdefha".
 */
export function incrementPassword(password: Uint8Array): void {
    // "zzzzzzzz" wraps to "aaaaaaaa" on purpose.
    for (let index = password.length - 1; index >= 0; index--) {
        if (password[index] !== Z_CHAR) {
            password[index] = nextAllowedChar(password[index]!)
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
