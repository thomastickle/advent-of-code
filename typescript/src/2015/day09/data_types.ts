
export type Distance = number
export type CityName = string

export interface Route {
    from: CityName
    to: CityName
    distance: Distance
}
