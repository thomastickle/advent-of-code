import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/** Reads a puzzle input file from `dir`, or returns undefined if it isn't there. */
export function readInput(dir: string, name = "input.txt"): string | undefined {
  const path = join(dir, name);
  return existsSync(path) ? readFileSync(path, "utf8").trimEnd() : undefined;
}
