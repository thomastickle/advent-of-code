/**
 * 2015 day 11: Corporate Policy. https://adventofcode.com/2015/day/11
 */
import {printAnswers, type Answers} from "../../answers.ts"


const A_CHAR = 'a'.codePointAt(0)!
const Z_CHAR = 'z'.codePointAt(0)!

export function incrementChar(char: number): {char: number, carry: boolean} {
    if (char === Z_CHAR) {
        return {char: A_CHAR, carry: true}
    }
    return {char: char + 1, carry: false}
}

export function incrementPassword(password: Uint8Array<ArrayBuffer>) {
    for (let index = password.length - 1; index >= 0; index--) {
        const result = incrementChar(password[index]!)
        password[index] = result.char
        if (!result.carry) {
            break
        }
    }
    return password
}

const BAD_CHARS = new TextEncoder().encode("iol")

export function hasNoBadCharacters(password: Uint8Array<ArrayBuffer>) {
    for (let index = 0; index < password.length; index++) {
        if (password[index] === BAD_CHARS[0] || password[index] === BAD_CHARS[1] || password[index] === BAD_CHARS[2]) {
            return false
        }
    }
    return true
}

export function hasTwoDifferentPairs(password: Uint8Array<ArrayBuffer>) {
    let firstPair: number | undefined = undefined

    for (let index = 1; index < password.length; index++) {
        if (password[index-1] === password[index]) {
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

export function hasIncreasingStraight(password: Uint8Array<ArrayBuffer>) {
    for (let index = 2; index < password.length; index++) {
        if (password[index-2]! + 1 === password[index-1] && password[index-1]! + 1 === password[index]) {
            return true
        }
    }
    return false
}

export function checkPassword(password: Uint8Array<ArrayBuffer>) {
   return hasNoBadCharacters(password) && hasTwoDifferentPairs(password) && hasIncreasingStraight(password)
}

export function nextPassword(input: string) {
    let password = new TextEncoder().encode(input)

    let satisfied = false
    while (!satisfied) {
        password = incrementPassword(password)
        satisfied = checkPassword(password)
    }

    return String.fromCodePoint(...password)
}

/**
 * Solves both parts, starting part 2's search from part 1's password instead of finding it a second time.
 *
 * @param input The current password, eight lowercase letters, e.g. "abcdefgh".
 * @returns [next valid password, the valid password after that].
 */
export function solve(input: string): Answers<string> {
    const next = nextPassword(input)
    return [next, nextPassword(next)]
}

if (import.meta.main) {
    printAnswers(2015, 11, solve)
}
