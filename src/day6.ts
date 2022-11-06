/** 
--- Day 6: Probably a Fire Hazard ---

Because your neighbors keep defeating you in the holiday house decorating
contest year after year, you've decided to deploy one million lights in a
1000x1000 grid.

Furthermore, because you've been especially nice this year, Santa has mailed
you instructions on how to display the ideal lighting configuration.

Lights in your grid are numbered from 0 to 999 in each direction; the lights at
each corner are at 0,0, 0,999, 999,999, and 999,0. The instructions include
whether to turn on, turn off, or toggle various inclusive ranges given as
coordinate pairs. Each coordinate pair represents opposite corners of a
rectangle, inclusive; a coordinate pair like 0,0 through 2,2 therefore refers
to 9 lights in a 3x3 square. The lights all start turned off.

To defeat your neighbors this year, all you have to do is set up your lights by
doing the instructions Santa sent you in order.

For example:

- turn on 0,0 through 999,999 would turn on (or leave on) every light.
- toggle 0,0 through 999,0 would toggle the first line of 1000 lights, turning
  off the ones that were on, and turning on the ones that were off.
- turn off 499,499 through 500,500 would turn off (or leave off) the middle
  four lights.

After following the instructions, how many lights are lit?
*/
export function part1(input: string) {
  const lights = new Set();
  const instructions = parse(input);
  for (const { type, start, end } of instructions) {
    const [minX, maxX] = [start[0], end[0]];
    const [minY, maxY] = [start[1], end[1]];
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        const posStr = `${x},${y}`;
        switch (type) {
          case "on":
            lights.add(posStr);
            break;
          case "off":
            lights.delete(posStr);
            break;
          case "toggle":
            if (lights.has(posStr)) {
              lights.delete(posStr);
            } else {
              lights.add(posStr);
            }
            break;
        }
      }
    }
  }
  return lights.size;
}

function parse(input: string) {
  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => !!line);

  return lines.map((line) => {
    let type: "on" | "off" | "toggle";
    if (line.startsWith("turn on ")) {
      type = "on";
    } else if (line.startsWith("turn off ")) {
      type = "off";
    } else if (line.startsWith("toggle ")) {
      type = "toggle";
    } else {
      throw new Error(`unknown line ${line}`);
    }
    const [start, end] = line
      .replace(/(turn on )|(turn off )|(toggle )/g, "")
      .split(" through ")
      .map((coord) => coord.split(",").map((c) => parseInt(c, 10)));
    return { type, start, end };
  });
}
