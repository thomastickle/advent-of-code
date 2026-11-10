import {inputPath, readInput} from "../../input.ts"

/** 2015 day 6: Probably a Fire Hazard. https://adventofcode.com/2015/day/6 */

/** The grid is GRID_SIZE lights wide and tall. Coordinates run from 0 to 999, so they have at most three digits. */
const GRID_SIZE = 1000

/** One instruction, e.g. "turn on 0,0 through 999,999". The pieces are joined by a single whitespace character. */
const commandPattern = new RegExp(
    [
        "^(?<action>turn off|turn on|toggle)",
        "(?<x1>\\d{1,3}),(?<y1>\\d{1,3})",
        "through",
        "(?<x2>\\d{1,3}),(?<y2>\\d{1,3})$",
    ].join("\\s"),
)

type LightAction = "turn on" | "turn off" | "toggle"

interface Range {
    start: number
    end: number
}

interface LightCommand {
    action: LightAction
    xRange: Range
    yRange: Range
}

/**
 * Parse one line of the puzzle input into an action and the rectangle of lights it covers
 * @param line One instruction, "<action> <x1>,<y1> through <x2>,<y2>", e.g. "turn off 499,499 through 500,500".
 * The action is "turn on", "turn off" or "toggle", and the corners are inclusive, with the smaller values first.
 * @returns The action, the x range (first number of each corner) and the y range (second number of each corner)
 * @throws Error if the line doesn't match that format, or a range runs backwards
 */
export function parseCommand(line: string): LightCommand {
    const match = commandPattern.exec(line)

    if (!match?.groups) {
        throw new Error(`Invalid line: ${line}`)
    }

    const {action, x1, y1, x2, y2} = match.groups
    const xRange = {start: Number(x1), end: Number(x2)}
    const yRange = {start: Number(y1), end: Number(y2)}

    if (xRange.start > xRange.end || yRange.start > yRange.end) {
        throw new Error(`Invalid line: ${line}`)
    }

    return {action: action as LightAction, xRange, yRange}
}

/**
 * Part 1 rules: set each light in the command's rectangle on (1) or off (0), or flip it
 * The action is checked once per column, outside the innermost loop. Choosing the rule per light with a function
 * argument measured about four times slower, because the engine can't inline a call that has many possible targets.
 * @param lights The grid as one flat array, row-major: the light at (x, y) is lights[x * GRID_SIZE + y]. Each light is
 * 0 or 1. Changed in place.
 * @param command The command to apply
 */
function applyOnOff(lights: Int32Array, command: LightCommand): void {
    const {action, xRange, yRange} = command
    for (let x = xRange.start; x <= xRange.end; x++) {
        const first = x * GRID_SIZE + yRange.start
        const last = x * GRID_SIZE + yRange.end
        switch (action) {
            case "turn on":
                lights.fill(1, first, last + 1)
                break
            case "turn off":
                lights.fill(0, first, last + 1)
                break
            case "toggle":
                for (let i = first; i <= last; i++) {
                    lights[i] = 1 - lights[i]!
                }
                break
        }
    }
}

/**
 * Part 2 rules: turn on adds 1 to each light's brightness in the rectangle, turn off subtracts 1 (to a minimum of 0)
 * and toggle adds 2. The action is checked once per column, as in applyOnOff.
 * @param lights The grid as one flat array, row-major: the light at (x, y) is lights[x * GRID_SIZE + y]. Each is a
 * brightness of 0 or more. Changed in place.
 * @param command The command to apply
 */
function applyBrightness(lights: Int32Array, command: LightCommand): void {
    const {action, xRange, yRange} = command
    for (let x = xRange.start; x <= xRange.end; x++) {
        const first = x * GRID_SIZE + yRange.start
        const last = x * GRID_SIZE + yRange.end
        switch (action) {
            case "turn on":
                for (let i = first; i <= last; i++) {
                    lights[i]! += 1
                }
                break
            case "turn off":
                for (let i = first; i <= last; i++) {
                    lights[i] = Math.max(0, lights[i]! - 1)
                }
                break
            case "toggle":
                for (let i = first; i <= last; i++) {
                    lights[i]! += 2
                }
                break
        }
    }
}

/**
 * Follow every instruction on a grid that starts all zero, then add up the lights
 * An Int32Array is one block of memory, which is quicker to fill and sum than 1000 separate arrays.
 * @param input The puzzle input, one instruction per line, e.g. "turn on 0,0 through 999,999"
 * @param apply How one command changes the grid (the rules of the part being solved)
 * @returns The sum of all the lights' values: the number lit for part 1, the total brightness for part 2
 * @throws Error if a line isn't a valid instruction
 */
function runCommands(input: string, apply: (lights: Int32Array, command: LightCommand) => void): number {
    const lights = new Int32Array(GRID_SIZE * GRID_SIZE)
    for (const command of input.split("\n").map(parseCommand)) {
        apply(lights, command)
    }

    let total = 0
    for (let i = 0; i < lights.length; i++) {
        total += lights[i]!
    }
    return total
}

/**
 * Part 1: how many lights are lit after the instructions, where turn on, turn off and toggle mean what they say
 * @param input The puzzle input, one instruction per line, e.g. "turn on 0,0 through 999,999"
 * @returns The number of lit lights
 */
export function part1(input: string): number {
    return runCommands(input, applyOnOff)
}

/**
 * Part 2: the total brightness after the instructions, where turn on adds 1, turn off subtracts 1 (to a minimum of 0)
 * and toggle adds 2
 * @param input The puzzle input, one instruction per line, e.g. "toggle 0,0 through 999,999"
 * @returns The sum of every light's brightness
 */
export function part2(input: string): number {
    return runCommands(input, applyBrightness)
}

if (import.meta.main) {
    const input = readInput(2015, 6)
    if (input === undefined) {
        console.error(`No input found at ${inputPath(2015, 6)}`)
        process.exit(1)
    }
    console.log("part 1:", part1(input))
    console.log("part 2:", part2(input))
}
