package day6

import (
	"fmt"
	"math"
	"strconv"
	"strings"
)

type Race struct {
	Time int
	Distance int
}

func WaysToWin(race []Race) int {
	waysToWin := 1
	for _, race := range race {
		floor, ceil := getLowerAndUpperBound(race.Time, race.Distance)
	
		// In case we would hit exactly the distance on our upper or lower bound, we raise the floor (could lower the ceiling instead)
		boundConditionCheckLower := ((float64(race.Distance) / float64(floor))) - ((float64(race.Time)-float64(floor)))
		if boundConditionCheckLower == 0.0 {
			floor += 1	
		}

		wayToWinRace := ceil - floor 
		waysToWin *= wayToWinRace
	}
	return waysToWin
}


func GetRacesFromLine(lines []string) []Race {
	var races []Race
	times := strings.Fields(strings.Split(lines[0],":")[1])
	distances := strings.Fields(strings.Split(lines[1], ":")[1])
	for i, time := range times {
		timeInSeconds, _ := strconv.Atoi(time)
		distance, _ := strconv.Atoi(distances[i])
		race := Race{timeInSeconds, distance}
		races = append(races, race)
	}
	return races
}


func GetRaceFromLine(lines []string) []Race {
	var races []Race
	times := strings.Fields(strings.Replace(strings.Split(lines[0],":")[1], " ", "", -1))
	distances := strings.Fields(strings.Replace(strings.Split(lines[1],":")[1], " ", "", -1))
	for i, time := range times {
		timeInSeconds, _ := strconv.Atoi(time)
		distance, _ := strconv.Atoi(distances[i])
		race := Race{timeInSeconds, distance}
		races = append(races, race)
	}
	return races
}

func getLowerAndUpperBound(time int, distance int) (int, int) {
	timef := float64(time)

	discriminant := math.Sqrt(math.Pow(timef, 2.0) - 4.0 * float64(distance))
	fmt.Printf("Discriminant %f\n", discriminant)

	ceil := (timef + discriminant) / 2.0
	floor := (timef - discriminant) / 2.0

	return int(floor), int(ceil)
}
