import fs from "fs/promises";
import { part1 } from "./day2";

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
