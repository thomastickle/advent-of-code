import { relative } from "node:path"
import { pathToFileURL } from "node:url"
import { unsolved, type Answers, type Solve } from "../answers.ts"
import { inputPath, readInput } from "../input.ts"
import { parseSelection, UsageError, USAGE, type Level } from "./args.ts"
import { discover, type DayEntry } from "./discover.ts"
import { select, type Choice } from "./menu.ts"
import { banner, bold, cyan, dim, formatDuration, green, red, yellow } from "./theme.ts"

type Part = 1 | 2
type DayModule = { solve?: Solve }

type Outcome =
    | { kind: "star"; answer: string }
    | { kind: "wrapped" }
    | { kind: "free" } // day 25 part 2
    | { kind: "no-input"; path: string }
    | { kind: "coal"; message: string }

/**
 * What running one day produced: an outcome per chosen part, and how long `solve` took if it ran.
 */
interface DayResult {
    outcomes: Outcome[]
    ms?: number
}

const pad = (n: number) => String(n).padStart(2, "0")
const allOr = <T>(value: Level<T>, all: T[]): T[] => (value === "all" ? all : [value])

async function choose(entries: DayEntry[], sel: ReturnType<typeof parseSelection>) {
    const years = [...new Set(entries.map((e) => e.year))]

    const year =
        sel.year ??
        (await select<Level<number>>("Which year shall we unwrap?", [
            { label: "🎁 All years", value: "all" },
            ...years.map((y): Choice<Level<number>> => ({ label: `🎄 ${y}`, value: y })),
        ]))
    const pickedYears = allOr(year, years)
    if (pickedYears.some((y) => !years.includes(y))) {
        throw new UsageError(`No ${year} in the workshop yet. Available: ${years.join(", ")}.`)
    }

    // Anything below an "all" defaults to all; otherwise ask for whatever was left out.
    const days = [...new Set(entries.filter((e) => pickedYears.includes(e.year)).map((e) => e.day))]
    const day =
        sel.day ??
        (year === "all"
            ? "all"
            : await select<Level<number>>(`Which day of ${year}?`, [
                  { label: "🎁 All days", value: "all" },
                  ...days.map((d): Choice<Level<number>> => ({ label: `⭐ Day ${pad(d)}`, value: d })),
              ]))

    const part: Level<Part> =
        sel.part ??
        (day === "all"
            ? "all"
            : await select<Level<Part>>(`Which part of day ${pad(day)}?`, [
                  { label: "🎁 Both parts", value: "all" },
                  { label: "⭐ Part 1", value: 1 },
                  { label: "🌟 Part 2", value: 2 },
              ]))

    const picked = entries.filter((e) => pickedYears.includes(e.year) && allOr(day, days).includes(e.day))
    if (picked.length === 0)
        throw new UsageError(`No day ${day} under ${year} yet. Santa's elves are still working on it.`)
    return picked.flatMap((entry) => allOr(part, [1, 2] as Part[]).map((p) => ({ entry, part: p })))
}

/**
 * Runs a day's `solve` once and picks out the chosen parts, so a day that works out part 1 on the way to part 2 is
 * timed (and run) only once. Both parts are computed even if only one was chosen.
 */
async function runDay(
    mod: DayModule | Error,
    input: string | undefined,
    entry: DayEntry,
    parts: Part[],
): Promise<DayResult> {
    const every = (outcome: Outcome): DayResult => ({ outcomes: parts.map(() => outcome) })
    if (mod instanceof Error) return every({ kind: "coal", message: mod.message })
    if (mod.solve === undefined) return every({ kind: "coal", message: "the day does not export solve()" })
    if (input === undefined) return every({ kind: "no-input", path: inputPath(entry.year, entry.day) })

    const start = performance.now()
    let answers: Answers<unknown>
    try {
        answers = await mod.solve(input)
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        return every(/not implemented/i.test(message) ? { kind: "wrapped" } : { kind: "coal", message })
    }
    const ms = performance.now() - start

    const outcomes = parts.map((part): Outcome => {
        if (entry.day === 25 && part === 2) return { kind: "free" }
        const answer = answers[part - 1]
        return answer === unsolved ? { kind: "wrapped" } : { kind: "star", answer: String(answer) }
    })
    return outcomes.some((o) => o.kind === "star") ? { outcomes, ms } : { outcomes }
}

/**
 * Width of an answer column. Longer answers still print in full; they just push the rest of their row along.
 */
const answerWidth = 14
/**
 * Width of the time column: a number right-aligned on its decimal point, then the unit, e.g. " 163.60 ms".
 */
const timeWidth = 10

/**
 * Formats a day's run time for the time column, so decimal points and units line up from row to row.
 *
 * @param ms Run time in milliseconds, e.g. 163.6 or 5490.
 * @returns Exactly {@link timeWidth} characters, e.g. " 163.60 ms" or "   5.49 s ".
 */
function timeCell(ms: number): string {
    const [value, unit] = ms >= 1000 ? [ms / 1000, "s"] : [ms, "ms"]
    return `${value.toFixed(2).padStart(7)} ${unit.padEnd(2)}`
}

/**
 * Pads text to a column width before coloring it, since escape codes would throw the count off.
 * The emoji used here (🎁 🎄 🪨) are two UTF-16 units and two terminal columns wide, so `length` measures them right.
 */
const cell = (text: string, width: number, paint: (s: string) => string = (s) => s) =>
    paint(text) + " ".repeat(Math.max(0, width - text.length))

function describe(outcome: Outcome): string {
    switch (outcome.kind) {
        case "star":
            return cell(outcome.answer, answerWidth, bold)
        case "wrapped":
            return `🎁 ${cell("wrapped", answerWidth - 3, yellow)}`
        case "free":
            return `🎄 ${cell("free star", answerWidth - 3, dim)}`
        case "no-input":
            return `📜 ${cell("no input", answerWidth - 3, yellow)}`
        case "coal":
            return `🪨 ${cell("coal", answerWidth - 3, red)}`
    }
}

/**
 * The [⭐ 🪨] marks and the day label: star = solved, coal = naughty list, tree = day 25's free star.
 */
function rowStart(marks: string[], label: string): string {
    return `  ${dim("[")}${marks.join(" ")}${dim("]")} ${label}  `
}

/**
 * Spaces as wide as what {@link rowStart} prints, for lining the header up with the rows. Each mark is 2 wide.
 */
function rowStartPadding(partCount: number): string {
    const marksWidth = partCount * 2 + (partCount - 1)
    return " ".repeat("  [] Day 01  ".length + marksWidth)
}

/**
 * Column headings for a year's table, lined up with the rows that {@link dayLine} prints.
 */
function headerLine(parts: Part[]): string {
    const columns = parts.map((part) => cell(`Part ${part}`, answerWidth)).join(" ")
    return dim(rowStartPadding(parts.length) + columns + " " + "Time".padStart(timeWidth - 3))
}

/**
 * The shorter of a path relative to where the runner was started and the absolute path.
 */
function shortestPath(path: string): string {
    const near = relative(process.cwd(), path)
    return near.length < path.length ? near : path
}

/**
 * Each distinct error message among the outcomes, so one thrown by `solve` shows once rather than per part.
 */
function coalNotes(outcomes: Outcome[]): string {
    const messages = [...new Set(outcomes.flatMap((o) => (o.kind === "coal" ? [o.message] : [])))]
    return messages.length === 0 ? "" : `  ${red(messages.join("; "))}`
}

/**
 * One row per day: the marks, an answer column per chosen part, then how long `solve` took for the whole day.
 * A missing input or an error doesn't fit a column, so it goes after them.
 */
function dayLine(entry: DayEntry, { outcomes, ms }: DayResult): string {
    const marks = outcomes.map((o) => (o.kind === "star" ? "⭐" : o.kind === "free" ? "🎄" : "🪨"))
    const start = rowStart(marks, bold(`Day ${pad(entry.day)}`))

    const first = outcomes[0]
    if (first?.kind === "no-input" && outcomes.every((o) => o.kind === "no-input")) {
        return `${start}📜 ${yellow("no input yet")} ${dim(`(expected ${shortestPath(first.path)})`)}`
    }

    const columns = outcomes.map(describe).join(" ")
    const time = ms === undefined ? " ".repeat(timeWidth) : dim(timeCell(ms))
    return `${start}${columns} ${time}${coalNotes(outcomes)}`.trimEnd()
}

async function main() {
    const sel = parseSelection(process.argv.slice(2))
    if (sel.help) {
        console.log(`${banner()}\n${USAGE}`)
        return
    }

    console.log(banner())
    const entries = discover()
    if (entries.length === 0) throw new UsageError("The workshop is empty: no src/<year>/dayNN/dayNN.ts files found.")
    const targets = await choose(entries, sel)

    const counts = { star: 0, wrapped: 0, free: 0, "no-input": 0, coal: 0 }
    const start = performance.now()
    let lastYear = 0

    // Group the chosen parts by day so each day prints as a single line.
    const days = new Map<string, { entry: DayEntry; parts: Part[] }>()
    for (const { entry, part } of targets) {
        const day = days.get(entry.file) ?? { entry, parts: [] }
        day.parts.push(part)
        days.set(entry.file, day)
    }

    for (const { entry, parts } of days.values()) {
        if (entry.year !== lastYear) {
            lastYear = entry.year
            console.log(`\n${cyan(`── 🎄 ${entry.year} ${"─".repeat(30)}`)}`)
            console.log(headerLine(parts))
        }
        const mod: DayModule | Error = await import(pathToFileURL(entry.file).href).then(
            (m: DayModule) => m,
            (e: unknown) => (e instanceof Error ? e : new Error(String(e))),
        )
        const input = readInput(entry.year, entry.day)
        const result = await runDay(mod, input, entry, parts)
        for (const outcome of result.outcomes) counts[outcome.kind]++
        console.log(dayLine(entry, result))
    }

    const bits = [`⭐ ${counts.star} ${counts.star === 1 ? "star" : "stars"}`]
    if (counts.wrapped > 0) bits.push(`🎁 ${counts.wrapped} still wrapped`)
    if (counts["no-input"] > 0) bits.push(`📜 ${counts["no-input"]} missing input`)
    if (counts.coal > 0) bits.push(`🪨 ${counts.coal} coal`)
    console.log(
        `\n🎅 ${bold(green("Ho ho ho!"))} ${bits.join(dim("  ·  "))}  ${dim(`(${formatDuration(performance.now() - start)})`)}\n`,
    )
    if (counts.coal > 0) process.exitCode = 1
}

main().catch((error: unknown) => {
    if (error instanceof UsageError) {
        console.error(`\n🪨 ${red(error.message)}\n\n${USAGE}\n`)
        process.exitCode = 2
    } else {
        throw error
    }
})
