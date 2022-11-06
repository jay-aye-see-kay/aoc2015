import fs from "fs/promises";
import { part1 } from "./day6";

describe("part 1", () => {
  it.each([
    ["turn on 0,0 through 999,999\n", 1_000_000],
    ["toggle 0,0 through 999,0\n", 1000],
    ["turn off 499,499 through 500,500\n", 0],
  ])("sample %s", (instructions, lightsOnCount) => {
    expect(part1(instructions)).toEqual(lightsOnCount);
  });

  it("real answer", async () => {
    const input = await fs.readFile("./src/day6.input", "utf8");
    expect(part1(input)).toEqual(377891);
  });
});
