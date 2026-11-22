import {printAnswers, type Answers} from "../../answers.ts"

/**
 * Plays the look-and-say game once, for as many rounds as the largest checkpoint, and measures the sequence at each
 * checkpoint on the way. This lets part 1 (40 rounds) be read off the run that part 2 (50 rounds) needs anyway.
 *
 * @param input Starting sequence of digits, e.g. "1113222113".
 * @param checkpoints Round counts to measure after, e.g. [40, 50]. 0 measures the starting sequence.
 * @returns Number of digits after each checkpoint, in the same order, e.g. [252594, 3579328].
 * @throws If the input contains anything other than the digits 0-9, or a checkpoint is not a whole number of
 * rounds (0 or more).
 */
export function lookAndSayLengths(input: string, checkpoints: number[]): number[] {
    const badCheckpoint = checkpoints.find(checkpoint => !Number.isInteger(checkpoint) || checkpoint < 0)
    if (badCheckpoint !== undefined) {
        throw new Error(`Invalid number of rounds: ${badCheckpoint}`)
    }

    let current = parseDigits(input)
    let length = current.length
    let next: Uint8Array = new Uint8Array(length * 2)

    const lengths = new Map<number, number>()
    const rounds = Math.max(0, ...checkpoints)
    for (let round = 0; ; round++) {
        lengths.set(round, length)
        if (round === rounds) {
            break
        }

        // Each run writes at most two digits per input digit, so this is always enough room.
        if (next.length < length * 2) {
            next = new Uint8Array(length * 2)
        }

        length = sayRound(current, length, next)

        const swap = current
        current = next
        next = swap
    }

    return checkpoints.map(checkpoint => lengths.get(checkpoint)!)
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

/**
 * Solves both parts from a single 50-round game, measuring the sequence after round 40 on the way.
 *
 * @param input Starting sequence of digits, e.g. "1113222113".
 * @returns [digits after 40 rounds, digits after 50 rounds].
 * @throws If the input contains anything other than the digits 0-9.
 */
export function solve(input: string): Answers<number> {
    const [after40, after50] = lookAndSayLengths(input, [40, 50])
    return [after40!, after50!]
}

if (import.meta.main) {
    printAnswers(2015, 10, solve)
}
