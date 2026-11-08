import { parseArgs } from "node:util"

export type Level<T> = "all" | T

export interface Selection {
    year: Level<number> | undefined
    day: Level<number> | undefined
    part: Level<1 | 2> | undefined
    help: boolean
}

/** A problem with how the command was invoked (as opposed to a bug). */
export class UsageError extends Error {}

export const USAGE = `Usage:
  npm run aoc                                     pick from the menu
  npm run aoc -- --year=2015 --day=1 --part=1     run one part
  npm run aoc -- 2015 1 1                         same thing, shorter
  npm run aoc -- --year=2015                      menu for the rest
  npm run aoc -- --year=2015 --day=all            every day of 2015, both parts

Anything may be "all". Anything left out is asked for, except below an "all",
which means all (so --year=all runs everything). npm needs the lone "--".`

function level(
    name: string,
    raw: string | undefined,
    valid: (n: number) => boolean,
    hint: string,
): Level<number> | undefined {
    if (raw === undefined) return undefined
    if (raw.toLowerCase() === "all") return "all"
    if (!/^\d+$/.test(raw) || !valid(Number(raw))) {
        throw new UsageError(`--${name} must be ${hint}, or "all" (got "${raw}")`)
    }
    return Number(raw)
}

export function parseSelection(argv: string[]): Selection {
    let parsed
    try {
        parsed = parseArgs({
            args: argv,
            allowPositionals: true,
            options: {
                year: { type: "string" },
                day: { type: "string" },
                part: { type: "string" },
                help: { type: "boolean", short: "h" },
            },
        })
    } catch (error) {
        throw new UsageError(error instanceof Error ? error.message : String(error))
    }
    const { values, positionals } = parsed
    if (positionals.length > 3) throw new UsageError("Too many arguments: expected at most year, day and part.")
    const [yearArg, dayArg, partArg] = positionals

    return {
        year: level("year", values.year ?? yearArg, (n) => n >= 2015, "a year from 2015 on"),
        day: level("day", values.day ?? dayArg, (n) => n >= 1 && n <= 25, "a day from 1 to 25"),
        part: level("part", values.part ?? partArg, (n) => n === 1 || n === 2, "1 or 2") as Level<1 | 2> | undefined,
        help: values.help === true,
    }
}
