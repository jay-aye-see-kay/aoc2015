import fs from "fs/promises";
import { part1, part2 } from "./day3";

describe("part 1", () => {
  it.each([
    [">\n", 2],
    ["^>v<\n", 4],
    ["^v^v^v^v^v\n", 2],
  ])("sample %s", (directions, expected) => {
    expect(part1(directions)).toEqual(expected);
  });

  it("real answer", async () => {
    const input = await fs.readFile("../inputs/day3.txt", "utf8");
    expect(part1(input)).toEqual(2572);
  });
});

describe("part 2", () => {
  it.each([
    ["^v\n", 3],
    ["^>v<\n", 3],
    ["^v^v^v^v^v\n", 11],
  ])("sample %s", (directions, expected) => {
    expect(part2(directions)).toEqual(expected);
  });

  it("real answer", async () => {
    const input = await fs.readFile("../inputs/day3.txt", "utf8");
    expect(part2(input)).toEqual(2631);
  });
});
