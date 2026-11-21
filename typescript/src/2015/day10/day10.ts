import {inputPath, readInput} from "../../input.ts"

/** 2015 day 10: Elves Look, Elves Say. https://adventofcode.com/2015/day/10 */
export function lookAndSay(input: string, rounds = 40) {
    let roundInput = [...input]
    for (let i = 0; i < rounds; i++) {
        let runCount  = 0
        let lastChar = ''
        const roundOutput: string[] = []
        for (const char of roundInput) {
            if (lastChar === char) {
                runCount += 1
                continue
            }

            if (runCount > 0) {
                roundOutput.push('' + runCount)
                roundOutput.push(lastChar)
            }

            runCount = 1
            lastChar = char
        }

        if (lastChar !== '') {
            roundOutput.push('' + runCount)
            roundOutput.push(lastChar)
        }
        roundInput = roundOutput
    }

    return roundInput.length
}

export function part1(input: string): number {
    return lookAndSay(input, 40)
}

export function part2(input: string): number {
    return lookAndSay(input, 50)
}

if (import.meta.main) {
    const input = readInput(2015, 10)
    if (input === undefined) {
        console.error(`No input found at ${inputPath(2015, 10)}`)
        process.exit(1)
    }
    console.log("part 1:", part1(input))
    console.log("part 2:", part2(input))
}
