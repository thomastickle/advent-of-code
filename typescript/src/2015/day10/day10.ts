import {printAnswers, type Answers} from "../../answers.ts"

/**
 * Plays the look-and-say game and measures the result.
 *
 * @param input Starting sequence of digits, e.g. "1113222113".
 * @param rounds Number of times to apply the rule, e.g. 40.
 * @returns Number of digits in the sequence after the last round.
 * @throws If the input contains anything other than the digits 0-9.
 */
export function lookAndSay(input: string, rounds = 40): number {
    let current = parseDigits(input)
    let length = current.length
    let next: Uint8Array = new Uint8Array(length * 2)

    for (let round = 0; round < rounds; round++) {
        // Each run writes at most two digits per input digit, so this is always enough room.
        if (next.length < length * 2) {
            next = new Uint8Array(length * 2)
        }

        length = sayRound(current, length, next)

        const swap = current
        current = next
        next = swap
    }

    return length
}

/**
 * Converts a string of digits into a buffer of digit values.
 *
 * @param input Sequence of digits, e.g. "1113222113".
 * @returns Buffer holding one digit value (0-9) per character, e.g. [1, 1, 1, 3, 2, 2, 2, 1, 1, 3].
 * @throws If the input contains anything other than the digits 0-9.
 */
function parseDigits(input: string): Uint8Array {
    const digits = new Uint8Array(input.length)
    for (let i = 0; i < input.length; i++) {
        const digit = input.charCodeAt(i) - 48
        if (digit < 0 || digit > 9) {
            throw new Error(`Invalid digit "${input[i]}" at position ${i}`)
        }
        digits[i] = digit
    }
    return digits
}

/**
 * Applies the look-and-say rule once, reading the runs of the source and writing their descriptions to the target.
 *
 * @param source Buffer holding the current sequence as digit values, e.g. [1, 1, 2] for "112".
 * @param length Number of digits in use in the source, e.g. 3. The buffer may be longer.
 * @param target Buffer to write the next sequence into, e.g. [2, 1, 1, 2] for "2112". Needs room for twice `length`.
 * @returns Number of digits written to the target.
 */
function sayRound(source: Uint8Array, length: number, target: Uint8Array): number {
    let written = 0
    let runCount = 0
    let lastDigit = -1
    for (let i = 0; i < length; i++) {
        const digit = source[i]!
        if (digit === lastDigit) {
            runCount += 1
            continue
        }

        if (runCount > 0) {
            written = writeRun(target, written, runCount, lastDigit)
        }

        runCount = 1
        lastDigit = digit
    }

    if (runCount > 0) {
        written = writeRun(target, written, runCount, lastDigit)
    }
    return written
}

/**
 * Writes one run as "<count><digit>" into a buffer.
 *
 * @param buffer Buffer to write into.
 * @param offset Index of the first free position in the buffer, e.g. 0.
 * @param count Length of the run, e.g. 3 for "111". Runs of 10 or more are written as several digits.
 * @param digit The digit that repeats, 0-9, e.g. 1.
 * @returns Index of the first free position after the written run.
 */
function writeRun(buffer: Uint8Array, offset: number, count: number, digit: number): number {
    if (count < 10) {
        buffer[offset++] = count
    } else {
        for (const char of String(count)) {
            buffer[offset++] = char.charCodeAt(0) - 48
        }
    }
    buffer[offset++] = digit
    return offset
}

export function part1(input: string): number {
    return lookAndSay(input, 40)
}

export function part2(input: string): number {
    return lookAndSay(input, 50)
}

/**
 * Solves both parts. Each part is worked out on its own for now; share the work here if part 2 can build on
 * part 1.
 *
 * @param input Starting sequence of digits, e.g. "1113222113".
 * @returns [digits after 40 rounds, digits after 50 rounds].
 */
export function solve(input: string): Answers<number> {
    return [part1(input), part2(input)]
}

if (import.meta.main) {
    printAnswers(2015, 10, solve)
}
