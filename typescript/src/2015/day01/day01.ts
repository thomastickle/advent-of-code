import {inputPath, readInput} from "../../input.ts"

export function part1(_input: string): number {
    let floor = 0
    for (const char of _input) {
        if (char === '(') {
            floor++
        } else {
            floor--
        }
    }
    return floor
}

export function part2(_input: string): number {
    let floor = 0

    for (const [index, char] of [..._input].entries()) {
        if (char === '(') {
            floor++
        } else {
            floor--
            if (floor === -1) {
                return index + 1
            }
        }
    }
    return -1
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
