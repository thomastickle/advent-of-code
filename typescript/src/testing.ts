import assert from "node:assert/strict"
import {describe, it, type TestContext} from "node:test"
import {unsolved, type Answers, type Solve} from "./answers.ts"
import {inputPath, readExpected, readInput} from "./input.ts"

/**
 * Wraps a puzzle test body: a part that is still unsolved, or a helper that still throws "not implemented", is
 * reported as skipped instead of failing, so unfinished parts don't turn finished ones (or the whole run) red.
 *
 * @param body The test body, e.g. `() => assert.equal(answer(solve("(())"), 1), 0)`.
 * @returns A test function for `it`.
 */
export function pending(body: () => unknown): (t: TestContext) => Promise<void> {
    return async (t) => {
        try {
            await body()
        } catch (error) {
            if (error instanceof Error && /^not implemented$/i.test(error.message)) {
                t.skip("not implemented")
                return
            }
            throw error
        }
    }
}

/**
 * Picks one part's answer out of what `solve` returned, for use inside {@link pending}.
 *
 * @param answers What `solve` returned, e.g. `[232, 1783]` or `[232, unsolved]`.
 * @param part Which part to pick, 1 or 2.
 * @returns That part's answer.
 * @throws "not implemented" if the part is still {@link unsolved}, which `pending` reports as skipped.
 */
export function answer<Part1, Part2>(answers: Answers<Part1, Part2>, part: 1): Part1
export function answer<Part1, Part2>(answers: Answers<Part1, Part2>, part: 2): Part2
export function answer<Part1, Part2>(answers: Answers<Part1, Part2>, part: 1 | 2): Part1 | Part2
export function answer<Part1, Part2>(answers: Answers<Part1, Part2>, part: 1 | 2): Part1 | Part2 {
    const value = answers[part - 1]
    if (value === unsolved) {
        throw new Error("not implemented")
    }
    return value as Part1 | Part2
}

/**
 * Declares the full-input tests for a day: one test per part, checked against the answers you recorded in
 * `inputs/<year>/dayNN.expected.json` (git-ignored), e.g. `{"part1": 1, "part2": 2}`.
 * `solve` runs once and both tests share its result, so a day that works out part 1 on the way to part 2 is not
 * solved twice.
 *
 * @param year Puzzle year, e.g. 2015.
 * @param day Puzzle day, 1-25, e.g. 3.
 * @param solve The day's `solve` function.
 * @param variant Optional name for an alternative solution of the same day, e.g. "compressed".
 */
export function fullInputTests(year: number, day: number, solve: Solve, variant?: string): void {
    const input = readInput(year, day)
    const expected: {part1?: unknown; part2?: unknown} = readExpected(year, day)
    let answers: Answers<unknown> | undefined

    const name = `${year} day ${String(day).padStart(2, "0")}${variant === undefined ? "" : ` (${variant})`}`
    describe(`${name}: full input`, () => {
        for (const part of [1, 2] as const) {
            const want = expected[`part${part}`]
            const skip = skipReason(year, day, part, input !== undefined, want !== undefined)
            it(`part ${part}`, {skip}, pending(() => {
                answers ??= solve(input!)
                assert.equal(answer(answers, part), want)
            }))
        }
    })
}

/**
 * Why a full-input test can't run yet, if it can't.
 *
 * @param year Puzzle year, e.g. 2015.
 * @param day Puzzle day, 1-25, e.g. 3.
 * @param part Which part, 1 or 2.
 * @param hasInput Whether the puzzle input has been saved.
 * @param hasAnswer Whether an expected answer has been recorded for this part.
 * @returns The reason to skip, e.g. "expected answer not recorded yet", or false to run the test.
 */
function skipReason(year: number, day: number, part: 1 | 2, hasInput: boolean, hasAnswer: boolean): string | false {
    if (day === 25 && part === 2) {
        return "day 25 has no part 2 puzzle"
    }
    if (!hasInput) {
        return `no input at ${inputPath(year, day)}`
    }
    return hasAnswer ? false : "expected answer not recorded yet"
}
