import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

/** Where puzzle inputs live: `<repo>/inputs`, or `AOC_INPUTS_DIR` if set. Never committed. */
const inputsDir = process.env["AOC_INPUTS_DIR"] ?? resolve(import.meta.dirname, "../../inputs");

/** Path of the input file for a given day, e.g. inputs/2015/day01.txt. */
export function inputPath(year: number, day: number): string {
  return join(inputsDir, String(year), `day${String(day).padStart(2, "0")}.txt`);
}

/** Reads a day's puzzle input, or returns undefined if it hasn't been saved. */
export function readInput(year: number, day: number): string | undefined {
  const path = inputPath(year, day);
  return existsSync(path) ? readFileSync(path, "utf8").trimEnd() : undefined;
}
