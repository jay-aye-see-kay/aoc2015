import { part1, part2 } from "./day4";

describe("part 1", () => {
  it.each([
    ["abcdef", 609043],
    ["pqrstuv", 1048970],
  ])("sample %s", (secretKey, answer) => {
    expect(part1(secretKey)).toEqual(answer);
  });

  it("real answer", async () => {
    expect(part1("ckczppom")).toEqual(117946);
  });
});

describe("part 2", () => {
  it("real answer", async () => {
    expect(part2("ckczppom")).toEqual(3938038);
  });
});
