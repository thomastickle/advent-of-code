import {inputPath, readInput} from "../../input.ts"

export function part1(input: string): number {
    let floor = 0
    for (const char of input) {
        if (char === "(") {
            floor++
        } else if (char === ")") {
            floor--
        }
    }
    return floor
}

export function part2(input: string): number {
    let floor = 0
    for (let index = 0; index < input.length; index++) {
        const char = input[index]
        if (char === "(") {
            floor++
        } else if (char === ")") {
            floor--
            if (floor === -1) {
                return index + 1
            }
        }
    }
    throw new Error("Santa never enters the basement")
}

if (import.meta.main) {
    const input = readInput(2015, 1)
    if (input === undefined) {
        console.error(`No input found at ${inputPath(2015, 1)}`)
        process.exit(1)
    }
    console.log("part 1:", part1(input))
    console.log("part 2:", part2(input))
}
