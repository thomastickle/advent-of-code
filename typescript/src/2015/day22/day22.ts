import {inputPath, readInput} from "../../input.ts"

/** 2015 day 22: Wizard Simulator 20XX. https://adventofcode.com/2015/day/22 */

export type Spell = "Magic Missile" | "Drain" | "Shield" | "Poison" | "Recharge"

export interface Player {
    hitPoints: number
    mana: number
}

export interface Boss {
    hitPoints: number
    damage: number
}

/** Does casting these spells in order kill the boss before the player dies or runs out of mana? */
export function playerWins(player: Player, boss: Boss, spells: Spell[]): boolean {
    throw new Error("not implemented")
}

export function part1(input: string): number {
    throw new Error("not implemented")
}

export function part2(input: string): number {
    throw new Error("not implemented")
}

if (import.meta.main) {
    const input = readInput(2015, 22)
    if (input === undefined) {
        console.error(`No input found at ${inputPath(2015, 22)}`)
        process.exit(1)
    }
    console.log("part 1:", part1(input))
    console.log("part 2:", part2(input))
}
