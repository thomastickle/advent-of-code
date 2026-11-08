import {inputPath, readInput} from "../../input.ts"

interface Box {
    length: number
    width: number
    height: number
}

/**
 * Extract the measurements of a box from its input string
 * @param boxInput String in the format "lengthxwidthxheight"
 * @returns Box object with the measurements
 */
function getBoxMeasurements(boxInput: string): Box {
    const measurements = boxInput.split("x")
    const lengthValue = parseInt(measurements[0] ?? "0")
    const widthValue = parseInt(measurements[1] ?? "0")
    const heightValue = parseInt(measurements[2] ?? "0")
    return {
        length: lengthValue,
        width: widthValue,
        height: heightValue
    }
}

/**
 * Process all the lines of the input returning a single value
 * @param input
 * @param processBox
 */
function processInput(input: string, processBox: (boxInput: string) => number): number {
    let total = 0
    for (const boxInput of input.split("\n")) {
        if (boxInput.trim().length === 0) {
            continue
        }
        total += processBox(boxInput)
    }
    return total
}

export function part1(input: string): number {
    function processBox(boxInput: string) {
        const {length, width, height}  = getBoxMeasurements(boxInput)
        const total = 2 * length * width + 2 * width * height + 2 * height * length
        const smallestSize = Math.min(length * width, width * height, height * length)
        return total + smallestSize
    }

    return processInput(input, processBox)
}

export function part2(input: string): number {
/*
    function processbox(boxinput: string): number {
        r
    }

    return processInput(input, processBox)
*/
    throw new Error("Not implemented")
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
