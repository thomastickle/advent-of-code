/*
 * 2015 day 25: Let It Snow. https://adventofcode.com/2015/day/25
 */

import {printAnswers, unsolved, type Answers} from "../../answers.ts"

/**
 * Which code in the sequence (1-based) lands at this row and column? Codes fill the grid along diagonals.
 */
export function sequenceNumber(row: number, column: number): number {
    throw new Error("not implemented")
}

/**
 * The code at this row and column: start at 20151125, then multiply by 252533 and take the remainder mod 33554393.
 */
export function codeAt(row: number, column: number): number {
    throw new Error("not implemented")
}

/**
 * Solves the puzzle. Day 25 has no part 2 puzzle (its star is free), so part 2 stays {@link unsolved}.
 *
 * @param input The puzzle sentence giving the row and column, e.g. "... Enter the code at row 2981, column 3075."
 * @returns [part 1 answer, part 2 answer].
 */
export function solve(input: string): Answers<number> {
    return [unsolved, unsolved]
}

if (import.meta.main) {
    printAnswers(2015, 25, solve)
}
