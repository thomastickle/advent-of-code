# Advent of Code: TypeScript

Plain TypeScript, no framework. Node runs the `.ts` files directly (type stripping), and TypeScript 7 (`tsc`) is used only to type-check.

```sh
npm install
npm run check        # typecheck + tests
npm test             # tests only
npm run typecheck    # tsc --noEmit
npm run aoc          # 🎄 the menu: pick a year, a day, a part (or "all")
node src/2015/day01/day01.ts   # run a single day file directly
```

## Running puzzles

`npm run aoc` opens a menu (arrow keys or j/k, enter to pick, Esc to quit). Choose a year, then a day, then a part. Choosing **All** at any level runs everything below it.

You can skip the menu with flags. npm needs the lone `--` before them:

```sh
npm run aoc -- --year=2015 --day=1 --part=1
npm run aoc -- 2015 1 1                 # same thing
npm run aoc -- --year=2015 --day=all    # a whole year
npm run aoc -- --year=all               # everything
npm run aoc -- --year=2015              # menu for the rest
```

Anything you leave out is asked for, except below an `all`, which means all. Days are found automatically from `src/<year>/dayNN/dayNN.ts`, which must export `part1` and `part2`. A part that throws `not implemented` is shown as still wrapped, and a day with no saved input is shown as missing input.

## Layout

```
src/<year>/dayNN/
  dayNN.ts        part1/part2 exported, runnable directly
  dayNN.test.ts   example cases first, then the full input
src/input.ts      shared helpers (reads ../inputs, see below)
src/cli/          the `npm run aoc` menu and runner
```

Each test file checks the examples from the puzzle text, then runs the real input against recorded answers. The full-input tests skip themselves when the input is missing or no expected answer has been recorded yet.

## Inputs

Puzzle inputs are not committed. Save them to `../inputs/<year>/dayNN.txt` (for example `../inputs/2015/day01.txt`), or point `AOC_INPUTS_DIR` at another directory with the same layout. See [`../inputs/README.md`](../inputs/README.md).

`tsconfig.json` sets `erasableSyntaxOnly`, so the checker rejects syntax Node can't strip (enums, namespaces, parameter properties).
