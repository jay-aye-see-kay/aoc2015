import fs from "fs/promises";
import { part1, part2 } from "./day2";

describe("part 1", () => {
  it.each([
    ["2x3x4\n", 58],
    ["1x1x10\n", 43],
  ])("sample %s", (dimensions, expected) => {
    expect(part1(dimensions)).toEqual(expected);
  });

  it("real answer", async () => {
    const input = await fs.readFile("./src/day2.input", "utf8");
    expect(part1(input)).toEqual(1606483);
  });
});

describe("part 2", () => {
  it.each([
    ["2x3x4\n", 34],
    ["1x1x10\n", 14],
  ])("sample %s", (dimensions, expected) => {
    expect(part2(dimensions)).toEqual(expected);
  });

  it("real answer", async () => {
    const input = await fs.readFile("./src/day2.input", "utf8");
    expect(part2(input)).toEqual(3842356);
  });
});
