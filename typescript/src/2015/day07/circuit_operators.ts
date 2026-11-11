/** A signal is an unsigned integer this many bits wide. */
const SIGNAL_BITS = 16

/**
 * The largest signal, 65535. JavaScript's bitwise operators work on signed 32-bit integers instead of 16-bit unsigned
 * ones, so `~5` is -6 and `1 << 16` is 65536. ANDing with this mask keeps only the low 16 bits, which turns either
 * result back into a valid signal: `~5 & SIGNAL_MASK` is 65530 and `(1 << 16) & SIGNAL_MASK` is 0.
 */
const SIGNAL_MASK = (1 << SIGNAL_BITS) - 1

/** What a two-input gate computes from its two signals. */
type BinaryOperator = (left: number, right: number) => number

/**
 * The two-input gates, by the name used in the instructions. JavaScript can't store an operator such as `&` in a
 * variable, so each entry is a function that applies it. Both shifts return 0 for a count of 16 or more, because
 * JavaScript takes shift counts modulo 32 (`1 << 32` is 1) and a 16-bit signal shifted that far is empty.
 */
const BINARY_OPERATORS: Record<string, BinaryOperator> = {
    AND: (left, right) => left & right,
    OR: (left, right) => left | right,
    LSHIFT: (left, right) => right >= SIGNAL_BITS ? 0 : (left << right) & SIGNAL_MASK,
    RSHIFT: (left, right) => right >= SIGNAL_BITS ? 0 : left >> right,
}

/** Something that drives a wire: a number or another wire, or a gate. */
export interface Operation {
    /**
     * The names of the wires this operation reads, e.g. ["x", "y"] for "x AND y -> d". The circuit uses them to look
     * for cycles before evaluating anything. Leave it out if the operation reads no wires.
     */
    readonly inputs?: readonly string[]

    /**
     * Evaluates this operation using the circuit that owns its output wire.
     * @param circuit Circuit whose wires supply this operation's inputs.
     * @returns The signal value produced by this operation, from 0 to 65535.
     */
    evaluate(circuit: Circuit): number
}

/** A number as written in an instruction, as opposed to a wire name. */
const NUMBER_PATTERN = /^\d+$/

/**
 * Picks the wire names out of a list of instruction inputs, leaving out the numbers.
 * @param texts Inputs as written in an instruction, each a number or a wire name, e.g. ["x", "2"].
 * @returns The ones that name wires, e.g. ["x"].
 */
function wiresIn(...texts: string[]): string[] {
    return texts.filter((text) => !NUMBER_PATTERN.test(text))
}

/**
 * An input to an operation: given the circuit, it produces a signal. A number written in the instruction ignores the
 * circuit and a wire name looks the wire up in it. Operations only ever call it, so any input of any gate can be
 * either kind.
 */
type Operand = (circuit: Circuit) => number

/**
 * Reads one input of an instruction, once, when the circuit is built.
 * @param text A number or wire name, e.g. "123" or "x".
 * @param line The whole instruction, used for error messages, e.g. "1 AND x -> a".
 * @returns An operand that gives the number, or the wire's signal. A missing wire reports the instruction.
 * @throws {Error} If the text is a number larger than 65535.
 */
function parseOperand(text: string, line: string): Operand {
    if (NUMBER_PATTERN.test(text)) {
        const value = Number(text)
        if (value > SIGNAL_MASK) {
            throw new Error(`Signal ${text} is out of range (0 to ${SIGNAL_MASK}): ${line}`)
        }
        return () => value
    }

    return (circuit) => circuit.evaluate(text, line)
}

/**
 * Builds a circuit from instructions and memoizes successful signals until the circuit changes.
 * Without the memoization a wire that feeds many gates would be recomputed once per path to it, which fans out
 * exponentially on a real input.
 * Every wire is treated as a pure function of its inputs, so each has one steady value. That only holds when nothing
 * feeds back. A signal that depends on itself, through any number of gates, also depends on propagation delay and on
 * what happened earlier: a latch can settle either way, and `NOT a -> a` never settles. Simulating that needs
 * time (ticks or per-gate delays), a starting state and a model of short pulses fading out, none of which this has.
 * So before the first evaluation after any change, the whole circuit is checked for cycles and one is reported as an
 * error.
 */
export class Circuit {
    private readonly operations = new Map<string, Operation>()
    private readonly evaluatedWires = new Map<string, number>()
    private checkedForCycles = false

    /**
     * Builds a circuit from its gate instructions.
     * @param input Circuit instructions, one per line, e.g. "123 -> x\nx AND 1 -> a".
     * @returns The circuit described by the instructions.
     * @throws {Error} If a line is not a valid instruction, or a number in it is larger than 65535.
     */
    static fromInput(input: string): Circuit {
        const circuit = new Circuit()

        for (const line of input.split("\n")) {
            const wireMatch = Wire.WIRE_PATTERN.exec(line)
            if (wireMatch) {
                const wireOperation = new Wire(line, wireMatch)
                circuit.set(wireOperation.output, wireOperation)
                continue
            }

            const binaryMatch = BinaryGate.BINARY_PATTERN.exec(line)
            if (binaryMatch) {
                const binaryOperation = new BinaryGate(line, binaryMatch)
                circuit.set(binaryOperation.output, binaryOperation)
                continue
            }

            const notMatch = Not.NOT_PATTERN.exec(line)
            if (notMatch) {
                const notOperation = new Not(line, notMatch)
                circuit.set(notOperation.output, notOperation)
                continue
            }

            throw new Error(`Invalid line: ${line}`)
        }

        return circuit
    }

    /**
     * Adds or replaces the operation that produces a wire. Clears the memoized signals, because any of them might
     * depend on the wire that changed.
     * @param wire Output wire name, e.g. "a".
     * @param operation Operation that produces the wire's signal.
     */
    set(wire: string, operation: Operation): void {
        this.operations.set(wire, operation)
        this.evaluatedWires.clear()
        this.checkedForCycles = false
    }

    /**
     * Walks every wire's inputs depth-first and fails if any wire depends on itself, directly or through other wires.
     * A wire that is read but not defined is skipped here; evaluating it reports it as missing.
     * @throws {Error} If there is a cycle, naming the wires around it, e.g. "Circuit has a cycle: a -> b -> a". Each
     * arrow goes from a wire to one of its inputs.
     */
    private assertAcyclic(): void {
        const status = new Map<string, "visiting" | "done">()
        const path: string[] = []

        const visit = (wire: string): void => {
            if (status.get(wire) === "done") {
                return
            }
            if (status.get(wire) === "visiting") {
                const cycle = [...path.slice(path.indexOf(wire)), wire]
                throw new Error(`Circuit has a cycle: ${cycle.join(" -> ")}`)
            }

            status.set(wire, "visiting")
            path.push(wire)
            for (const input of this.operations.get(wire)?.inputs ?? []) {
                visit(input)
            }
            path.pop()
            status.set(wire, "done")
        }

        for (const wire of this.operations.keys()) {
            visit(wire)
        }
    }

    /**
     * Evaluates a wire once for the current circuit mapping. The first call after the circuit changes also checks the
     * whole circuit for cycles, whichever wire is asked for.
     * @param wire Output wire name, e.g. "a".
     * @param instruction Gate instruction for missing-wire error context, e.g. "1 AND x -> a".
     * @returns The wire's signal value, from 0 to 65535.
     * @throws {Error} If the wire is not defined in the circuit, or the circuit has a cycle.
     */
    evaluate(wire: string, instruction?: string): number {
        if (!this.checkedForCycles) {
            this.assertAcyclic()
            this.checkedForCycles = true
        }

        if (this.evaluatedWires.has(wire)) {
            return this.evaluatedWires.get(wire)!
        }

        const operation = this.operations.get(wire)
        if (!operation) {
            const context = instruction === undefined ? "" : `. ${instruction}`
            throw new Error(`Wire ${wire} not found${context}`)
        }

        const value = operation.evaluate(this)
        this.evaluatedWires.set(wire, value)
        return value
    }
}

/** Sets a wire to a number or to a copy of another wire's signal, e.g. "123 -> x" or "lx -> a". */
export class Wire implements Operation {
    static readonly WIRE_PATTERN = /^(\w+) -> (\w+)$/
    private readonly input: Operand
    readonly inputs: readonly string[]
    readonly output: string

    /**
     * @param line The whole instruction, used in error messages, e.g. "lx -> a".
     * @param match The result of WIRE_PATTERN on the instruction: [whole line, number or input wire, output wire].
     * @throws {Error} If the input is a number larger than 65535.
     */
    constructor(line: string, match: string[]) {
        this.input = parseOperand(match[1]!, line)
        this.inputs = wiresIn(match[1]!)
        this.output = match[2]!
    }

    /**
     * Evaluates the assignment.
     * @param circuit Circuit used to resolve the input if it is a wire, e.g. one built from "1 -> x".
     * @returns The number, or the input wire's signal value.
     * @throws {Error} If the input names a wire that is not in the circuit.
     */
    evaluate(circuit: Circuit): number {
        return this.input(circuit)
    }
}

/** A gate with two inputs: AND, OR, LSHIFT or RSHIFT, e.g. "x AND y -> d" or "x LSHIFT 2 -> f". */
export class BinaryGate implements Operation {
    /** Built from the table of operators, so adding an operator there makes it parse here. */
    static readonly BINARY_PATTERN = new RegExp(
        `^(\\w+) (${Object.keys(BINARY_OPERATORS).join("|")}) (\\w+) -> (\\w+)$`,
    )
    private readonly left: Operand
    private readonly apply: BinaryOperator
    private readonly right: Operand
    readonly inputs: readonly string[]
    readonly output: string

    /**
     * @param line The whole instruction, used in error messages, e.g. "x LSHIFT 2 -> f".
     * @param match The result of BINARY_PATTERN on the instruction: [whole line, left input, operator name, right
     * input, output wire]. Each input is a number or a wire name.
     * @throws {Error} If an input is a number larger than 65535.
     */
    constructor(line: string, match: string[]) {
        this.left = parseOperand(match[1]!, line)
        this.apply = BINARY_OPERATORS[match[2]!]!
        this.right = parseOperand(match[3]!, line)
        this.inputs = wiresIn(match[1]!, match[3]!)
        this.output = match[4]!
    }

    /**
     * Evaluates the gate.
     * @param circuit Circuit used to resolve wire inputs, e.g. one built from "1 -> x".
     * @returns The operator applied to the two signals, as a 16-bit signal value.
     * @throws {Error} If an input names a wire that is not in the circuit.
     */
    evaluate(circuit: Circuit): number {
        return this.apply(this.left(circuit), this.right(circuit))
    }
}

/** Bitwise complement of an input within 16 bits, e.g. "NOT x -> h". */
export class Not implements Operation {
    static readonly NOT_PATTERN = /^NOT (\w+) -> (\w+)$/
    private readonly input: Operand
    readonly inputs: readonly string[]
    readonly output: string

    /**
     * @param line The whole instruction, used in error messages, e.g. "NOT x -> h".
     * @param match The result of NOT_PATTERN on the instruction: [whole line, number or input wire, output wire].
     * @throws {Error} If the input is a number larger than 65535.
     */
    constructor(line: string, match: string[]) {
        this.input = parseOperand(match[1]!, line)
        this.inputs = wiresIn(match[1]!)
        this.output = match[2]!
    }

    /**
     * Evaluates the bitwise NOT gate within the 16-bit signal width.
     * @param circuit Circuit used to resolve the input if it is a wire, e.g. one built from "1 -> x".
     * @returns The complemented result as a 16-bit signal value.
     * @throws {Error} If the input names a wire that is not in the circuit.
     */
    evaluate(circuit: Circuit): number {
        return ~this.input(circuit) & SIGNAL_MASK
    }
}
