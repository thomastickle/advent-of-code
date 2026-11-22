/*
 * 2015 day 10: Elves Look, Elves Say. https://adventofcode.com/2015/day/10
 */

import {printAnswers, type Answers} from "../../answers.ts"

const ZERO = "0".charCodeAt(0)

/**
 * Plays the look-and-say game once, for as many rounds as the largest checkpoint, and measures the sequence at each
 * checkpoint on the way. This lets part 1 (40 rounds) be read off the run that part 2 (50 rounds) needs anyway.
 *
 * @param input Starting sequence of digits, e.g. "1113222113".
 * @param checkpoints Round counts to measure after, e.g. [40, 50]. 0 measures the starting sequence.
 * @returns Number of digits after each checkpoint, in the same order, e.g. [252594, 3579328].
 * @throws If the input is empty or contains anything other than the digits 0-9, or a checkpoint is not a whole
 * number of rounds (0 or more).
 */
export function lookAndSayLengths<const Checkpoints extends readonly number[]>(
    input: string,
    checkpoints: Checkpoints,
): {[Index in keyof Checkpoints]: number} {
    assertWholeRounds(checkpoints)
    const lengths = lengthAfterEachRound(parseDigits(input), Math.max(0, ...checkpoints))
    return checkpoints.map(checkpoint => lengths[checkpoint]!) as {[Index in keyof Checkpoints]: number}
}

/**
 * Checks that every checkpoint is a number of rounds that can actually be played.
 *
 * @param checkpoints Round counts, e.g. [40, 50].
 * @throws If a checkpoint is negative or not a whole number.
 */
function assertWholeRounds(checkpoints: readonly number[]): void {
    const badCheckpoint = checkpoints.find(checkpoint => !Number.isInteger(checkpoint) || checkpoint < 0)
    if (badCheckpoint !== undefined) {
        throw new Error(`Invalid number of rounds: ${badCheckpoint}`)
    }
}

/**
 * Plays the game, swapping between two buffers so each round reuses the memory of the round before last.
 *
 * @param start Starting sequence as digit values, e.g. [1] for "1".
 * @param rounds Number of rounds to play, e.g. 50.
 * @returns Number of digits after each round, starting with round 0, e.g. [1, 2, 2, 4, 6, 6] for "1" and 5 rounds.
 */
function lengthAfterEachRound(start: Uint8Array, rounds: number): number[] {
    let current = start
    let next: Uint8Array = new Uint8Array(0)
    const lengths = [start.length]
    for (let round = 1; round <= rounds; round++) {
        const length = lengths[round - 1]!
        next = withRoomFor(next, longestNextRound(length))
        lengths.push(sayRound(current, length, next))

        const swap = current
        current = next
        next = swap
    }
    return lengths
}

/**
 * The most digits one round can say about a sequence: a run of one digit becomes two digits, and longer runs less.
 *
 * @param length Number of digits in the sequence, e.g. 3.
 * @returns Number of digits the next round can need at most, e.g. 6.
 */
function longestNextRound(length: number): number {
    return length * 2
}

/**
 * Reuses a buffer if it is big enough, otherwise makes a bigger one.
 *
 * @param buffer The buffer to reuse.
 * @param size Number of digits it must hold, e.g. 6.
 * @returns The same buffer, or a new one of exactly `size`.
 */
function withRoomFor(buffer: Uint8Array, size: number): Uint8Array {
    return buffer.length >= size ? buffer : new Uint8Array(size)
}

/**
 * Converts a string of digits into a buffer of digit values.
 *
 * @param input Sequence of digits, e.g. "1113222113".
 * @returns Buffer holding one digit value (0-9) per character, e.g. [1, 1, 1, 3, 2, 2, 2, 1, 1, 3].
 * @throws If the input is empty or contains anything other than the digits 0-9.
 */
function parseDigits(input: string): Uint8Array {
    if (input.length === 0) {
        throw new Error("Empty input: expected a sequence of digits")
    }

    const digits = new Uint8Array(input.length)
    for (let index = 0; index < input.length; index++) {
        const digit = input.charCodeAt(index) - ZERO
        if (digit < 0 || digit > 9) {
            throw new Error(`Invalid digit "${input[index]}" at position ${index}`)
        }
        digits[index] = digit
    }
    return digits
}

/**
 * Applies the look-and-say rule once, reading the runs of the source and writing their descriptions to the target.
 *
 * @param source Buffer holding the current sequence as digit values, e.g. [1, 1, 2] for "112".
 * @param length Number of digits in use in the source, at least 1, e.g. 3. The buffer may be longer.
 * @param target Buffer to write the next sequence into, e.g. [2, 1, 1, 2] for "2112". Needs room for twice `length`.
 * @returns Number of digits written to the target.
 */
function sayRound(source: Uint8Array, length: number, target: Uint8Array): number {
    let written = 0
    let runDigit = source[0]!
    let runCount = 1
    for (let index = 1; index < length; index++) {
        const digit = source[index]!
        if (digit === runDigit) {
            runCount += 1
            continue
        }

        written = writeRun(target, written, runCount, runDigit)
        runDigit = digit
        runCount = 1
    }

    return writeRun(target, written, runCount, runDigit)
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
        offset = writeMultiDigitCount(buffer, offset, count)
    }
    buffer[offset++] = digit
    return offset
}

/**
 * Writes a run count of 10 or more, one digit at a time. Only a starting input can have a run this long: look-and-say
 * never makes one, so this never runs after the first round.
 *
 * @param buffer Buffer to write into.
 * @param offset Index of the first free position in the buffer, e.g. 0.
 * @param count Length of the run, e.g. 12.
 * @returns Index of the first free position after the count.
 */
function writeMultiDigitCount(buffer: Uint8Array, offset: number, count: number): number {
    for (const char of String(count)) {
        buffer[offset++] = char.charCodeAt(0) - ZERO
    }
    return offset
}

/**
 * Solves both parts from a single 50-round game, measuring the sequence after round 40 on the way.
 *
 * @param input Starting sequence of digits, e.g. "1113222113".
 * @returns [digits after 40 rounds, digits after 50 rounds].
 * @throws If the input is empty or contains anything other than the digits 0-9.
 */
export function solve(input: string): Answers<number> {
    return lookAndSayLengths(input, [40, 50])
}

if (import.meta.main) {
    printAnswers(2015, 10, solve)
}
