# TypeScript

Raw TypeScript for Advent of Code, run directly by Node's built-in type stripping (no bundler, no framework).
The repo-wide rules in `../AGENTS.md` apply as well: the user writes the solutions, never touch `inputs/`, and so on.

## Commands

- `npm run aoc` is the themed runner: a menu, or `npm run aoc -- --year=2015 --day=3 --part=1`.
- `npm test` runs every test through the quiet tree reporter (`src/cli/reporter.ts`); `npm run test:verbose` uses the
  standard reporter.
- `npm run typecheck` runs `tsc --noEmit`; `npm run check` runs typecheck and tests.

## Layout

- `src/<year>/dayNN/dayNN.ts` exports `solve(input)`, which returns both answers as `[part1, part2]`
  (`Answers<T>` from `src/answers.ts`), so part 2 can build on part 1's work instead of starting over. Its runner block
  at the bottom is `printAnswers(year, day, solve)`. A day may also export helpers (or `part1`/`part2`) for the
  examples to test.
- A part that isn't done yet returns `unsolved` in its slot, e.g. `[floor, unsolved]`. New days start as
  `return [unsolved, unsolved]`; helper stubs still throw "not implemented". This replaces the repo-wide "throws not
  implemented" rule for the parts themselves. Day 25 has no part 2 puzzle, so its part 2 stays `unsolved`.
- `src/<year>/dayNN/dayNN.test.ts` has the examples first, then `fullInputTests(year, day, solve)`.
- `src/input.ts` reads `inputs/<year>/dayNN.txt` (`readInput`) and the user's answers (`readExpected`).
- `src/testing.ts` has the test helpers:
  - `pending()`: wrap a test body in it so an unsolved part, or a helper that still throws "not implemented", is
    reported as skipped instead of failing.
  - `answer(solve(example), 1)`: picks one part out of `solve`'s result inside `pending()`.
  - `fullInputTests()`: declares both full-input tests. It runs `solve` once and both tests share the result.
- `solve` always computes both parts, even for an example that only applies to one. If the other part can't handle
  that example (it throws or runs too long), have the example test a helper instead, or give `solve` an option with a
  default (as days 14, 17 and 18 do).
- `src/cli/` is the runner, menu, theme and reporter.

## Style

- 4-space indents (spaces, never tabs), no semicolons, double quotes, tight braces (`{a, b}`), trailing commas when a
  list spans lines, lines at most 120 columns. `.editorconfig` encodes this for the IDE.
- **Do not run Prettier or any other auto-formatter over files.** The user dislikes how it chops lines and only aligns
  them on the left. Write the layout by hand; the user reformats in WebStorm, which keeps existing line breaks.
- Check by hand for stray semicolons (`grep -n ';$'`) and long lines (`awk 'length>120'`).
- Strict TypeScript: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` and `erasableSyntaxOnly` are on, so no
  enums or parameter properties, and `array[i]` can be `undefined`.
- Prefer a function passed in to repeated loops: one shared helper that both parts call, with the per-puzzle rule
  passed as an argument.
- Throw on malformed input instead of silently guessing a default.

## Documentation

Every function gets JSDoc in this shape: a summary line, a `@param` for each parameter that says what it holds and
spells out the input format with an example (`"<length>x<width>x<height>", e.g. "2x3x4"`), a `@returns` with the units,
and `@throws` where it applies. Say why a non-obvious choice was made, such as a faster API, in a short clause rather
than a paragraph. The function's name should already say what it does (see "Writing code" in `../AGENTS.md`).

Write every JSDoc block in the multi-line Javadoc/KDoc form, even when it holds one sentence; never the one-line
`/** ... */` form:

```ts
/**
 * A reindeer's standing in the race, updated each second.
 */
```

Interfaces get one summary comment above them; their fields don't get their own comments.

Each day's file starts with a plain block comment (not JSDoc) naming the puzzle, before the imports:

```ts
/*
 * 2015 day 9: All in a Single Night. https://adventofcode.com/2015/day/9
 */
```

## Performance

Measure before optimizing, and throw the benchmark script away afterwards (use the scratchpad, not the repo). Choose a
better algorithm or data structure first; constant factors second.
