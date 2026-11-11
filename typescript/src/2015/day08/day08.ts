import {inputPath, readInput} from "../../input.ts"

/** Two hex digits, as in the `27` of `\x27`. */
const HEX_PAIR = /^[0-9a-fA-F]{2}$/

/**
 * Count the characters a string literal holds in memory, after its escapes are resolved.
 * @param line One string literal with its surrounding quotes, e.g. `"aaa\"aaa"`. The only escapes are `\\`, `\"` and
 * `\x` followed by two hex digits, and each counts as one character.
 * @returns The number of characters in memory, not counting the surrounding quotes (the example above gives 7)
 * @throws If the line is not quoted, has an unescaped quote inside, or has an unknown or truncated escape
 */
function memoryLength(line: string): number {
    if (line.length < 2 || !line.startsWith("\"") || !line.endsWith("\"")) {
        throw new Error(`Invalid line: ${line}`)
    }
    const body = line.slice(1, -1)
    let length = 0
    for (let i = 0; i < body.length; i++) {
        const char = body[i]
        if (char === "\"") {
            throw new Error(`Invalid line: ${line}`)
        }
        if (char === "\\") {
            const next = body[i + 1]
            if (next === "\\" || next === "\"") {
                i += 1
            } else if (next === "x" && HEX_PAIR.test(body.slice(i + 2, i + 4))) {
                i += 3
            } else {
                throw new Error(`Invalid line: ${line}`)
            }
        }
        length++
    }
    return length
}

/**
 * Count the characters needed to write a string literal out as a new string literal.
 * Each quote and backslash gains an escaping backslash, and a new pair of quotes goes around the whole thing.
 * @param line One string literal as it appears in the input, e.g. `"aaa\"aaa"` (10 characters)
 * @returns The length of the re-encoded literal, including its surrounding quotes (16 for the example above)
 */
function encodedLength(line: string): number {
    const escaped = line.length - line.replace(/["\\]/g, "").length
    return 2 + line.length + escaped
}

/**
 * Add up a per-line result over a whole input, skipping blank lines such as one left by a trailing newline.
 * @param input The puzzle input, one string literal per line
 * @param perLine The result for one line
 * @returns The sum of the per-line results
 */
function sumOverLines(input: string, perLine: (line: string) => number): number {
    let total = 0
    for (const line of input.split("\n")) {
        if (line !== "") {
            total += perLine(line)
        }
    }
    return total
}

/**
 * Part 1: characters of code minus characters in memory, over every literal.
 * @param input The puzzle input, one string literal per line, e.g. `"abc"`
 * @returns The total difference
 * @throws If a line is not a valid string literal
 */
export function part1(input: string): number {
    return sumOverLines(input, line => line.length - memoryLength(line))
}

/**
 * Part 2: characters of the re-encoded literals minus characters of the original code, over every literal.
 * @param input The puzzle input, one string literal per line, e.g. `"abc"`
 * @returns The total difference
 */
export function part2(input: string): number {
    return sumOverLines(input, line => encodedLength(line) - line.length)
}

if (import.meta.main) {
    const input = readInput(2015, 8)
    if (input === undefined) {
        console.error(`No input found at ${inputPath(2015, 8)}`)
        process.exit(1)
    }
    console.log("part 1:", part1(input))
    console.log("part 2:", part2(input))
}
