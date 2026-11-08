import { pathToFileURL } from "node:url"
import { inputPath, readInput } from "../input.ts"
import { parseSelection, UsageError, USAGE, type Level } from "./args.ts"
import { discover, type DayEntry } from "./discover.ts"
import { select, type Choice } from "./menu.ts"
import { banner, bold, cyan, dim, formatDuration, green, red, yellow } from "./theme.ts"

type Part = 1 | 2
type Solver = (input: string) => unknown
type DayModule = { part1?: Solver; part2?: Solver }

type Outcome =
    | { kind: "star"; answer: string; ms: number }
    | { kind: "wrapped" } // not implemented yet
    | { kind: "no-input"; path: string }
    | { kind: "coal"; message: string }

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

async function runPart(
    mod: DayModule | Error,
    input: string | undefined,
    entry: DayEntry,
    part: Part,
): Promise<Outcome> {
    if (mod instanceof Error) return { kind: "coal", message: mod.message }
    const solver = mod[`part${part}`]
    if (solver === undefined) return { kind: "wrapped" }
    if (input === undefined) return { kind: "no-input", path: inputPath(entry.year, entry.day) }
    const start = performance.now()
    try {
        const answer = await solver(input)
        return { kind: "star", answer: String(answer), ms: performance.now() - start }
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        return /not implemented/i.test(message) ? { kind: "wrapped" } : { kind: "coal", message }
    }
}

function describe(outcome: Outcome): string {
    switch (outcome.kind) {
        case "star":
            return `${bold(outcome.answer)} ${dim(`(${formatDuration(outcome.ms)})`)}`
        case "wrapped":
            return `🎁 ${yellow("still wrapped")}`
        case "no-input":
            return `📜 ${yellow("no input")}`
        case "coal":
            return `${red("coal:")} ${outcome.message}`
    }
}

/** One line per day: [⭐ 🪨] marks for each part (star = solved, coal = naughty list), then the details. */
function dayLine(entry: DayEntry, parts: Part[], outcomes: Outcome[]): string {
    const marks = outcomes.map((o) => (o.kind === "star" ? "⭐" : "🪨")).join(" ")
    const first = outcomes[0]
    const details =
        first?.kind === "no-input" && outcomes.every((o) => o.kind === "no-input")
            ? `📜 ${yellow("no input yet")} ${dim(`(expected ${first.path})`)}`
            : outcomes.map((o, i) => `Part ${parts[i]}: ${describe(o)}`).join(dim("  ·  "))
    return `  ${dim("[")}${marks}${dim("]")} ${bold(`Day ${pad(entry.day)}`)} ${dim("·")} ${details}`
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

    const counts = { star: 0, wrapped: 0, "no-input": 0, coal: 0 }
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
        }
        const mod: DayModule | Error = await import(pathToFileURL(entry.file).href).then(
            (m: DayModule) => m,
            (e: unknown) => (e instanceof Error ? e : new Error(String(e))),
        )
        const input = readInput(entry.year, entry.day)
        const outcomes: Outcome[] = []
        for (const part of parts) outcomes.push(await runPart(mod, input, entry, part))
        for (const outcome of outcomes) counts[outcome.kind]++
        console.log(dayLine(entry, parts, outcomes))
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
