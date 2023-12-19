package day14

type Platform struct {
	Map [][]rune
}

func CalculateLoad(platformMap Platform) int {
	tiltedPlatform := TiltNorth(platformMap)
	return calculateLoad(tiltedPlatform)
}

func calculateLoad(tiltedPlatform Platform) int {
	load := 0
	m := tiltedPlatform.Map
	for i, line := range m {
		for _, aRune := range line {
			if aRune == 'O' {
				load += (len(m) - i)
			}
		}
	}
	return load
}

func TiltNorth(platformMap Platform) Platform {
	m := platformMap.Map
	for i := 0; i < len(m[0]); i++ {
		for j := 0; j < len(m); j++ {
			z := m[j][i]
			if z == 'O' {
				k := j
				for k > 0 {
					v := m[k-1][i]
					if v != 'O' && v != '#' {
						x := m[k-1][i]
						m[k-1][i] = m[k][i]
						m[k][i] = x
						k--
					} else if v == 'O' || v == '#' {
						break
					}
				}
			}
		}
	}
	return Platform{m}
}

func ConvertLinesToPlatform(lines []string) Platform {
	var platformMap [][]rune
	for _, line := range lines {
		platformMap = append(platformMap, []rune(line))
	}
	return Platform{platformMap}
}
