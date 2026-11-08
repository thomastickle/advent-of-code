import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readInput } from "../../src/input.ts";
import { part1, part2 } from "./day01.ts";

describe("2015 day 01: examples", () => {
  const part1Cases: [string, number][] = [
    ["(())", 0],
    ["()()", 0],
    ["(((", 3],
    ["(()(()(", 3],
    ["))(((((", 3],
    ["())", -1],
    ["))(", -1],
    [")))", -3],
    [")())())", -3],
  ];
  for (const [input, expected] of part1Cases) {
    it(`part 1: ${input} -> ${expected}`, () => {
      assert.equal(part1(input), expected);
    });
  }

  const part2Cases: [string, number][] = [
    [")", 1],
    ["()())", 5],
  ];
  for (const [input, expected] of part2Cases) {
    it(`part 2: ${input} -> ${expected}`, () => {
      assert.equal(part2(input), expected);
    });
  }
});

// Fill these in once you've solved it, so the full input stays a regression test.
const expected: { part1?: number; part2?: number } = {};

const input = readInput(import.meta.dirname);
const skip = (answer: number | undefined) =>
  input === undefined ? "no input.txt" : answer === undefined ? "expected answer not recorded yet" : false;

describe("2015 day 01: full input", () => {
  it("part 1", { skip: skip(expected.part1) }, () => {
    assert.equal(part1(input!), expected.part1);
  });
  it("part 2", { skip: skip(expected.part2) }, () => {
    assert.equal(part2(input!), expected.part2);
  });
});
