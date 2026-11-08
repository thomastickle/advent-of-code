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

    it("reads positionals, and flags win over them", () => {
        assert.deepEqual(parseSelection(["2015", "03", "1"]).day, 3)
        assert.equal(parseSelection(["2015", "--year=2016"]).year, 2016)
    })

    it("accepts 'all' at any level", () => {
        const sel = parseSelection(["--year=all", "--day=ALL", "--part=all"])
        assert.deepEqual([sel.year, sel.day, sel.part], ["all", "all", "all"])
    })

    it("rejects bad values", () => {
        assert.throws(() => parseSelection(["--part=3"]), UsageError)
        assert.throws(() => parseSelection(["--day=26"]), UsageError)
        assert.throws(() => parseSelection(["--year=abc"]), UsageError)
        assert.throws(() => parseSelection(["--bogus"]), UsageError)
        assert.throws(() => parseSelection(["2015", "1", "1", "extra"]), UsageError)
    })
})
