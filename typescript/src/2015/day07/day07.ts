/** 2015 day 7: Some Assembly Required. https://adventofcode.com/2015/day/7 */
import {printAnswers, type Answers} from "../../answers.ts"
import {Circuit} from "./circuit_operators.ts"

/**
 * Solves both parts from one circuit: evaluates wire a, then feeds that signal into wire b, resets all other wires,
 * and evaluates wire a again. Part 2 needs part 1's signal anyway, so it is read off on the way.
 *
 * @param input Circuit instructions, one per line, e.g. "123 -> x\nx AND 1 -> a".
 * @returns [signal on wire a, signal on wire a after overriding wire b with it].
 * @throws {Error} If wire a or any referenced wire is undefined.
 */
export function solve(input: string): Answers<number> {
    const circuit = Circuit.fromInput(input)
    const before = circuit.evaluate("a")
    circuit.set("b", {evaluate: () => before})
    return [before, circuit.evaluate("a")]
}

if (import.meta.main) {
    printAnswers(2015, 7, solve)
}
