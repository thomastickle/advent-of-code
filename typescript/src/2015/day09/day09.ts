import {printAnswers, type Answers} from "../../answers.ts"
import {parseInput} from "./parse.ts"
import type {CityName, Route} from "./data_types.ts"

/** 2015 day 9: All in a Single Night. https://adventofcode.com/2015/day/9 */

/**
 * Finds the selected route distance across all starting cities in a fully connected graph.
 * @param cities Outgoing routes keyed by city name, e.g. "London" maps to routes to Dublin and Belfast.
 * @param comparisonFunction Math.min for the shortest route or Math.max for the longest; called without arguments
 * to obtain Infinity or -Infinity as the initial comparison value.
 * @returns Selected total distance in the input's distance units, visiting every city once without returning.
 */
function findDistanceByFunction(cities: Map<CityName, Route[]>, comparisonFunction: (...values: number[]) => number) {
    /**
     * Explores unvisited destinations, copying the visited set to keep recursive branches independent.
     * @param routes Outgoing routes from the current city, e.g. [{from: "London", to: "Dublin", distance: 464}].
     * @param visited Cities already on this branch, including the current city, e.g. new Set(["London"]).
     * @returns Selected remaining distance in the input's units, or zero when no unvisited destinations remain.
     */
    function findRemainingDistance(routes: Route[], visited: Set<CityName>) {
        let distance = comparisonFunction()

        const remainingRoutes = routes.filter(route => !visited.has(route.to))
        if (remainingRoutes.length === 0) {
            return 0
        }

        for (const route of remainingRoutes) {
            const nextRoutes = cities.get(route.to)
            distance = comparisonFunction(
                distance,
                route.distance + findRemainingDistance(nextRoutes!, new Set(visited).add(route.to)),
            )
        }
        return distance
    }

    let distance = comparisonFunction()

    for (const [cityName, route] of cities) {
        distance = comparisonFunction(distance, findRemainingDistance(route, new Set<string>().add(cityName)))
    }

    return distance
}


/**
 * Finds the shortest route visiting every city exactly once.
 * @param input LF- or CRLF-separated routes in the form "London to Dublin = 464".
 * @returns Shortest total distance in the input's distance units, without returning to the starting city.
 * @throws {Error} If a route line cannot be parsed.
 */
export function part1(input: string): number {
    const cities = parseInput(input)
    return findDistanceByFunction(cities, Math.min)
}

/**
 * Finds the longest route visiting every city exactly once.
 * @param input LF- or CRLF-separated routes in the form "London to Dublin = 464".
 * @returns Longest total distance in the input's distance units, without returning to the starting city.
 * @throws {Error} If a route line cannot be parsed.
 */
export function part2(input: string): number {
    const cities = parseInput(input)
    return findDistanceByFunction(cities, Math.max)
}

/**
 * Solves both parts. Each part is worked out on its own for now; share the work here if part 2 can build on
 * part 1.
 *
 * @param input One route per line in the form "<city> to <city> = <distance>", e.g. "London to Dublin = 464".
 * @returns [shortest route, longest route], in the input's distance units.
 */
export function solve(input: string): Answers<number> {
    return [part1(input), part2(input)]
}

if (import.meta.main) {
    printAnswers(2015, 9, solve)
}
