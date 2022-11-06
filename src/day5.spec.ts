import fs from "fs/promises";
import { part1 } from "./day5";

describe("part 1", () => {
  it.each([
    ["ugknbfddgicrmopn\n", 1],
    ["aaa\n", 1],
    ["jchzalrnumimnmhp\n", 0],
    ["haegwjzuvuyypxyu\n", 0],
    ["dvszwmarrgswjxmb\n", 0],
  ])("sample %s", (words, expectedGoodCount) => {
    expect(part1(words)).toEqual(expectedGoodCount);
  });

  it("real answer", async () => {
    const input = await fs.readFile("./src/day5.input", "utf8");
    expect(part1(input)).toEqual(255);
  });
});
