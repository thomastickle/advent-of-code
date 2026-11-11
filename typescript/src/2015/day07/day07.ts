/** 2015 day 7: Some Assembly Required. https://adventofcode.com/2015/day/7 */
import {inputPath, readInput} from "../../input.ts"
import {Circuit} from "./circuit_operators.ts"

/**
 * Evaluates the requested wire in the circuit described by the input.
 * @param input Circuit instructions, one per line, e.g. "123 -> x\nx AND 1 -> a".
 * @param wire Output wire name, e.g. "a".
 * @returns The requested wire's signal value.
 * @throws {Error} If the requested wire or one of its referenced wires is undefined.
 */
export function part1(input: string, wire = "a"): number {
    return Circuit.fromInput(input).evaluate(wire)
}

/**
 * Overrides wire b with the initial signal on wire a, resets all other wires, and evaluates wire a again.
 * @param input Circuit instructions, one per line, e.g. "123 -> x\nx AND 1 -> a".
 * @returns The new signal value on wire a.
 * @throws {Error} If wire a or any referenced wire is undefined.
 */
export function part2(input: string): number {
    const circuit = Circuit.fromInput(input)
    const a = circuit.evaluate("a")
    circuit.set("b", {evaluate: () => a})
    return circuit.evaluate("a")
}

if (import.meta.main) {
    const input = readInput(2015, 7)
    if (input === undefined) {
        console.error(`No input found at ${inputPath(2015, 7)}`)
        process.exit(1)
    }
    console.log("part 1:", part1(input))
    console.log("part 2:", part2(input))
}
