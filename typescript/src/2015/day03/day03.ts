import {inputPath, readInput} from "../../input.ts"

/** 2015 day 3: Perfectly Spherical Houses in a Vacuum. https://adventofcode.com/2015/day/3 */

/** A house on the infinite grid of houses; x grows to the east, y grows to the north. */
interface Position {
    x: number
    y: number
}

/** How each instruction character moves a walker: [change in x, change in y]. */
const moves: Record<string, readonly [number, number]> = {
    "^": [0, 1],
    v: [0, -1],
    "<": [-1, 0],
    ">": [1, 0],
}

/**
 * Collapse a position into a single number so it can be stored in a Set of visited houses.
 * A number is much cheaper to hash than a string such as "3,-4", which is what makes this fast.
 * The key is unique as long as |y| stays below 50,000. A walker moves one house per instruction, so that holds for
 * any input shorter than 50,000 characters (the real input is about 8,000). A longer input would need a larger factor.
 * @param position The house to build a key for
 * @returns A number that identifies the house: x * 100000 + y
 */
function convertToKey(position: Position): number {
    return position.x * 100000 + position.y
}

/**
 * Move one house in the direction of an instruction
 * @param position Where the walker is now
 * @param direction One instruction character: "^" north, "v" south, "<" west or ">" east
 * @returns The house the walker ends up at; the position passed in is not modified
 * @throws Error if the character is not one of the four directions
 */
function nextPosition(position: Position, direction: string): Position {
    const move = moves[direction]
    if (move === undefined) {
        throw new Error(`Invalid direction: ${JSON.stringify(direction)}`)
    }
    return {x: position.x + move[0], y: position.y + move[1]}
}

/**
 * Deliver presents with several walkers who take turns following the instructions, and count the houses visited
 * @param input The instructions, a string of "^", "v", "<" and ">" characters, e.g. "^>v<"
 * @param walkers How many walkers share the instructions; instruction i is followed by walker i % walkers
 * @returns The number of houses that get at least one present; every walker starts at, and delivers to, the first house
 * @throws Error if the input contains a character that is not a direction
 */
function countHouses(input: string, walkers: number): number {
    const start: Position = {x: 0, y: 0}
    const positions: Position[] = Array.from({length: walkers}, () => start)
    const housesVisited = new Set<number>([convertToKey(start)])

    for (let i = 0; i < input.length; i++) {
        const walker = i % walkers
        const position = nextPosition(positions[walker]!, input[i]!)
        positions[walker] = position
        housesVisited.add(convertToKey(position))
    }

    return housesVisited.size
}

/**
 * Part 1: houses that Santa alone delivers to
 * @param input The instructions, a string of "^", "v", "<" and ">" characters, e.g. "^>v<"
 * @returns The number of houses that get at least one present
 */
export function part1(input: string): number {
    return countHouses(input, 1)
}

/**
 * Part 2: houses that Santa and Robo-Santa deliver to, taking turns
 * @param input The instructions, a string of "^", "v", "<" and ">" characters, e.g. "^>v<"
 * @returns The number of houses that get at least one present
 */
export function part2(input: string): number {
    return countHouses(input, 2)
}

if (import.meta.main) {
    const input = readInput(2015, 3)
    if (input === undefined) {
        console.error(`No input found at ${inputPath(2015, 3)}`)
        process.exit(1)
    }
    console.log("part 1:", part1(input))
    console.log("part 2:", part2(input))
}
