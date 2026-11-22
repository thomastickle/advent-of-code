import {inputPath, readInput} from "./input.ts"

/**
 * Marks a part that has no answer yet. `solve` returns it in that part's slot, so a finished part 1 still counts while
 * part 2 is being worked on. The runner shows it as still wrapped and the tests skip it.
 */
export const unsolved = Symbol("unsolved")

/**
 * What a day's `solve` returns: `[part 1, part 2]`, either of which may still be {@link unsolved}.
 */
export type Answers<Part1, Part2 = Part1> = readonly [Part1 | typeof unsolved, Part2 | typeof unsolved]

/**
 * A day's entry point: works out both answers from the puzzle input in one call.
 */
export type Solve = (input: string) => Answers<unknown>

/**
 * Runs a day on its saved input and prints both answers. This is the body of each day's `import.meta.main` block.
 *
 * @param year Puzzle year, e.g. 2015.
 * @param day Puzzle day, 1-25, e.g. 3.
 * @param solve The day's `solve` function.
 */
export function printAnswers(year: number, day: number, solve: Solve): void {
    const input = readInput(year, day)
    if (input === undefined) {
        console.error(`No input found at ${inputPath(year, day)}`)
        process.exit(1)
    }
    for (const [index, answer] of solve(input).entries()) {
        console.log(`part ${index + 1}:`, answer === unsolved ? "unsolved" : answer)
    }
}
