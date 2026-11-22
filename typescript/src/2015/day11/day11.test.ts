import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {inputPath, readExpected, readInput} from "../../input.ts"
import {
    checkPassword,
    hasNoBadCharacters,
    hasIncreasingStraight,
    hasTwoDifferentPairs,
    incrementChar,
    incrementPassword,
    part1,
    part2,
} from "./day11.ts"

describe("2015 day 11: Testing incrementChar", () => {
    it("'0' -> '1'", () => {
        const result = incrementChar(97)
        assert.equal(result.char, 98)
        assert.equal(result.carry, false)
    })

    it("'z' -> 'a'", () => {
        const result = incrementChar(122)
        assert.equal(result.char, 97)
        assert.equal(result.carry, true)
    })
})

describe("2015 day11: Testing incrementPassword", () => {
    it("increments the last character of 'abcdefgh'", () => {
        const password = new TextEncoder().encode("abcdefgh")
        const result = incrementPassword(password)
        assert.deepEqual(result, new TextEncoder().encode("abcdefgi"))
    })

    it("carries from 'z' to the preceding character", () => {
        const password = new TextEncoder().encode("abcdefgz")
        const result = incrementPassword(password)
        assert.deepEqual(result, new TextEncoder().encode("abcdefha"))
    })

    it("wraps an all-'z' password to all 'a'", () => {
        const password = new TextEncoder().encode("zzz")
        const result = incrementPassword(password)
        assert.deepEqual(result, new TextEncoder().encode("aaa"))
    })
})

describe("2015 day 11: password validation", () => {
    describe("hasNoBadCharacters", () => {
        it("returns false when the password contains i", () => {
            assert.equal(hasNoBadCharacters(new TextEncoder().encode("aib")), false)
        })

        it("returns false when the password contains o", () => {
            assert.equal(hasNoBadCharacters(new TextEncoder().encode("abo")), false)
        })

        it("returns false when the password contains l", () => {
            assert.equal(hasNoBadCharacters(new TextEncoder().encode("lab")), false)
        })

        it("returns true when the password contains no forbidden characters", () => {
            assert.equal(hasNoBadCharacters(new TextEncoder().encode("abcz")), true)
        })

        it("returns true for an empty password", () => {
            assert.equal(hasNoBadCharacters(new Uint8Array()), true)
        })
    })

    describe("hasIncreasingStraight", () => {
        it("returns true for a straight at the beginning", () => {
            assert.equal(hasIncreasingStraight(new Uint8Array([0, 1, 2, 5])), true)
        })

        it("returns true for a straight in the middle", () => {
            assert.equal(hasIncreasingStraight(new Uint8Array([0, 4, 5, 6, 9])), true)
        })

        it("returns true for a straight at the end", () => {
            assert.equal(hasIncreasingStraight(new Uint8Array([0, 3, 23, 24, 25])), true)
        })

        it("returns true for a straight longer than three characters", () => {
            assert.equal(hasIncreasingStraight(new Uint8Array([4, 5, 6, 7])), true)
        })

        it("returns false for fewer than three characters", () => {
            assert.equal(hasIncreasingStraight(new Uint8Array([0, 1])), false)
        })

        it("returns false for a descending sequence", () => {
            assert.equal(hasIncreasingStraight(new Uint8Array([2, 1, 0])), false)
        })

        it("returns false for an interrupted sequence", () => {
            assert.equal(hasIncreasingStraight(new Uint8Array([0, 1, 3])), false)
        })

        it("returns false for repeated characters", () => {
            assert.equal(hasIncreasingStraight(new Uint8Array([0, 1, 1, 2])), false)
        })

        it("does not wrap from z to a", () => {
            assert.equal(hasIncreasingStraight(new Uint8Array([24, 25, 0])), false)
        })
    })

    describe("hasTwoDifferentPairs", () => {
        it("returns true for two different pairs starting with a", () => {
            assert.equal(hasTwoDifferentPairs(new Uint8Array([0, 0, 1, 1])), true)
        })

        it("returns true for separated pairs", () => {
            assert.equal(hasTwoDifferentPairs(new Uint8Array([0, 1, 2, 2, 3, 4, 5, 5])), true)
        })

        it("returns true when the second pair ends the password", () => {
            assert.equal(hasTwoDifferentPairs(new Uint8Array([0, 1, 1, 2, 2])), true)
        })

        it("returns true when repeated pairs are followed by a different pair", () => {
            assert.equal(hasTwoDifferentPairs(new Uint8Array([0, 0, 0, 0, 1, 1])), true)
        })

        it("returns false when the password has no pair", () => {
            assert.equal(hasTwoDifferentPairs(new Uint8Array([0, 1, 2, 3])), false)
        })

        it("returns false when the password has only one pair", () => {
            assert.equal(hasTwoDifferentPairs(new Uint8Array([0, 0, 1, 2])), false)
        })

        it("returns false when overlapping pairs use the same character", () => {
            assert.equal(hasTwoDifferentPairs(new Uint8Array([0, 0, 0])), false)
        })

        it("returns false when pairs repeat the same character", () => {
            assert.equal(hasTwoDifferentPairs(new Uint8Array([0, 0, 0, 0])), false)
        })
    })

    describe("checkPassword", () => {
        const textEncoder = new TextEncoder()
        it("returns true for a valid password", () => {
            assert.equal(checkPassword(textEncoder.encode("abcdffaa")), true)
        })

        it("returns true for another valid password", () => {
            assert.equal(checkPassword(textEncoder.encode("ghjaabcc")), true)
        })

        it("returns false when the password contains i", () => {
            assert.equal(checkPassword(textEncoder.encode("abcdiiff")), false)
        })

        it("returns false when the password contains o", () => {
            assert.equal(checkPassword(textEncoder.encode("abcdooff")), false)
        })

        it("returns false when the password contains l", () => {
            assert.equal(checkPassword(textEncoder.encode("abcdllff")), false)
        })

        it("returns false when the password has no increasing straight", () => {
            assert.equal(checkPassword(textEncoder.encode("abdfgghh")), false)
        })

        it("returns false when the password has only one pair", () => {
            assert.equal(checkPassword(textEncoder.encode("abcdefgg")), false)
        })

        it("returns false when its pairs are all the same character", () => {
            assert.equal(checkPassword(textEncoder.encode("abcdefgggg")), false)
        })
    })
})

describe("2015 day 11: examples", () => {
    it("part 1: \"abcdefgh\" -> abcdffaa", () => {
        assert.equal(part1("abcdefgh"), "abcdffaa")
    })
    it("part 1: \"ghijklmn\" -> ghjaabcc", () => {
        assert.equal(part1("ghijklmn"), "ghjaabcc")
    })

    it("part 2: derived from \"abcdefgh\" -> abcdffbb", () => {
        assert.equal(part2("abcdefgh"), "abcdffbb")
    })
    it("part 2: derived from \"abcdffaa\" -> abcdffcc", () => {
        assert.equal(part2("abcdffaa"), "abcdffcc")
    })
})

// Your answers live in inputs/<year>/dayNN.expected.json (git-ignored), e.g. {"part1": 1, "part2": 2}.
const expected: {part1?: string; part2?: string} = readExpected(2015, 11)

const input = readInput(2015, 11)
const skip = (answer: string | undefined) =>
    input === undefined
        ? `no input at ${inputPath(2015, 11)}`
        : answer === undefined
            ? "expected answer not recorded yet"
            : false

describe("2015 day 11: full input", () => {
    it("part 1", {skip: skip(expected.part1)}, () => {
        assert.equal(part1(input!), expected.part1)
    })
    it("part 2", {skip: skip(expected.part2)}, () => {
        assert.equal(part2(input!), expected.part2)
    })
})
