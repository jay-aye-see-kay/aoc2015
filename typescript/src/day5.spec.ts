import fs from "fs/promises";
import { part1, part2 } from "./day5";

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

describe("part 2", () => {
  it.each([
    ["qjhvhtzxzqqjkmpb\n", 1],
    ["xxyxx", 1],
    ["uurcxstgmygtbstg", 0],
    ["ieodomkazucvgmuy", 0],
  ])("sample %s", (words, expectedGoodCount) => {
    expect(part2(words)).toEqual(expectedGoodCount);
  });

  it("real answer", async () => {
    const input = await fs.readFile("./src/day5.input", "utf8");
    expect(part2(input)).toEqual(55);
  });
});
