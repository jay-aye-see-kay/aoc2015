import { part1 } from "./day4";

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
