import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { parseSelection, UsageError } from "./args.ts"

describe("parseSelection", () => {
    it("returns nothing selected when there are no arguments", () => {
        assert.deepEqual(parseSelection([]), { year: undefined, day: undefined, part: undefined, help: false })
    })

    it("reads flags", () => {
        const sel = parseSelection(["--year=2015", "--day=1", "--part=2"])
        assert.deepEqual([sel.year, sel.day, sel.part], [2015, 1, 2])
    })

    it("reads positionals", () => {
        assert.deepEqual(parseSelection(["2015", "03", "1"]).day, 3)
    })

    it("lets a flag win over a positional", () => {
        assert.equal(parseSelection(["2015", "--year=2016"]).year, 2016)
    })

    it("accepts 'all' at any level", () => {
        const sel = parseSelection(["--year=all", "--day=ALL", "--part=all"])
        assert.deepEqual([sel.year, sel.day, sel.part], ["all", "all", "all"])
    })

    it("rejects a part above 2", () => {
        assert.throws(() => parseSelection(["--part=3"]), UsageError)
    })
    it("rejects a day above 25", () => {
        assert.throws(() => parseSelection(["--day=26"]), UsageError)
    })
    it("rejects a year that is not a number", () => {
        assert.throws(() => parseSelection(["--year=abc"]), UsageError)
    })
    it("rejects an unknown flag", () => {
        assert.throws(() => parseSelection(["--bogus"]), UsageError)
    })
    it("rejects an extra positional argument", () => {
        assert.throws(() => parseSelection(["2015", "1", "1", "extra"]), UsageError)
    })
})
