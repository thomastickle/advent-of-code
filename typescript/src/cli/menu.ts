import { emitKeypressEvents } from "node:readline"
import { UsageError } from "./args.ts"
import { bold, cyan, dim, green, yellow } from "./theme.ts"

export interface Choice<T> {
    label: string
    value: T
}

interface Key {
    name?: string | undefined
    ctrl?: boolean | undefined
}

/** Arrow-key (or j/k) menu. Enter picks, q/Esc/Ctrl-C turns the sleigh around. */
export async function select<T>(title: string, choices: Choice<T>[]): Promise<T> {
    const { stdin, stdout } = process
    if (!stdin.isTTY) {
        throw new UsageError(
            'The menu needs an interactive terminal. Pass --year, --day and --part (or "all") instead.',
        )
    }

    const height = choices.length + 1
    let index = 0
    let drawn = false

    const draw = () => {
        if (drawn) stdout.write(`\u001b[${height}A`)
        drawn = true
        stdout.write(`\u001b[2K${bold(yellow("🎄 " + title))}  ${dim("(↑/↓ then enter)")}\n`)
        choices.forEach((choice, i) => {
            stdout.write(`\u001b[2K${i === index ? cyan(`  ❯ ${choice.label}`) : `    ${choice.label}`}\n`)
        })
    }

    emitKeypressEvents(stdin)
    stdin.setRawMode(true)
    stdin.resume()
    stdout.write("\u001b[?25l")
    draw()

    try {
        return await new Promise<T>((resolve) => {
            const onKey = (_text: string | undefined, key: Key | undefined) => {
                const name = key?.name
                if (name === "up" || name === "k") index = (index - 1 + choices.length) % choices.length
                else if (name === "down" || name === "j") index = (index + 1) % choices.length
                else if (name === "return") {
                    stdin.off("keypress", onKey)
                    resolve(choices[index]!.value)
                    return
                } else if (name === "escape" || name === "q" || (key?.ctrl === true && name === "c")) {
                    stdout.write(
                        `\u001b[${height}A\u001b[J\u001b[?25h${dim("🛷 Back to the North Pole. Merry Christmas!")}\n`,
                    )
                    process.exit(130)
                }
                draw()
            }
            stdin.on("keypress", onKey)
        })
    } finally {
        stdin.setRawMode(false)
        stdin.pause()
        stdout.write(`\u001b[${height}A\u001b[J\u001b[?25h${green("✔")} ${title} ${bold(choices[index]!.label)}\n`)
    }
}
