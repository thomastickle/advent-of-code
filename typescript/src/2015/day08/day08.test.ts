import assert from "node:assert/strict"
import {describe, it} from "node:test"
import {fullInputTests} from "../../testing.ts"
import {solve} from "./day08.ts"

describe("2015 day 08: examples", () => {
    // The page gives each line's characters of code and characters in memory. The answer for one line is the first
    // minus the second, so these per-line results are derived by subtraction. The last case runs all four as lines.
    it("part 1: the empty string literal (2 of code, 0 in memory) -> 2", () => {
        assert.equal(solve("\"\"")[0], 2)
    })
    it("part 1: abc (5 of code, 3 in memory) -> 2", () => {
        assert.equal(solve("\"abc\"")[0], 2)
    })
    it("part 1: aaa with an escaped quote (10 of code, 7 in memory) -> 3", () => {
        assert.equal(solve("\"aaa\\\"aaa\"")[0], 3)
    })
    it("part 1: a hex escape, x27 (6 of code, 1 in memory) -> 5", () => {
        assert.equal(solve("\"\\x27\"")[0], 5)
    })
    // Code characters minus in-memory characters over all four example lines: (2 + 5 + 10 + 6) - (0 + 3 + 7 + 1).
    it("part 1: the example (4 lines) -> 12", () => {
        const input = [
            "\"\"",
            "\"abc\"",
            "\"aaa\\\"aaa\"",
            "\"\\x27\"",
        ].join("\n")
        assert.equal(solve(input)[0], 12)
    })

    // Part 2 gives each line's encoded length and its code length. The answer for one line is the first minus the
    // second, so these per-line results are derived by subtraction. The last case is the page's own total, 42 - 23.
    it("part 2: the empty string literal (encodes to 6, from 2) -> 4", () => {
        assert.equal(solve("\"\"")[1], 4)
    })
    it("part 2: abc (encodes to 9, from 5) -> 4", () => {
        assert.equal(solve("\"abc\"")[1], 4)
    })
    it("part 2: aaa with an escaped quote (encodes to 16, from 10) -> 6", () => {
        assert.equal(solve("\"aaa\\\"aaa\"")[1], 6)
    })
    it("part 2: a hex escape, x27 (encodes to 11, from 6) -> 5", () => {
        assert.equal(solve("\"\\x27\"")[1], 5)
    })
    it("part 2: the example (4 lines) -> 19", () => {
        const input = [
            "\"\"",
            "\"abc\"",
            "\"aaa\\\"aaa\"",
            "\"\\x27\"",
        ].join("\n")
        assert.equal(solve(input)[1], 19)
    })
})

describe("2015 day 08: input handling", () => {
    it("part 1 ignores a trailing newline", () => {
        assert.equal(solve("\"abc\"\n")[0], 2)
    })
    it("part 2 ignores a trailing newline", () => {
        assert.equal(solve("\"abc\"\n")[1], 4)
    })
    it("part 2 ignores a blank line between literals", () => {
        assert.equal(solve("\"abc\"\n\n\"abc\"")[1], 8)
    })
    it("counts an escaped backslash followed by x27 as four characters", () => {
        // "\\x27" is 7 characters of code and 4 in memory (backslash, x, 2, 7).
        assert.equal(solve("\"\\\\x27\"")[0], 3)
    })
    it("counts adjacent escapes", () => {
        // "\"\\" is 6 characters of code and 2 in memory (a quote, a backslash).
        assert.equal(solve("\"\\\"\\\\\"")[0], 4)
    })
    it("part 1 rejects a line without quotes", () => {
        assert.throws(() => solve("abc")[0], /Invalid line/)
    })
    it("part 1 rejects a lone quote", () => {
        assert.throws(() => solve("\"")[0], /Invalid line/)
    })
    it("part 1 rejects an unescaped quote inside", () => {
        assert.throws(() => solve("\"a\"b\"")[0], /Invalid line/)
    })
    it("part 1 rejects an unknown escape", () => {
        assert.throws(() => solve("\"\\q\"")[0], /Invalid line/)
    })
    it("part 1 rejects a truncated hex escape", () => {
        assert.throws(() => solve("\"\\x4\"")[0], /Invalid line/)
    })
    it("part 1 rejects a hex escape with non-hex digits", () => {
        assert.throws(() => solve("\"\\xzz\"")[0], /Invalid line/)
    })
    it("part 1 rejects an escaped closing quote", () => {
        assert.throws(() => solve("\"abc\\\"")[0], /Invalid line/)
    })
})

fullInputTests(2015, 8, solve)
