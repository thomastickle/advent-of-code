package day11

import (
  "math"
	"sort"
)


type Galaxy struct  {
	Id int
	X int
	Y int
}

func SumDistances(galaxies []*Galaxy) int {
  sum := 0
  for i := 0; i < len(galaxies); i++ {
    for j := i + 1; j < len(galaxies); j++ {
      distance := getDistance(galaxies[i], galaxies[j])
      sum += distance
    }
  }
  return sum 
}

func ExpandUniverse(galaxies []*Galaxy, expansion int) []*Galaxy {
  emptyX, emptyY := GetXYSkips(galaxies)
  remapGalaxies(galaxies, emptyX, emptyY, expansion)
  return galaxies
}

func getDistance(galaxy1, galaxy2 *Galaxy) int {
  xDiff := float64(galaxy1.X) - float64(galaxy2.X)
  yDiff := float64(galaxy1.Y) - float64(galaxy2.Y)
  distance := math.Abs(xDiff) + math.Abs(yDiff)
  return int(distance)
} 

func remapGalaxies(galaxies []*Galaxy, emptyX []int, emptyY []int, expansion int) {
  galaxiesToRemap := make(map[int][]*Galaxy)
  for _, x := range emptyX {
    var galaxiesToIncrement []*Galaxy
    for _, galaxy := range galaxies {
      if x < galaxy.X {
        galaxiesToIncrement = append(galaxiesToIncrement, galaxy) 
      }
    }
    galaxiesToRemap[x] = galaxiesToIncrement
  }

  for _, value := range galaxiesToRemap {
    for _, galaxy := range value {
      galaxy.X = galaxy.X + expansion - 1 
    }
  }

  clear(galaxiesToRemap)
  for _, y := range emptyY {
    var galaxiesToIncrement []*Galaxy
    for _, galaxy := range galaxies {
      if y < galaxy.Y {
        galaxiesToIncrement = append(galaxiesToIncrement, galaxy) 
      }
    }
    galaxiesToRemap[y] = galaxiesToIncrement
  }

  for _, value := range galaxiesToRemap {
    for _, galaxy := range value {
      galaxy.Y = galaxy.Y + expansion - 1
    }
  }
}


func GetXYSkips(galaxies []*Galaxy) ([]int, []int) {
  // Sort by X so we can figure out what columns do not have a galaxy.
	sort.Slice(galaxies, func(i, j int) bool {
		return galaxies[i].X < galaxies[j].X	
	})

  var emptyX []int 
  for i := 0; i < len(galaxies) - 1; i++ {
    for j := galaxies[i].X + 1; j < galaxies[i+1].X; j++ {
      emptyX = append(emptyX, j)
    }
  }


	sort.Slice(galaxies, func(i, j int) bool {
		return galaxies[i].Y < galaxies[j].Y
	})
  
  var emptyY []int 
  for i := 0; i < len(galaxies) - 1; i++ {
    for j := galaxies[i].Y + 1; j < galaxies[i+1].Y; j++ {
      emptyY = append(emptyY, j) 
    }
  }

  return emptyX, emptyY
}


func GetGalaxies(lines []string) []*Galaxy {
	var galaxies []*Galaxy
	for y, line := range lines {
		for x, aRune := range []rune(line) {
			if aRune == '#' {
        galaxy := Galaxy{Id: len(galaxies) + 1, X: x, Y: y}
				galaxies = append(galaxies, &galaxy)
			}
		}
		
	}
	return galaxies
}

