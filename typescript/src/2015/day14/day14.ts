/*
 * 2015 day 14: Reindeer Olympics. https://adventofcode.com/2015/day/14
 */

import {type Answers, printAnswers} from "../../answers.ts"

/**
 * One reindeer's flying pattern: it flies for `flyTime`, rests for `restTime`, and repeats.
 */
interface Reindeer {
    name: string
    speed: number
    flyTime: number
    restTime: number
}

/**
 * A reindeer's standing in the race, updated each second.
 */
interface Racer {
    reindeer: Reindeer
    distance: number
    points: number
}

const REINDEER_REGEX = /(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds/

/**
 * Reads one reindeer's description.
 * @param line "<name> can fly <speed> km/s for <fly> seconds, but then must rest for <rest> seconds.", e.g.
 * "Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds."
 * @returns The reindeer, e.g. {name: "Comet", speed: 14, flyTime: 10, restTime: 127}.
 * @throws {Error} If the line doesn't match that form.
 */
function extractReindeer(line: string): Reindeer {
    const matches = REINDEER_REGEX.exec(line)
    if (!matches) {
        throw new Error(`Invalid reindeer details: "${line}"`)
    }

    return {
        name: matches[1]!,
        speed: parseInt(matches[2]!),
        flyTime: parseInt(matches[3]!),
        restTime: parseInt(matches[4]!),
    }
}

/**
 * Reads every reindeer's description.
 * @param input One reindeer per line, in the form {@link extractReindeer} reads.
 * @returns The reindeer in input order.
 * @throws {Error} If a line can't be read.
 */
function extractReindeerDetails(input: string): Reindeer[] {
    return input.trim().split("\n").map(extractReindeer)
}

/**
 * Works out how far a reindeer has flown after some time, without stepping through each second.
 * @param seconds Time since the race started, e.g. 1000.
 * @param reindeer The reindeer's flying pattern.
 * @returns Distance in km, e.g. 1120 for Comet after 1000 seconds.
 */
function distanceTravelled(seconds: number, reindeer: Reindeer): number {
    const cycleLength = reindeer.flyTime + reindeer.restTime
    const fullCycles = Math.floor(seconds / cycleLength)
    const flyingInLastCycle = Math.min(seconds % cycleLength, reindeer.flyTime)
    return (fullCycles * reindeer.flyTime + flyingInLastCycle) * reindeer.speed
}

/**
 * Moves every racer to where it is at a given second.
 * @param racers The racers. Changed in place.
 * @param second Time since the race started, e.g. 140.
 */
function moveRacers(racers: Racer[], second: number): void {
    racers.forEach(racer => racer.distance = distanceTravelled(second, racer.reindeer))
}

/**
 * Finds how far the leaders have flown.
 * @param racers The racers.
 * @returns The greatest distance flown, in km.
 */
function leadDistance(racers: Racer[]): number {
    return Math.max(...racers.map(racer => racer.distance))
}

/**
 * Finds the winner's score.
 * @param racers The racers.
 * @returns The most points any racer has.
 */
function mostPoints(racers: Racer[]): number {
    return Math.max(...racers.map(racer => racer.points))
}

/**
 * Gives a point to each racer in the lead; when several are tied, they all get one.
 * @param racers The racers. Changed in place.
 */
function awardLeaders(racers: Racer[]): void {
    const lead = leadDistance(racers)
    racers.filter(racer => racer.distance === lead).forEach(racer => racer.points++)
}

/**
 * Runs the race one second at a time, scoring the leaders at the end of each second.
 * @param reindeers Every reindeer in the race.
 * @param seconds Length of the race, e.g. 2503.
 * @returns Every racer's final distance and points.
 */
function runRace(reindeers: Reindeer[], seconds: number): Racer[] {
    const racers: Racer[] = reindeers.map(reindeer => ({reindeer, distance: 0, points: 0}))
    for (let second = 1; second <= seconds; second++) {
        moveRacers(racers, second)
        awardLeaders(racers)
    }
    return racers
}

/**
 * Solves both parts from one run of the race.
 *
 * @param input One reindeer per line, e.g. "Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds."
 * @param seconds Length of the race in seconds, e.g. 2503 (the example race lasts 1000).
 * @returns [farthest distance flown in km, most points won].
 * @throws {Error} If a line can't be read.
 */
export function solve(input: string, seconds = 2503): Answers<number> {
    const reindeers = extractReindeerDetails(input)
    const racers = runRace(reindeers, seconds)
    const farthestDistance = leadDistance(racers)
    const winningPoints = mostPoints(racers)
    return [farthestDistance, winningPoints]
}

if (import.meta.main) {
    printAnswers(2015, 14, solve)
}
