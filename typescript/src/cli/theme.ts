const useColor = process.stdout.isTTY === true && process.env["NO_COLOR"] === undefined

const paint = (open: number, close: number) => (text: string) =>
    useColor ? `\u001b[${open}m${text}\u001b[${close}m` : text

export const red = paint(31, 39)
export const green = paint(32, 39)
export const yellow = paint(33, 39)
export const cyan = paint(36, 39)
export const bold = paint(1, 22)
export const dim = paint(2, 22)

const tree = [
    "      ★",
    "     /●\\",
    "    /_●_\\",
    "   /●___●\\",
    "  /__●_●__\\",
    " /●_______●\\",
    "/___●___●___\\",
    "     |||",
]

export function banner(): string {
    const ornaments = [red, yellow, cyan]
    let n = 0
    const lines = tree.map((row, i) =>
        i === tree.length - 1
            ? yellow(row)
            : [...row]
                  .map((ch) =>
                      ch === "★" ? bold(yellow(ch)) : ch === "●" ? ornaments[n++ % ornaments.length]!(ch) : green(ch),
                  )
                  .join(""),
    )
    const title = `${cyan("❄")}  ${bold("Advent of Code")} ${dim("·")} ${green("TypeScript")}  ${cyan("❄")}`
    return `\n${lines.map((l) => `    ${l}`).join("\n")}\n\n    ${title}\n`
}

export function formatDuration(ms: number): string {
    if (ms >= 1000) return `${(ms / 1000).toFixed(2)} s`
    return `${ms.toFixed(ms < 10 ? 2 : 1)} ms`
}
