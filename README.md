# Advent of Code

My [Advent of Code](https://adventofcode.com) solutions, grouped by language. I often use AoC as a trial run for a new language.

Each language lives in its own top-level directory (`go/`, `rust/`, `kotlin/`, ...), with its own README for building and running it.

## Where things live

`master` holds only the shared top-level files. Each language's history was brought over from its earlier single-language repo, with authors, dates and messages preserved, and lives on its own branch until it is deliberately merged:

- `<lang>` — the language's history, rebuilt on top of `master` with the code under `<lang>/`.
- `original/<lang>` — the untouched original history, with the original commit hashes.

| Language | Year(s) | Branch |
|---|---|---|
| Go | 2023 | `go` |
| Rust | 2025 | `rust` |
