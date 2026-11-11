export interface Operation {
    /**
     * Evaluates this operation using the circuit that owns its output wire.
     * @param circuit Circuit whose wires supply this operation's inputs.
     * @returns The signal value produced by this operation.
     */
    evaluate(circuit: Circuit): number
}

/**
 * Builds a circuit from instructions and memoizes successful signals until the circuit changes.
 */
export class Circuit {
    private readonly operations = new Map<string, Operation>()
    private readonly evaluatedWires = new Map<string, number>()

    /**
     * Builds a circuit from its gate instructions.
     * @param input Circuit instructions, one per line, e.g. "123 -> x\nx AND 1 -> a".
     * @returns The circuit described by the instructions.
     */
    static fromInput(input: string): Circuit {
        const circuit = new Circuit()

        for (const line of input.split("\n")) {
            const inputPattern = Input.INPUT_PATTERN.exec(line)
            if (inputPattern) {
                const inputOperation = new Input(inputPattern)
                circuit.set(inputOperation.output, inputOperation)
                continue
            }

            const outputPattern = Output.OUTPUT_PATTERN.exec(line)
            if (outputPattern) {
                const outputOperation = new Output(outputPattern)
                circuit.set(outputOperation.output, outputOperation)
                continue
            }

            const andMatch = And.AND_PATTERN.exec(line)
            if (andMatch) {
                const andOperation = new And(line, andMatch)
                circuit.set(andOperation.output, andOperation)
                continue
            }

            const orMatch = Or.OR_PATTERN.exec(line)
            if (orMatch) {
                const orOperation = new Or(orMatch)
                circuit.set(orOperation.output, orOperation)
                continue
            }

            const leftShiftMatch = LeftShift.LEFT_SHIFT_PATTERN.exec(line)
            if (leftShiftMatch) {
                const leftShiftOperation = new LeftShift(leftShiftMatch)
                circuit.set(leftShiftOperation.output, leftShiftOperation)
                continue
            }

            const rightShiftMatch = RightShift.RIGHT_SHIFT_PATTERN.exec(line)
            if (rightShiftMatch) {
                const rightShiftOperation = new RightShift(rightShiftMatch)
                circuit.set(rightShiftOperation.output, rightShiftOperation)
                continue
            }

            const notMatch = Not.NOT_PATTERN.exec(line)
            if (notMatch) {
                const notOperation = new Not(notMatch)
                circuit.set(notOperation.output, notOperation)
            }
        }

        return circuit
    }

    /**
     * Adds or replaces the operation that produces a wire.
     * @param wire Output wire name, e.g. "a".
     * @param operation Operation that produces the wire's signal.
     * @returns No value.
     */
    set(wire: string, operation: Operation): void {
        this.operations.set(wire, operation)
        this.evaluatedWires.clear()
    }

    /**
     * Evaluates a wire once for the current circuit mapping.
     * @param wire Output wire name, e.g. "a".
     * @param instruction Gate instruction for missing-wire error context, e.g. "1 AND x -> a".
     * @returns The wire's signal value.
     * @throws {Error} If the wire is not defined in the circuit.
     */
    evaluate(wire: string, instruction?: string): number {
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

/**
 * Evaluates a numeric operand or resolves its referenced wire.
 * @param operand A digit sequence or wire name, e.g. "123" or "x".
 * @param circuit Circuit used to resolve wire operands, e.g. one built from "1 -> x".
 * @param instruction The gate instruction for error context, e.g. "1 AND x -> a".
 * @returns The operand's signal value.
 * @throws {Error} If the operand names a wire that is not in the circuit.
 */
function evaluateOperand(operand: string, circuit: Circuit, instruction?: string): number {
    if (/^\d+$/.test(operand)) {
        return Number(operand)
    }

    return circuit.evaluate(operand, instruction)
}

export class Input implements Operation {
    public static readonly INPUT_PATTERN = /^(\d+) -> (\w+)$/
    private readonly value: number
    readonly output: string

    constructor(line: string[]) {
        this.value = parseInt(line[1]!)
        this.output = line[2]!
    }

    public evaluate(): number {
        return this.value
    }
}

export class Output implements Operation {
    public static readonly OUTPUT_PATTERN = /^(\w+) -> (\w+)$/
    private readonly input: string
    readonly output: string

    constructor(line: string[]) {
        this.input = line[1]!
        this.output = line[2]!
    }

    /**
     * Evaluates the wire pass-through operation.
     * @param circuit Circuit used to resolve the input wire, e.g. one built from "1 -> x".
     * @returns The input wire's signal value.
     * @throws {Error} If the input wire is not in the circuit.
     */
    evaluate(circuit: Circuit): number {
        return circuit.evaluate(this.input)
    }
}

export class And implements Operation {
    public static readonly AND_PATTERN = /^(\w+|\d+) AND (\w+|\d+) -> (\w+)$/
    private readonly left: string
    private readonly right: string
    readonly output: string
    private readonly line: string

    constructor(line: string, inputs: string[]) {
        this.line = line
        this.left = inputs[1]!
        this.right = inputs[2]!
        this.output = inputs[3]!
    }

    /**
     * Evaluates the bitwise AND gate.
     * @param circuit Circuit used to resolve wire operands, e.g. one built from "1 -> x".
     * @returns The AND result as a signal value.
     * @throws {Error} If either operand names a wire that is not in the circuit.
     */
    public evaluate(circuit: Circuit): number {
        const leftSignal = evaluateOperand(this.left, circuit, this.line)
        const rightSignal = evaluateOperand(this.right, circuit, this.line)
        return leftSignal & rightSignal
    }
}

export class Or implements Operation {
    public static readonly OR_PATTERN = /^(\w+) OR (\w+) -> (\w+)$/
    private readonly left: string
    private readonly right: string
    readonly output: string

    constructor(line: string[]) {
        this.left = line[1]!
        this.right = line[2]!
        this.output = line[3]!
    }

    /**
     * Evaluates the bitwise OR gate.
     * @param circuit Circuit used to resolve wire operands, e.g. one built from "1 -> x".
     * @returns The OR result as a signal value.
     * @throws {Error} If either operand names a wire that is not in the circuit.
     */
    evaluate(circuit: Circuit): number {
        return evaluateOperand(this.left, circuit) | evaluateOperand(this.right, circuit)
    }
}

export class LeftShift implements Operation {
    public static readonly LEFT_SHIFT_PATTERN = /^(\w+) LSHIFT (\d+) -> (\w+)$/
    private readonly left: string
    private readonly right: number
    readonly output: string


    constructor(line: string[]) {
        this.left = line[1]!
        this.right = parseInt(line[2]!)
        this.output = line[3]!
    }

    /**
     * Evaluates the left-shift gate and limits its result to a 16-bit signal.
     * @param circuit Circuit used to resolve the input wire, e.g. one built from "1 -> x".
     * @returns The shifted result as a 16-bit signal value.
     * @throws {Error} If the input names a wire that is not in the circuit.
     */
    evaluate(circuit: Circuit): number {
        return (evaluateOperand(this.left, circuit) << this.right) & 0x0000FFFF
    }
}

export class RightShift implements Operation {
    public static readonly RIGHT_SHIFT_PATTERN = /^(\w+) RSHIFT (\d+) -> (\w+)$/
    private readonly left: string
    private readonly right: number
    readonly output: string


    constructor(line: string[]) {
        this.left = line[1]!
        this.right = parseInt(line[2]!)
        this.output = line[3]!
    }

    /**
     * Evaluates the right-shift gate.
     * @param circuit Circuit used to resolve the input wire, e.g. one built from "1 -> x".
     * @returns The shifted result as a signal value.
     * @throws {Error} If the input names a wire that is not in the circuit.
     */
    evaluate(circuit: Circuit): number {
        return evaluateOperand(this.left, circuit) >> this.right
    }
}

export class Not implements Operation {
    public static readonly NOT_PATTERN = /^NOT (\w+) -> (\w+)$/
    private readonly input: string
    readonly output: string

    constructor(line: string[]) {
        this.input = line[1]!
        this.output = line[2]!
    }

    /**
     * Evaluates the bitwise NOT gate within the 16-bit signal width.
     * @param circuit Circuit used to resolve the input wire, e.g. one built from "1 -> x".
     * @returns The complemented result as a 16-bit signal value.
     * @throws {Error} If the input names a wire that is not in the circuit.
     */
    evaluate(circuit: Circuit): number {
        return ~evaluateOperand(this.input, circuit) & 0x0000FFFF
    }
}
