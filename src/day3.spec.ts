import fs from "fs/promises";
import { part1 } from "./day3";

describe("part 1", () => {
  it.each([
    [">\n", 2],
    ["^>v<\n", 4],
    ["^v^v^v^v^v\n", 2],
  ])("sample %s", (directions, expected) => {
    expect(part1(directions)).toEqual(expected);
  });

  it("real answer", async () => {
    const input = await fs.readFile("./src/day3.input", "utf8");
    expect(part1(input)).toEqual(2572);
  });
});
