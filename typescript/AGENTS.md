# TypeScript

Raw TypeScript for Advent of Code, run directly by Node's built-in type stripping (no bundler, no framework).
The repo-wide rules in `../AGENTS.md` apply as well: the user writes the solutions, never touch `inputs/`, and so on.

## Commands

- `npm run aoc` is the themed runner: a menu, or `npm run aoc -- --year=2015 --day=3 --part=1`.
- `npm test` runs every test through the quiet tree reporter (`src/cli/reporter.ts`); `npm run test:verbose` uses the
  standard reporter.
- `npm run typecheck` runs `tsc --noEmit`; `npm run check` runs typecheck and tests.

## Layout

- `src/<year>/dayNN/dayNN.ts` exports `part1(input)` and `part2(input)` and has a small runner block at the bottom.
- `src/<year>/dayNN/dayNN.test.ts` has the examples first, then the full-input tests.
- `src/input.ts` reads `inputs/<year>/dayNN.txt` (`readInput`) and the user's answers (`readExpected`).
- `src/testing.ts` has `pending()`: wrap a test body in it so a part that still throws "not implemented" is reported as
  skipped instead of failing.
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
and `@throws` where it applies. Say why a non-obvious choice was made, such as a faster API.

## Performance

Measure before optimizing, and throw the benchmark script away afterwards (use the scratchpad, not the repo). Choose a
better algorithm or data structure first; constant factors second.
