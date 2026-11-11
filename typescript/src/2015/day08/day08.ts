import {inputPath, readInput} from "../../input.ts"

/** 2015 day 8: Matchsticks. https://adventofcode.com/2015/day/8 */



function computeInMemory(line: string): number {
    let length = 0
    let lastChar = ""

    for (let i = 0; i < line.length; i++) {
        if (line[i] == "\"" && (i === 0 || i === line.length - 1)) {
           continue
        }
        if (line[i] == "\\") {
            let nextValue = line[i + 1]
            if (nextValue == "x") {
                i += 3
            } else if (nextValue == "\\" || nextValue == "\"") {
                i += 1
            }
        }
        length++
    }

    return length
}

function lengthEncodedString(line: string): number {
    let output = "\""
    for (let char of line) {
        if (char == "\"") {
            output += "\\\""
        } else if (char == "\\") {
            output += "\\\\"
        } else {
            output += char
        }
    }
    output += "\""
    return output.length
}


export function part1(input: string): number {
    let length = 0;
    for (const line of input.split("\n")) {
       length += line.length - computeInMemory(line)
    }
    return length
}

export function part2(input: string): number {
    let length = 0
    for (const line of input.split("\n")) {
        length += lengthEncodedString(line) - line.length
    }
    return length
}

if (import.meta.main) {
    const input = readInput(2015, 8)
    if (input === undefined) {
        console.error(`No input found at ${inputPath(2015, 8)}`)
        process.exit(1)
    }
    console.log("part 1:", part1(input))
    console.log("part 2:", part2(input))
}
