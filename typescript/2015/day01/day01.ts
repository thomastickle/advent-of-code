import { readInput } from "../../src/input.ts";

/** Day 1: Not Quite Lisp. '(' goes up a floor, ')' goes down. */
export function part1(input: string): number {
  let floor = 0;
  for (const c of input) {
    if (c === "(") floor++;
    else if (c === ")") floor--;
  }
  return floor;
}

/** 1-based position of the first character that sends Santa to the basement. */
export function part2(input: string): number {
  let floor = 0;
  let position = 0;
  for (const c of input) {
    position++;
    if (c === "(") floor++;
    else if (c === ")") floor--;
    if (floor === -1) return position;
  }
  throw new Error("Santa never enters the basement");
}

if (import.meta.main) {
  const input = readInput(import.meta.dirname);
  if (input === undefined) {
    console.error("No input.txt found next to this file.");
    process.exit(1);
  }
  console.log("part 1:", part1(input));
  console.log("part 2:", part2(input));
}
