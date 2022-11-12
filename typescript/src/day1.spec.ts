import fs from "fs/promises";
import { part1, part2 } from "./day1";

describe("part 1", () => {
  it.each([
    ["(())", 0],
    ["()()", 0],
    ["(((", 3],
    ["(()(()(", 3],
    ["())", -1],
    ["))(", -1],
    [")))", -3],
    [")())())", -3],
  ])("sample %s", (movements, expected) => {
    expect(part1(movements)).toEqual(expected);
  });

  it("real answer", async () => {
    const input = await fs.readFile("./src/day1.input", "utf8");
    expect(part1(input)).toEqual(280);
  });
});

describe("part 1", () => {
  it.each([
    [")", 1],
    ["()())", 5],
  ])("sample %s", (movements, expected) => {
    expect(part2(movements)).toEqual(expected);
  });

  it("real answer", async () => {
    const input = await fs.readFile("./src/day1.input", "utf8");
    expect(part2(input)).toEqual(1797);
  });
});
