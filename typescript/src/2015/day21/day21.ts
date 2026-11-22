import {printAnswers, unsolved, type Answers} from "../../answers.ts"

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

/**
 * Solves both parts. Return {@link unsolved} for a part that isn't done yet.
 *
 * @param input The boss stats, one per line, e.g. "Hit Points: 104".
 * @returns [part 1 answer, part 2 answer].
 */
export function solve(input: string): Answers<number> {
    return [unsolved, unsolved]
}

if (import.meta.main) {
    printAnswers(2015, 21, solve)
}
