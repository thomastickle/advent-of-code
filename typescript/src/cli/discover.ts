import { existsSync, readdirSync } from "node:fs"
import { join, resolve } from "node:path"

export interface DayEntry {
    year: number
    day: number
    file: string
}

const srcDir = resolve(import.meta.dirname, "..")

/** Finds every src/<year>/dayNN/dayNN.ts so new days show up without registering them. */
export function discover(root = srcDir): DayEntry[] {
    const entries: DayEntry[] = []
    for (const yearDir of readdirSync(root, { withFileTypes: true })) {
        if (!yearDir.isDirectory() || !/^\d{4}$/.test(yearDir.name)) continue
        for (const dayDir of readdirSync(join(root, yearDir.name), { withFileTypes: true })) {
            const match = /^day(\d{2})$/.exec(dayDir.name)
            if (!dayDir.isDirectory() || match === null) continue
            const file = join(root, yearDir.name, dayDir.name, `${dayDir.name}.ts`)
            if (existsSync(file)) entries.push({ year: Number(yearDir.name), day: Number(match[1]), file })
        }
    }
    return entries.sort((a, b) => a.year - b.year || a.day - b.day)
}
