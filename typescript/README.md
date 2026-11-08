# Advent of Code: TypeScript

Plain TypeScript, no framework. Node runs the `.ts` files directly (type stripping), and TypeScript 7 (`tsc`) is used only to type-check.

```sh
npm install
npm run check        # typecheck + tests
npm test             # tests only
npm run typecheck    # tsc --noEmit
node src/2015/day01/day01.ts   # run a day against its saved input
```

## Layout

```
src/<year>/dayNN/
  dayNN.ts        part1/part2 exported, runnable directly
  dayNN.test.ts   example cases first, then the full input
src/input.ts      shared helpers (reads ../inputs, see below)
```

Each test file checks the examples from the puzzle text, then runs the real input against recorded answers. The full-input tests skip themselves when the input is missing or no expected answer has been recorded yet.

## Inputs

Puzzle inputs are not committed. Save them to `../inputs/<year>/dayNN.txt` (for example `../inputs/2015/day01.txt`), or point `AOC_INPUTS_DIR` at another directory with the same layout. See [`../inputs/README.md`](../inputs/README.md).

`tsconfig.json` sets `erasableSyntaxOnly`, so the checker rejects syntax Node can't strip (enums, namespaces, parameter properties).
