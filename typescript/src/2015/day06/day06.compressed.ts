import {parseCommand} from "./day06.ts"

/**
 * 2015 day 6, solved a second way so the two can be compared: coordinate compression.
 *
 * Every command's rectangle starts and ends on a cut point (x1 and x2 + 1 on one axis, y1 and y2 + 1 on the other).
 * All the lights between two neighboring cuts get exactly the same commands, so they always hold the same value.
 * Instead of 1,000,000 lights this tracks one cell per block, which is about a fifth of the cells for a real input,
 * and weights each cell by the area of its block when adding up. The grid version in day06.ts is the reference; the
 * tests check this one against it.
 */

/** The grid is GRID_SIZE lights wide and tall. */
const GRID_SIZE = 1000

/** The cut points along one axis, and a way to look up which block a coordinate starts. */
interface Axis {
    /** Sorted distinct cut points, from 0 to GRID_SIZE. Block i runs from points[i] to just before points[i + 1]. */
    points: number[]
    /** For a coordinate that is a cut point, the index of the block that starts there. Other entries are unused. */
    blockStartingAt: Int32Array
}

/**
 * Build the cut points for one axis
 * @param cuts The coordinates where a command starts, or one past where it ends, e.g. [0, 1000, 499, 501]
 * @returns The sorted distinct cuts (always including 0 and GRID_SIZE) and a lookup from a cut to its block
 */
function buildAxis(cuts: number[]): Axis {
    const points = [...new Set([0, GRID_SIZE, ...cuts])].sort((a, b) => a - b)
    const blockStartingAt = new Int32Array(GRID_SIZE + 1)
    points.forEach((point, block) => {
        blockStartingAt[point] = block
    })
    return {points, blockStartingAt}
}

/**
 * Follow every instruction on the compressed grid, then add up the lights
 * @param input The puzzle input, one instruction per line, e.g. "turn on 0,0 through 999,999"
 * @param part 1 for on/off lights, 2 for brightness (turn on +1, turn off -1 to a minimum of 0, toggle +2)
 * @returns The number of lit lights (part 1) or the total brightness (part 2)
 * @throws Error if a line isn't a valid instruction
 */
function run(input: string, part: 1 | 2): number {
    const commands = input.split("\n").map(parseCommand)
    const xAxis = buildAxis(commands.flatMap((command) => [command.xRange.start, command.xRange.end + 1]))
    const yAxis = buildAxis(commands.flatMap((command) => [command.yRange.start, command.yRange.end + 1]))
    const rows = yAxis.points.length - 1
    // One cell per block, row-major: the block at (xBlock, yBlock) is cells[xBlock * rows + yBlock].
    const cells = new Int32Array((xAxis.points.length - 1) * rows)

    for (const {action, xRange, yRange} of commands) {
        const xFirst = xAxis.blockStartingAt[xRange.start]!
        const xEnd = xAxis.blockStartingAt[xRange.end + 1]!
        const yFirst = yAxis.blockStartingAt[yRange.start]!
        const yEnd = yAxis.blockStartingAt[yRange.end + 1]!
        for (let xBlock = xFirst; xBlock < xEnd; xBlock++) {
            const first = xBlock * rows + yFirst
            const last = xBlock * rows + yEnd - 1
            if (part === 1) {
                applyOnOff(cells, action, first, last)
            } else {
                applyBrightness(cells, action, first, last)
            }
        }
    }

    let total = 0
    for (let xBlock = 0; xBlock < xAxis.points.length - 1; xBlock++) {
        const width = xAxis.points[xBlock + 1]! - xAxis.points[xBlock]!
        for (let yBlock = 0; yBlock < rows; yBlock++) {
            const height = yAxis.points[yBlock + 1]! - yAxis.points[yBlock]!
            total += cells[xBlock * rows + yBlock]! * width * height
        }
    }
    return total
}

/**
 * Part 1 rules on a run of cells: set them on (1) or off (0), or flip them
 * @param cells The compressed grid; changed in place
 * @param action The action of the command: "turn on", "turn off" or "toggle"
 * @param first Index of the first cell in the run
 * @param last Index of the last cell in the run (inclusive)
 */
function applyOnOff(cells: Int32Array, action: string, first: number, last: number): void {
    if (action === "turn on") {
        cells.fill(1, first, last + 1)
    } else if (action === "turn off") {
        cells.fill(0, first, last + 1)
    } else {
        for (let i = first; i <= last; i++) {
            cells[i] = 1 - cells[i]!
        }
    }
}

/**
 * Part 2 rules on a run of cells: turn on adds 1, turn off subtracts 1 (to a minimum of 0), toggle adds 2
 * @param cells The compressed grid; changed in place
 * @param action The action of the command: "turn on", "turn off" or "toggle"
 * @param first Index of the first cell in the run
 * @param last Index of the last cell in the run (inclusive)
 */
function applyBrightness(cells: Int32Array, action: string, first: number, last: number): void {
    if (action === "turn on") {
        for (let i = first; i <= last; i++) {
            cells[i]! += 1
        }
    } else if (action === "turn off") {
        for (let i = first; i <= last; i++) {
            cells[i] = Math.max(0, cells[i]! - 1)
        }
    } else {
        for (let i = first; i <= last; i++) {
            cells[i]! += 2
        }
    }
}

/**
 * Part 1 with coordinate compression: how many lights are lit after the instructions
 * @param input The puzzle input, one instruction per line, e.g. "turn on 0,0 through 999,999"
 * @returns The number of lit lights
 */
export function part1(input: string): number {
    return run(input, 1)
}

/**
 * Part 2 with coordinate compression: the total brightness after the instructions
 * @param input The puzzle input, one instruction per line, e.g. "toggle 0,0 through 999,999"
 * @returns The sum of every light's brightness
 */
export function part2(input: string): number {
    return run(input, 2)
}
