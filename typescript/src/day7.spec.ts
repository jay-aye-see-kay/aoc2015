import fs from "fs/promises";
import { part1, part2 } from "./day7";

describe("part 1", () => {
  it("sample", () => {
    const input =
      "123 -> x\n" +
      "456 -> y\n" +
      "x AND y -> d\n" +
      "x OR y -> e\n" +
      "x LSHIFT 2 -> f\n" +
      "y RSHIFT 2 -> g\n" +
      "NOT x -> h\n" +
      "NOT y -> i\n";

    expect(part1(input)).toEqual({
      d: 72,
      e: 507,
      f: 492,
      g: 114,
      h: 65412,
      i: 65079,
      x: 123,
      y: 456,
    });
  });

  it("real answer", async () => {
    const input = await fs.readFile("../inputs/day7.txt", "utf8");
    expect(part1(input).a).toEqual(3176);
  });
});

describe("part 2", () => {
  it("real answer", async () => {
    const input = await fs.readFile("../inputs/day7.txt", "utf8");
    expect(part2(input).a).toEqual(14710);
  });
});
