/*
 * 2015 day 22: Wizard Simulator 20XX. https://adventofcode.com/2015/day/22
 */

import {printAnswers, unsolved, type Answers} from "../../answers.ts"

export type Spell = "Magic Missile" | "Drain" | "Shield" | "Poison" | "Recharge"

export interface Player {
    hitPoints: number
    mana: number
}

export interface Boss {
    hitPoints: number
    damage: number
}

/**
 * Does casting these spells in order kill the boss before the player dies or runs out of mana?
 */
export function playerWins(player: Player, boss: Boss, spells: Spell[]): boolean {
    throw new Error("not implemented")
}

/**
 * Solves both parts. Return {@link unsolved} for a part that isn't done yet.
 *
 * @param input The boss stats, one per line, e.g. "Hit Points: 51".
 * @returns [part 1 answer, part 2 answer].
 */
export function solve(input: string): Answers<number> {
    return [unsolved, unsolved]
}

if (import.meta.main) {
    printAnswers(2015, 22, solve)
}
