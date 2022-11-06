/** 
--- Day 3: Perfectly Spherical Houses in a Vacuum ---

Santa is delivering presents to an infinite two-dimensional grid of houses.

He begins by delivering a present to the house at his starting location, and
then an elf at the North Pole calls him via radio and tells him where to move
next. Moves are always exactly one house to the north (^), south (v), east (>),
or west (<). After each move, he delivers another present to the house at his
new location.

However, the elf back at the north pole has had a little too much eggnog, and
so his directions are a little off, and Santa ends up visiting some houses more
than once. How many houses receive at least one present?

For example:

- > delivers presents to 2 houses: one at the starting location, and one to the 
  east.
- ^>v< delivers presents to 4 houses in a square, including twice to the house 
  at his starting/ending location.
- ^v^v^v^v^v delivers a bunch of presents to some very lucky children at only 2 
  houses.
*/
export function part1(input: string) {
  const santa = new Position();
  const visited = new Set();
  visited.add(santa.toString());

  for (const movement of input) {
    switch (movement) {
      case "^":
        santa.y += 1;
        break;
      case "v":
        santa.y -= 1;
        break;
      case ">":
        santa.x += 1;
        break;
      case "<":
        santa.x -= 1;
        break;
    }
    visited.add(santa.toString());
  }
  return visited.size;
}

/** 
--- Part Two ---

The next year, to speed up the process, Santa creates a robot version of
himself, Robo-Santa, to deliver presents with him.

Santa and Robo-Santa start at the same location (delivering two presents to the
same starting house), then take turns moving based on instructions from the
elf, who is eggnoggedly reading from the same script as the previous year.

This year, how many houses receive at least one present?

For example:

- ^v delivers presents to 3 houses, because Santa goes north, and then
  Robo-Santa goes south.
- ^>v< now delivers presents to 3 houses, and Santa and Robo-Santa end up back
  where they started.
- ^v^v^v^v^v now delivers presents to 11 houses, with Santa going one direction
  and Robo-Santa going the other.
*/
export function part2(input: string) {
  const santa = new Position();
  const robot = new Position();
  const visited = new Set();
  visited.add(santa.toString());

  let movedThing;
  for (const movement of input) {
    movedThing = movedThing === santa ? robot : santa;
    switch (movement) {
      case "^":
        movedThing.y += 1;
        break;
      case "v":
        movedThing.y -= 1;
        break;
      case ">":
        movedThing.x += 1;
        break;
      case "<":
        movedThing.x -= 1;
        break;
    }
    visited.add(movedThing.toString());
  }
  return visited.size;
}

// ---

class Position {
  x = 0;
  y = 0;
  toString() {
    return `${this.x},${this.y}`;
  }
}
