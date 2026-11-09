import {inputPath, readInput} from "../../input.ts"

/** A present, as the three dimensions of a rectangular box, all in feet. */
interface Box {
    length: number
    width: number
    height: number
}

/**
 * Extract the measurements of a box from its input string
 * @param boxInput String in the format "<length>x<width>x<height>", e.g. "2x3x4"
 * @returns Box object with the measurements
 * @throws Error if the string is not three whole numbers separated by "x"
 */
function getBoxMeasurements(boxInput: string): Box {
    const match = /^(\d+)x(\d+)x(\d+)$/.exec(boxInput.trim())
    if (match === null) {
        throw new Error(`Invalid box measurements: ${JSON.stringify(boxInput)}`)
    }
    return {length: Number(match[1]), width: Number(match[2]), height: Number(match[3])}
}

/**
 * Parse every non-blank line of the input as a box and add up the material each box needs
 * @param input One box per line, each in the format "<length>x<width>x<height>", e.g. "2x3x4"
 * @param amountFor Function giving the amount of material a single box needs (square feet of paper, feet of ribbon)
 * @returns The total amount of material needed for every box
 * @throws Error if any non-blank line is not a valid box
 */
function processInput(input: string, amountFor: (box: Box) => number): number {
    let total = 0
    for (const line of input.split("\n")) {
        if (line.trim().length > 0) {
            total += amountFor(getBoxMeasurements(line))
        }
    }
    return total
}

/**
 * Wrapping paper needed for one box: its surface area plus the area of its smallest side as slack
 * @param box The box to wrap
 * @returns Square feet of wrapping paper
 */
function wrappingPaper({length, width, height}: Box): number {
    const lw = length * width
    const wh = width * height
    const hl = height * length
    return 2 * (lw + wh + hl) + Math.min(lw, wh, hl)
}

/**
 * Ribbon needed for one box: the shortest distance around one face, plus a bow equal to the box's volume.
 * The shortest perimeter is twice the sum of the two smallest dimensions, i.e. the sum of all three less the largest.
 * @param box The box to wrap
 * @returns Feet of ribbon
 */
function ribbon({length, width, height}: Box): number {
    const perimeter = 2 * (length + width + height - Math.max(length, width, height))
    return perimeter + length * width * height
}

/**
 * Part 1: total wrapping paper for all the presents
 * @param input One box per line, each in the format "<length>x<width>x<height>", e.g. "2x3x4"
 * @returns Total square feet of wrapping paper
 */
export function part1(input: string): number {
    return processInput(input, wrappingPaper)
}

/**
 * Part 2: total ribbon for all the presents
 * @param input One box per line, each in the format "<length>x<width>x<height>", e.g. "2x3x4"
 * @returns Total feet of ribbon
 */
export function part2(input: string): number {
    return processInput(input, ribbon)
}

if (import.meta.main) {
    const input = readInput(2015, 2)
    if (input === undefined) {
        console.error(`No input found at ${inputPath(2015, 2)}`)
        process.exit(1)
    }
    console.log("part 1:", part1(input))
    console.log("part 2:", part2(input))
}
