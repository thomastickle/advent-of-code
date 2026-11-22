import {printAnswers, type Answers} from "../../answers.ts"

/** 2015 day 5: Doesn't He Have Intern-Elves For This? https://adventofcode.com/2015/day/5 */

/** The strings that make a line naughty under the old rules: "ab", "cd", "pq" and "xy". */
const forbiddenPairs = /ab|cd|pq|xy/

/**
 * Whether a character is one of the vowels a, e, i, o or u.
 * A plain comparison chain is about twice as fast as looking the character up in a Set.
 * @param char One character of a line, or undefined when an index is out of range
 * @returns true if the character is a lowercase vowel
 */
function isVowel(char: string | undefined): boolean {
    return char === "a" || char === "e" || char === "i" || char === "o" || char === "u"
}

/**
 * Old rule 1: the line contains at least three vowels (a, e, i, o, u), which need not be different or adjacent
 * @param input One line of the puzzle input, e.g. "ugknbfddgicrmopn"
 * @returns true if the line has three or more vowels; stops counting as soon as it reaches three
 */
function hasThreeVowels(input: string): boolean {
    let vowelCount = 0
    for (let index = 0; index < input.length; index++) {
        if (isVowel(input[index]) && ++vowelCount === 3) {
            return true
        }
    }
    return false
}

/**
 * Old rule 2: the line contains at least one letter that appears twice in a row, such as "dd" in "abcdde"
 * @param input One line of the puzzle input, e.g. "ugknbfddgicrmopn"
 * @returns true if any two neighboring characters are the same
 */
function hasDoubleLetter(input: string): boolean {
    for (let index = 0; index < input.length - 1; index++) {
        if (input[index] === input[index + 1]) {
            return true
        }
    }
    return false
}

/**
 * Old rule 3: the line does not contain "ab", "cd", "pq" or "xy", even when they overlap other letters
 * @param input One line of the puzzle input, e.g. "haegwjzuvuyypxyu"
 * @returns true if none of the forbidden pairs appears anywhere in the line
 */
function hasNoForbiddenPairs(input: string): boolean {
    return !forbiddenPairs.test(input)
}

/**
 * Part 1: decide whether a line is nice under the old rules
 * @param input One line of the puzzle input, e.g. "ugknbfddgicrmopn"
 * @returns true if the line has three vowels and a double letter and no forbidden pair
 */
function isNiceOldRules(input: string): boolean {
    return hasThreeVowels(input) && hasDoubleLetter(input) && hasNoForbiddenPairs(input)
}

/**
 * New rule 2: the line has a letter that repeats with exactly one letter between the two, such as "xyx" or "aaa"
 * @param input One line of the puzzle input, e.g. "qjhvhtzxzqqjkmpb"
 * @returns true if any character equals the character two positions after it
 */
function hasSandwich(input: string): boolean {
    for (let index = 0; index < input.length - 2; index++) {
        if (input[index] === input[index + 2]) {
            return true
        }
    }
    return false
}

/**
 * New rule 1: the line has a pair of letters that appears at least twice without overlapping, such as "xy" in "xyxy"
 * but not "aa" in "aaa". For each pair, only the part of the line after it is searched, so the copies can't overlap.
 * @param input One line of the puzzle input, e.g. "qjhvhtzxzqqjkmpb"
 * @returns true if some two-letter pair occurs again later in the line
 */
function hasRepeatedPair(input: string): boolean {
    for (let index = 0; index < input.length - 3; index++) {
        // Look for the same pair again, starting after this one so the two can't overlap.
        if (input.indexOf(input.slice(index, index + 2), index + 2) !== -1) {
            return true
        }
    }
    return false
}

/**
 * Part 2: decide whether a line is nice under the new rules
 * @param input One line of the puzzle input, e.g. "qjhvhtzxzqqjkmpb"
 * @returns true if the line has a repeated pair and a letter that repeats with one letter between
 */
function isNiceNewRules(input: string): boolean {
    return hasSandwich(input) && hasRepeatedPair(input)
}

/**
 * Count the lines of the input that are nice under a given set of rules
 * @param input The puzzle input, one line per string
 * @param isNice The rule that decides whether a single line is nice
 * @returns How many lines satisfy the rule
 */
function countNice(input: string, isNice: (line: string) => boolean): number {
    const lines = input.split("\n")
    let niceCount = 0
    for (const line of lines) {
        if (isNice(line)) {
            niceCount++
        }
    }
    return niceCount
}

/**
 * Solves both parts. They share only the parsing, which is cheap, so each part runs on its own.
 *
 * @param input The puzzle input, one string per line, e.g. "ugknbfddgicrmopn".
 * @returns [nice strings under the old rules, nice strings under the new rules].
 */
export function solve(input: string): Answers<number> {
    return [countNice(input, isNiceOldRules), countNice(input, isNiceNewRules)]
}

if (import.meta.main) {
    printAnswers(2015, 5, solve)
}
