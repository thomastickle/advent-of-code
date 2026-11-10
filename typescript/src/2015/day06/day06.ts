import {inputPath, readInput} from "../../input.ts"

/** 2015 day 6: Probably a Fire Hazard. https://adventofcode.com/2015/day/6 */


const commandPattern = /^(?<action>turn off|turn on|toggle)\s(?<x1>\d{1,3}),(?<y1>\d{1,3})\sthrough\s(?<x2>\d{1,3}),(?<y2>\d{1,3})$/

type LightAction = "turn on" | "turn off" | "toggle"

interface Range {
    start: number
    end: number
}

interface LightCommand {
    action: LightAction
    xRange: Range
    yRange: Range
}


export function parseCommand(line: string): LightCommand {
    const match = commandPattern.exec(line)

    if (!match?.groups) {
        throw new Error(`Invalid line: ${line}`)
    }

    const {action, x1, y1, x2, y2} = match.groups

    return {
        action: action as LightAction,
        xRange: {start: Number(x1), end: Number(x2)},
        yRange: {start: Number(y1), end: Number(y2)},
    }
}

function processCommand(lights: number[][], command: LightCommand) {
    for (let i = command.xRange.start; i <= command.xRange.end; i++) {
        for (let j = command.yRange.start; j <= command.yRange.end; j++) {
            if (command.action === "turn on") {
                lights[i]![j] = 1
            } else if (command.action === "turn off") {
                lights[i]![j] = 0
            } else if (command.action === "toggle") {
                lights[i]![j] = lights[i]![j]! ? 0 : 1
            }
        }
    }
}


function processCommand2(lights: number[][], command: LightCommand) {
    for (let i = command.xRange.start; i <= command.xRange.end; i++) {
        for (let j = command.yRange.start; j <= command.yRange.end; j++) {
            if (command.action === "turn on") {
                lights[i]![j]! += 1
            } else if (command.action === "turn off") {
                lights[i]![j]! = Math.max(0, lights[i]![j]! - 1)
            } else if (command.action === "toggle") {
                lights[i]![j]! += 2
            }
        }
    }
}

function countLightsLit(list: number[][]) {
    return list.flat().filter((light) => light).length
}

export function part1(input: string): number {
    const lights: number[][] = Array.from({length: 1000}, () => Array(1000).fill(0))
    for (const command of input.split("\n").map(parseCommand)) {
        processCommand(lights, command)
    }
    return countLightsLit(lights)
}

function countTotalBrightness(lights: number[][]) {
    return lights.flat().reduce((total, light) => total + light, 0)
}

export function part2(input: string): number {
    const lights: number[][] = Array.from({length: 1000}, () => Array(1000).fill(0))

    for (const command of input.split("\n").map(parseCommand)) {
        processCommand2(lights, command)
    }
    return countTotalBrightness(lights)
}

if (import.meta.main) {
    const input = readInput(2015, 6)
    if (input === undefined) {
        console.error(`No input found at ${inputPath(2015, 6)}`)
        process.exit(1)
    }
    console.log("part 1:", part1(input))
    console.log("part 2:", part2(input))
}
