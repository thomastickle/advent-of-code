/**
 * 2015 day 11: Corporate Policy. https://adventofcode.com/2015/day/11
 */
import {inputPath, readInput} from "../../input.ts"


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

export function part1(input: string): string {
    return nextPassword(input)
}

export function part2(input: string): string {
    return nextPassword(nextPassword(input))
}

if (import.meta.main) {
    const input = readInput(2015, 11)
    if (input === undefined) {
        console.error(`No input found at ${inputPath(2015, 11)}`)
        process.exit(1)
    }
    console.log("part 1:", part1(input))
    console.log("part 2:", part2(input))
}
