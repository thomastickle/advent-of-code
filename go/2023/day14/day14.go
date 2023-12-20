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


func CalculateLoadAfterBillion(platform platform.Platform) int {
    cycles := 1000000000
    memo := make(map[string]int)
    cycle := 0
    cycleStart := 0
    for i := 1; i <= cycles; i++ {
        runCycle(&platform)
        key := string(platform.Map)
        if value, ok := memo[key]; ok  {
            cycle = i
            cycleStart = value 
            break 
        } else {
            memo[key] = i  
        }
    }

    // Need to correctly compute the number of cycles
    cyclesRemaining := (cycles  - cycleStart) % (cycle - cycleStart)
    for i := 0; i < cyclesRemaining; i++ {
        runCycle(&platform)
    }
    // Rotate North where calculate load will work properly
    platform.Rotate90Clockwise()

    return calculateLoad(platform)
}


func runCycle(platform *platform.Platform) {
    // North Movement
    platform.Rotate90Clockwise()
    platform.TiltRight()
    // West Movement
    platform.Rotate90Clockwise()
    platform.TiltRight()
    // South Movement
    platform.Rotate90Clockwise()
    platform.TiltRight()
    // East Movement
    platform.Rotate90Clockwise()
    platform.TiltRight()
}
