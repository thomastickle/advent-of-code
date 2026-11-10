import {inputPath, readInput} from "../../input.ts"

/** 2015 day 5: Doesn't He Have Intern-Elves For This?. https://adventofcode.com/2015/day/5 */

const vowels = new Set(["a", "e", "i", "o", "u"])
const forbidden = new Set(["ab", "cd", "pq", "xy"])


function hasWindow(input: string, size: number, predicate: (window: string, index: number) => boolean): boolean {
    for (let i = 0; i <= input.length - size; i++) {
        if (predicate(input.slice(i, i + size), i)) {
            return true
        }
    }

    return false
}

function hasThreeVowels(input: string): boolean {
    return [...input].filter(char => vowels.has(char)).length >= 3
}

function hasDoubleLetter(input: string): boolean {
    return hasWindow(input, 2, pair => pair[0] === pair[1])
}

function hasNoForbiddenPairs(input: string): boolean {
    return !hasWindow(input, 2, pair => forbidden.has(pair))
}

function isNiceOldRules(input: string): boolean {
    return hasThreeVowels(input) && hasDoubleLetter(input) && hasNoForbiddenPairs(input)
}

function hasSandwich(input: string): boolean {
    return hasWindow(input, 3, window => window[0] === window[2])
}

function hasRepeatedPair(input: string): boolean {
    const firstSeen = new Map<string, number>()
    return hasWindow(input, 2, (pair, index) => {
        const previous = firstSeen.get(pair)

        if (previous !== undefined) {
            return index - previous >= 2
        }

        firstSeen.set(pair, index)
        return false
    })
}

function isNiceNewRules(input: string): boolean {
    return hasSandwich(input) && hasRepeatedPair(input)
}

function countNice(input: string, lineProcessor: (line: string) => boolean): number {
    const lines = input.split("\n")
    let niceCount = 0
    for (const line of lines) {
        if (lineProcessor(line)) {
            niceCount++
        }
    }
    return niceCount
}

export function part1(input: string): number {
    return countNice(input, isNiceOldRules)
}

export function part2(input: string): number {
    return countNice(input, isNiceNewRules)
}

if (import.meta.main) {
    const input = readInput(2015, 5)
    if (input === undefined) {
        console.error(`No input found at ${inputPath(2015, 5)}`)
        process.exit(1)
    }
    console.log("part 1:", part1(input))
    console.log("part 2:", part2(input))
}
