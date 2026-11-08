import {inputPath, readInput} from "../../input.ts"

/** 2015 day 21: RPG Simulator 20XX. https://adventofcode.com/2015/day/21 */

export interface Combatant {
    hitPoints: number
    damage: number
    armor: number
}

/** Does the player beat the boss? The player attacks first. */
export function playerWins(player: Combatant, boss: Combatant): boolean {
    throw new Error("not implemented")
}

export function part1(input: string): number {
    throw new Error("not implemented")
}

export function part2(input: string): number {
    throw new Error("not implemented")
}

if (import.meta.main) {
    const input = readInput(2015, 21)
    if (input === undefined) {
        console.error(`No input found at ${inputPath(2015, 21)}`)
        process.exit(1)
    }
    console.log("part 1:", part1(input))
    console.log("part 2:", part2(input))
}
