import type {CityName, Route} from "./data_types.ts"

const LINE_SPLIT_REGEX = /\r?\n/
const INPUT_LINE_REGEX = /(?<from>\w+) to (?<to>\w+) = (?<distance>\d+)/

/**
 *
 * @param line
 */
function extractRoutes(line: string): [Route, Route] {
    let match = INPUT_LINE_REGEX.exec(line)
    if (!match?.groups) {
        throw new Error(`Error parsing line: ${line}`)
    }

    const {from, to, distance} = match.groups
    return [{from: from!, to: to!, distance: Number(distance!)},
        {from: to!, to: from!, distance: Number(distance!)}]
}

export function parseInput(input: string) {
    return input.split(LINE_SPLIT_REGEX)
                .map(extractRoutes)
                .reduce((map: Map<CityName, Map<CityName, Route>>, routes: Route[]) => {
                    const [route1, route2] = routes
                    const cityOutBoundRoutes = map.getOrInsert(route1!.from, new Map<CityName, Route>())
                    cityOutBoundRoutes.set(route1!.to, route1!)
                    const route2Connections = map.getOrInsert(route2!.from, new Map<CityName, Route>())
                    route2Connections.set(route2!.to, route2!)
                    return map
                }, new Map<CityName, Map<CityName, Route>>)
}
