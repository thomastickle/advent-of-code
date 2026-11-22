/*
 * 2015 day 9: All in a Single Night. https://adventofcode.com/2015/day/9
 */

import {printAnswers, type Answers} from "../../answers.ts"
import {parseInput} from "./parse.ts"
import type {CityName, Route} from "./data_types.ts"

/** Distances between cities numbered 0 to count - 1, in the input's distance units. */
interface DistanceTable {
    count: number
    distances: Int32Array
}

/** The shortest and longest of a set of route distances, in the input's distance units. */
interface DistanceRange {
    shortest: number
    longest: number
}

/** A set of visited cities as a bitmask: bit n is set once city n is visited, so `number` holds up to 31 cities. */
type Visited = number

const MAX_CITIES = 31

/**
 * Numbers the cities and puts every distance in a flat table, so the walk can look one up without hashing a name.
 * @param cities Outgoing routes keyed by city name, e.g. "London" maps to routes to Dublin and Belfast.
 * @returns The table, with each distance in the input's distance units.
 * @throws {Error} If there are more cities than a {@link Visited} bitmask can hold.
 */
function toDistanceTable(cities: Map<CityName, Route[]>): DistanceTable {
    if (cities.size > MAX_CITIES) {
        throw new Error(`Too many cities: ${cities.size}, at most ${MAX_CITIES}`)
    }

    const numbers = new Map([...cities.keys()].map((name, number) => [name, number]))
    const count = numbers.size
    const distances = new Int32Array(count * count)
    for (const route of [...cities.values()].flat()) {
        distances[numbers.get(route.from)! * count + numbers.get(route.to)!] = route.distance
    }
    return {count, distances}
}

/**
 * Looks up the distance between two numbered cities.
 * @param table The distances between every pair of cities.
 * @param from Number of the city to start from, e.g. 0.
 * @param to Number of the city to go to, e.g. 2.
 * @returns The distance in the input's distance units, e.g. 518.
 */
function distanceBetween(table: DistanceTable, from: number, to: number): number {
    return table.distances[from * table.count + to]!
}

/**
 * Tells whether a city is in a visited set.
 * @param visited The visited set, e.g. 0b101 for cities 0 and 2.
 * @param city Number of the city, e.g. 1.
 * @returns True if the city's bit is set.
 */
function isVisited(visited: Visited, city: number): boolean {
    return (visited & (1 << city)) !== 0
}

/**
 * Adds a city to a visited set.
 * @param visited The visited set, e.g. 0b101 for cities 0 and 2.
 * @param city Number of the city, e.g. 1.
 * @returns A visited set that also holds the city, e.g. 0b111.
 */
function withVisited(visited: Visited, city: number): Visited {
    return visited | (1 << city)
}

/**
 * The visited set that holds every city.
 * @param count Number of cities, e.g. 3.
 * @returns A set with the lowest `count` bits set, e.g. 0b111.
 */
function everyCity(count: number): Visited {
    return (1 << count) - 1
}

/**
 * Widens a range to take in one finished route.
 * @param range The shortest and longest routes so far. Changed in place.
 * @param total Length of the finished route, e.g. 605.
 */
function recordRoute(range: DistanceRange, total: number): void {
    range.shortest = Math.min(range.shortest, total)
    range.longest = Math.max(range.longest, total)
}

/**
 * Follows every way to finish a route from the current city, recording each finished route in the range.
 * @param table The distances between every pair of cities.
 * @param city Number of the current city, e.g. 0.
 * @param visited Cities already on this route, including the current one.
 * @param travelled Distance covered so far, in the input's distance units, e.g. 464.
 * @param range The shortest and longest finished routes so far. Changed in place.
 */
function walkRoutes(
    table: DistanceTable,
    city: number,
    visited: Visited,
    travelled: number,
    range: DistanceRange,
): void {
    if (visited === everyCity(table.count)) {
        recordRoute(range, travelled)
        return
    }

    for (let next = 0; next < table.count; next++) {
        if (!isVisited(visited, next)) {
            walkRoutes(table, next, withVisited(visited, next), travelled + distanceBetween(table, city, next), range)
        }
    }
}

/**
 * Finds the shortest and longest routes that visit every city once, from any starting city, in one walk.
 * @param table The distances between every pair of cities.
 * @returns Shortest and longest total distance in the input's distance units, without returning to the start.
 */
function findDistanceRange(table: DistanceTable): DistanceRange {
    const range = {shortest: Infinity, longest: -Infinity}
    for (let start = 0; start < table.count; start++) {
        walkRoutes(table, start, withVisited(0, start), 0, range)
    }
    return range
}

/**
 * Solves both parts from one parse and one walk over every route.
 *
 * @param input One route per line in the form "<city> to <city> = <distance>", e.g. "London to Dublin = 464".
 * @returns [shortest route, longest route], in the input's distance units.
 * @throws {Error} If a route line cannot be parsed, or a pair of cities has no distance between them.
 */
export function solve(input: string): Answers<number> {
    const {shortest, longest} = findDistanceRange(toDistanceTable(parseInput(input)))
    return [shortest, longest]
}

if (import.meta.main) {
    printAnswers(2015, 9, solve)
}
