# Advent of Code

Advent of Code solutions, grouped by language in one folder each (`go/`, `rust/`, `typescript/`, ...).
Language-specific rules live in that folder's own `AGENTS.md`; this file holds what applies to every language.

## The user writes the solutions

- Do not implement puzzle solutions. Build scaffolding, tooling and tests, and leave each part as a stub that throws
  "not implemented".
- Reviewing, refactoring, documenting or speeding up code the user has written is fine when asked.
- Do not commit the user's in-progress solution files.

## Tests

- Each day's tests check the puzzle's own examples first, then the full input.
- Only record examples that appear on the puzzle page. If one is derived (for example by summing two examples), say so
  in a comment.
- The user's answers to their own input are specific to that input, so they are never committed (see below).

## Puzzle inputs and answers

- Real inputs live in `inputs/<year>/dayNN.txt` at the repo root. The folder is git-ignored. Never commit inputs, and
  do not copy puzzle text into the repo (the Advent of Code FAQ asks people not to redistribute it).
- **Never write, overwrite or delete anything in `inputs/`.** To test the runner or the tests, point `AOC_INPUTS_DIR` at
  a scratch directory and put fake data there.
- The user's recorded answers live beside the inputs in `inputs/<year>/dayNN.expected.json`, for example
  `{"part1": 1, "part2": 2}`. They are git-ignored for the same reason.

## Git

- The default branch is `master`, not `main`.
- `master` holds only finished languages. A new language is developed on its own branch (for example `typescript`) and
  merged with `--no-ff` once the user says it is done.
- Commit and push only when asked. Do not add co-author or "generated with" trailers to commits or pull requests.
- `origin` pushes to both GitHub and GitLab, so one `git push` updates both. A force-push goes to both.
- Do not rewrite pushed history unless asked.
