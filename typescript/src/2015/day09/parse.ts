import type {CityName, Route} from "./data_types.ts"

const LINE_SPLIT_REGEX = /\r?\n/
const INPUT_LINE_REGEX = /^(?<from>\w+) to (?<to>\w+) = (?<distance>\d+)$/

/**
 * Extracts both directions of a connection between two cities.
 * @param line A route in the form "<from> to <to> = <distance>", e.g. "London to Dublin = 464".
 * @returns Outbound and reverse routes with numeric distances in the input's distance units.
 * @throws {Error} If the line does not contain a matching route.
 */
function extractRoutes(line: string): [Route, Route] {
    const match = INPUT_LINE_REGEX.exec(line)
    if (!match?.groups) {
        throw new Error(`Error parsing line: ${line}`)
    }

    const {from, to, distance} = match.groups
    return [{from: from!, to: to!, distance: Number(distance!)},
        {from: to!, to: from!, distance: Number(distance!)}]
}

/**
 * Groups bidirectional routes by their departure city for adjacency-list traversal.
 * @param input LF- or CRLF-separated routes, e.g. "London to Dublin = 464\nLondon to Belfast = 518".
 * Leading and trailing whitespace is trimmed before splitting into lines.
 * @returns City names mapped to outgoing routes, with distances in the input's distance units.
 * @throws {Error} If any route line cannot be parsed, including an empty line within the input.
 */
export function parseInput(input: string) {
    return input.trim()
                .split(LINE_SPLIT_REGEX)
                .map(extractRoutes)
                .reduce((map, routes) => {
                    const [route1, route2] = routes
                    map.getOrInsert(route1.from, []).push(route1)
                    map.getOrInsert(route2.from, []).push(route2)
                    return map
                }, new Map<CityName, Route[]>())
}
