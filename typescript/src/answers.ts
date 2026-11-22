import {inputPath, readInput} from "./input.ts"

/**
 * Marks a part that has no answer yet. `solve` returns it in that part's slot, so a finished part 1 still counts while
 * part 2 is being worked on. The runner shows it as still wrapped and the tests skip it.
 */
export const unsolved = Symbol("unsolved")

/** The type of {@link unsolved}. */
export type Unsolved = typeof unsolved

/** What a day's `solve` returns: `[part 1, part 2]`, either of which may still be {@link unsolved}. */
export type Answers<Part1, Part2 = Part1> = readonly [Part1 | Unsolved, Part2 | Unsolved]

/** A day's entry point: works out both answers from the puzzle input in one call. */
export type Solve = (input: string) => Answers<unknown>

/**
 * Formats one answer for printing.
 *
 * @param answer A part's answer, e.g. 232, or {@link unsolved}.
 * @returns The answer as text, e.g. "232", or "unsolved".
 */
export function formatAnswer(answer: unknown): string {
    return answer === unsolved ? "unsolved" : String(answer)
}

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
    const [part1, part2] = solve(input)
    console.log("part 1:", formatAnswer(part1))
    console.log("part 2:", formatAnswer(part2))
}
