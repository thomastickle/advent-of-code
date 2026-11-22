import {printAnswers, type Answers} from "../../answers.ts"
import {parseInput} from "./parse.ts"
import type {CityName, Route} from "./data_types.ts"

/** 2015 day 9: All in a Single Night. https://adventofcode.com/2015/day/9 */

/** The shortest and longest of a set of route distances, in the input's distance units. */
interface DistanceRange {
    shortest: number
    longest: number
}

/**
 * Finds the shortest and longest routes across all starting cities in a fully connected graph, in a single walk
 * over every route (both answers come from the same set of routes, so there is no need to walk them twice).
 * @param cities Outgoing routes keyed by city name, e.g. "London" maps to routes to Dublin and Belfast.
 * @returns Shortest and longest total distance in the input's distance units, visiting every city once without
 * returning.
 */
function findDistanceRange(cities: Map<CityName, Route[]>): DistanceRange {
    /**
     * Explores unvisited destinations, copying the visited set to keep recursive branches independent.
     * @param routes Outgoing routes from the current city, e.g. [{from: "London", to: "Dublin", distance: 464}].
     * @param visited Cities already on this branch, including the current city, e.g. new Set(["London"]).
     * @returns Shortest and longest remaining distance in the input's units, or zeros when no unvisited
     * destinations remain.
     */
    function findRemainingRange(routes: Route[], visited: Set<CityName>): DistanceRange {
        const remainingRoutes = routes.filter(route => !visited.has(route.to))
        if (remainingRoutes.length === 0) {
            return {shortest: 0, longest: 0}
        }

        const range = {shortest: Infinity, longest: -Infinity}
        for (const route of remainingRoutes) {
            const rest = findRemainingRange(cities.get(route.to)!, new Set(visited).add(route.to))
            range.shortest = Math.min(range.shortest, route.distance + rest.shortest)
            range.longest = Math.max(range.longest, route.distance + rest.longest)
        }
        return range
    }

    const range = {shortest: Infinity, longest: -Infinity}
    for (const [cityName, routes] of cities) {
        const fromHere = findRemainingRange(routes, new Set<CityName>().add(cityName))
        range.shortest = Math.min(range.shortest, fromHere.shortest)
        range.longest = Math.max(range.longest, fromHere.longest)
    }
    return range
}

/**
 * Solves both parts from one parse and one walk over every route.
 *
 * @param input One route per line in the form "<city> to <city> = <distance>", e.g. "London to Dublin = 464".
 * @returns [shortest route, longest route], in the input's distance units.
 * @throws {Error} If a route line cannot be parsed.
 */
export function solve(input: string): Answers<number> {
    const {shortest, longest} = findDistanceRange(parseInput(input))
    return [shortest, longest]
}

if (import.meta.main) {
    printAnswers(2015, 9, solve)
}
