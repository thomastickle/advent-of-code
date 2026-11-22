import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {fullInputTests} from "../../testing.ts"
import {
    checkPassword,
    hasNoBadCharacters,
    hasIncreasingStraight,
    hasTwoDifferentPairs,
    incrementPassword,
    nextPassword,
    skipBadChars,
    solve,
} from "./day11.ts"

/**
 * Encodes a test password the way nextPassword does. Real passwords are always eight lowercase letters, so the test
 * fails here if one isn't.
 * @param text The password, e.g. "abcdefgh".
 * @returns One character code per letter, e.g. [97, 98, 99, 100, 101, 102, 103, 104].
 */
function password(text: string): Uint8Array {
    assert.match(text, /^[a-z]{8}$/, `test password "${text}" is not 8 lowercase letters`)
    return new TextEncoder().encode(text)
}

describe("2015 day 11: Testing incrementPassword", () => {
    it("increments the last character of 'abcdefgf'", () => {
        const value = password("abcdefgf")
        incrementPassword(value)
        assert.deepEqual(value, password("abcdefgg"))
    })

    it("skips i: 'abcdefgh' goes straight to 'abcdefgj'", () => {
        const value = password("abcdefgh")
        incrementPassword(value)
        assert.deepEqual(value, password("abcdefgj"))
    })

    it("skips l: 'abcdefgk' goes straight to 'abcdefgm'", () => {
        const value = password("abcdefgk")
        incrementPassword(value)
        assert.deepEqual(value, password("abcdefgm"))
    })

    it("skips o after a carry: 'abcdenzz' goes straight to 'abcdepaa'", () => {
        const value = password("abcdenzz")
        incrementPassword(value)
        assert.deepEqual(value, password("abcdepaa"))
    })

    it("carries from 'z' to the preceding character", () => {
        const value = password("abcdefgz")
        incrementPassword(value)
        assert.deepEqual(value, password("abcdefha"))
    })

    it("carries through several 'z's in a row", () => {
        const value = password("abczzzzz")
        incrementPassword(value)
        assert.deepEqual(value, password("abdaaaaa"))
    })

    it("wraps an all-'z' password to all 'a'", () => {
        const value = password("zzzzzzzz")
        incrementPassword(value)
        assert.deepEqual(value, password("aaaaaaaa"))
    })
})

describe("2015 day 11: Testing skipBadChars", () => {
    it("bumps the bad letter and resets everything after it: 'ghijklmn' -> 'ghjaaaaa'", () => {
        const value = password("ghijklmn")
        assert.equal(skipBadChars(value), true)
        assert.deepEqual(value, password("ghjaaaaa"))
    })

    it("only acts on the first bad letter: 'aioaaaaa' -> 'ajaaaaaa'", () => {
        const value = password("aioaaaaa")
        assert.equal(skipBadChars(value), true)
        assert.deepEqual(value, password("ajaaaaaa"))
    })

    it("handles a bad letter at the end: 'abcdefgo' -> 'abcdefgp'", () => {
        const value = password("abcdefgo")
        assert.equal(skipBadChars(value), true)
        assert.deepEqual(value, password("abcdefgp"))
    })

    it("leaves a password without bad letters alone", () => {
        const value = password("abcdefgh")
        assert.equal(skipBadChars(value), false)
        assert.deepEqual(value, password("abcdefgh"))
    })
})

describe("2015 day 11: Testing nextPassword", () => {
    // Derived: skipping the i lands on a password that is already valid, so it must be returned, not stepped past.
    it("returns the password the skip lands on when it is already valid: 'abcddiaa' -> 'abcddjaa'", () => {
        assert.equal(nextPassword("abcddiaa"), "abcddjaa")
    })
})

describe("2015 day 11: password validation", () => {
    describe("hasNoBadCharacters", () => {
        it("returns false when the password contains i", () => {
            assert.equal(hasNoBadCharacters(password("aibcdefg")), false)
        })

        it("returns false when the password contains o", () => {
            assert.equal(hasNoBadCharacters(password("abcdefgo")), false)
        })

        it("returns false when the password contains l", () => {
            assert.equal(hasNoBadCharacters(password("labcdefg")), false)
        })

        it("returns true when the password contains no forbidden characters", () => {
            assert.equal(hasNoBadCharacters(password("abcdefgz")), true)
        })
    })

    describe("hasIncreasingStraight", () => {
        it("returns true for a straight at the beginning", () => {
            assert.equal(hasIncreasingStraight(password("abcfaaaa")), true)
        })

        it("returns true for a straight in the middle", () => {
            assert.equal(hasIncreasingStraight(password("aaefgjaa")), true)
        })

        it("returns true for a straight at the end", () => {
            assert.equal(hasIncreasingStraight(password("aaaadxyz")), true)
        })

        it("returns true for a straight longer than three characters", () => {
            assert.equal(hasIncreasingStraight(password("aaefghaa")), true)
        })

        it("returns false for runs of only two increasing letters", () => {
            assert.equal(hasIncreasingStraight(password("abxxdexx")), false)
        })

        it("returns false for a descending sequence", () => {
            assert.equal(hasIncreasingStraight(password("cbaaaaaa")), false)
        })

        it("returns false for an interrupted sequence", () => {
            assert.equal(hasIncreasingStraight(password("abdabdab")), false)
        })

        it("returns false for repeated characters", () => {
            assert.equal(hasIncreasingStraight(password("abbcabbc")), false)
        })

        it("does not wrap from z to a", () => {
            assert.equal(hasIncreasingStraight(password("aaaaayza")), false)
        })
    })

    describe("hasTwoDifferentPairs", () => {
        it("returns true for two different pairs starting with a", () => {
            assert.equal(hasTwoDifferentPairs(password("aabbcdef")), true)
        })

        it("returns true for separated pairs", () => {
            assert.equal(hasTwoDifferentPairs(password("abccdeff")), true)
        })

        it("returns true when the second pair ends the password", () => {
            assert.equal(hasTwoDifferentPairs(password("abcdeeff")), true)
        })

        it("returns true when repeated pairs are followed by a different pair", () => {
            assert.equal(hasTwoDifferentPairs(password("aaaabbcd")), true)
        })

        it("returns false when the password has no pair", () => {
            assert.equal(hasTwoDifferentPairs(password("abcdefgh")), false)
        })

        it("returns false when the password has only one pair", () => {
            assert.equal(hasTwoDifferentPairs(password("aabcdefg")), false)
        })

        it("returns false when overlapping pairs use the same character", () => {
            assert.equal(hasTwoDifferentPairs(password("aaabcdef")), false)
        })

        it("returns false when pairs repeat the same character", () => {
            assert.equal(hasTwoDifferentPairs(password("aaaabcde")), false)
        })
    })

    describe("checkPassword", () => {
        it("returns true for a valid password", () => {
            assert.equal(checkPassword(password("abcdffaa")), true)
        })

        it("returns true for another valid password", () => {
            assert.equal(checkPassword(password("ghjaabcc")), true)
        })

        it("returns false when the password contains i", () => {
            assert.equal(checkPassword(password("abcdiiff")), false)
        })

        it("returns false when the password contains o", () => {
            assert.equal(checkPassword(password("abcdooff")), false)
        })

        it("returns false when the password contains l", () => {
            assert.equal(checkPassword(password("abcdllff")), false)
        })

        it("returns false when the password has no increasing straight", () => {
            assert.equal(checkPassword(password("abdfgghh")), false)
        })

        it("returns false when the password has only one pair", () => {
            assert.equal(checkPassword(password("abcdefgg")), false)
        })

        it("returns false when its pairs are all the same character", () => {
            assert.equal(checkPassword(password("abcggggh")), false)
        })
    })
})

describe("2015 day 11: input check", () => {
    for (const [why, input] of [
        ["that is too short", "abcdefg"],
        ["that is too long", "abcdefghi"],
        ["that is empty", ""],
        ["with an uppercase letter", "Abcdefgh"],
        ["with a digit", "abcdefg1"],
        ["with a space", "abcd efg"],
        ["with a trailing newline", "abcdefgh\n"],
    ]) {
        it(`rejects a password ${why}`, () => {
            assert.throws(() => solve(input!), /expected 8 lowercase letters/)
        })
    }
})

describe("2015 day 11: examples", () => {
    it("part 1: \"abcdefgh\" -> abcdffaa", () => {
        assert.equal(solve("abcdefgh")[0], "abcdffaa")
    })
    it("part 1: \"ghijklmn\" -> ghjaabcc", () => {
        assert.equal(solve("ghijklmn")[0], "ghjaabcc")
    })

    it("part 2: derived from \"abcdefgh\" -> abcdffbb", () => {
        assert.equal(solve("abcdefgh")[1], "abcdffbb")
    })
    it("part 2: derived from \"abcdffaa\" -> abcdffcc", () => {
        assert.equal(solve("abcdffaa")[1], "abcdffcc")
    })
})

fullInputTests(2015, 11, solve)
