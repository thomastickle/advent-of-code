package day14

import (
	"aoc-2023/day14/platform"
)


func CalculateLoad(platform platform.Platform) int {
    platform.Rotate90Clockwise()
    platform.TiltRight() 
    return calculateLoad(platform)
}

func calculateLoad(platform platform.Platform) int {
    load := 0
    
    for i := 0; i < platform.Height; i++ {
        for j := 0; j < platform.Width; j++ {
            value := platform.Map[i * platform.Width + j] 
            if value == 'O' {
                load += j + 1
            }
        }
    }
    
    return load
}

// func Rotate90Clockwise(platformMap [][]rune) [][]rune {
//     temp = platformMap


// }

// func Tilt(platformMap [][]rune) [][]rune {
//     for i := 0; i < len(platformMap[0]); i++ {
//         for j := 0; j < len(platformMap); j++ {
//             z := platformMap[j][i]
//             if z == 'O' {
//                 k := j
//                 for k > 0 {
//                     v := platformMap[k-1][i]
//                     if v != 'O' && v != '#' {
//                         x := platformMap[k-1][i]
//                         platformMap[k-1][i] = platformMap[k][i]
//                         platformMap[k][i] = x
//                         k--
//                     } else if v == 'O' || v == '#' {
//                         break
//                     }
//                 }
//             }
//         }
//     }
//     return platformMap 
// }

// func ConvertLinesToPlatform(lines []string) Platform {
//     var platformMap [][]rune
//     for _, line := range lines {
//         platformMap = append(platformMap, []rune(line))
//     }
//     return Platform{platformMap}
// }
