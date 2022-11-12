use std::collections::HashSet;

struct Person {
    x: i32,
    y: i32,
}

impl Person {
    fn new() -> Self {
        Self { x: 0, y: 0 }
    }

    fn pos(&self) -> (i32, i32) {
        (self.x, self.y)
    }

    fn step(&mut self, direction: char) -> &Self {
        match direction {
            '^' => self.x += 1,
            'v' => self.x -= 1,
            '>' => self.y += 1,
            '<' => self.y -= 1,
            _ => {}
        };
        self
    }
}

/// --- Day 3: Perfectly Spherical Houses in a Vacuum ---
///
/// Santa is delivering presents to an infinite two-dimensional grid of houses.
///
/// He begins by delivering a present to the house at his starting location, and
/// then an elf at the North Pole calls him via radio and tells him where to move
/// next. Moves are always exactly one house to the north (^), south (v), east (>),
/// or west (<). After each move, he delivers another present to the house at his
/// new location.
///
/// However, the elf back at the north pole has had a little too much eggnog, and
/// so his directions are a little off, and Santa ends up visiting some houses more
/// than once. How many houses receive at least one present?
///
/// For example:
///
/// - > delivers presents to 2 houses: one at the starting location, and one to the
///   east.
/// - ^>v< delivers presents to 4 houses in a square, including twice to the house
///   at his starting/ending location.
/// - ^v^v^v^v^v delivers a bunch of presents to some very lucky children at only 2
///   houses.
fn part1(input: &str) -> usize {
    let mut santa = Person::new();
    let mut visited: HashSet<(i32, i32)> = HashSet::new();
    visited.insert(santa.pos());

    for char in input.chars() {
        santa.step(char);
        visited.insert(santa.pos());
    }

    visited.len()
}

/// --- Part Two ---
///
/// The next year, to speed up the process, Santa creates a robot version of
/// himself, Robo-Santa, to deliver presents with him.
///
/// Santa and Robo-Santa start at the same location (delivering two presents to the
/// same starting house), then take turns moving based on instructions from the
/// elf, who is eggnoggedly reading from the same script as the previous year.
///
/// This year, how many houses receive at least one present?
///
/// For example:
///
/// - ^v delivers presents to 3 houses, because Santa goes north, and then
///   Robo-Santa goes south.
/// - ^>v< now delivers presents to 3 houses, and Santa and Robo-Santa end up back
///   where they started.
/// - ^v^v^v^v^v now delivers presents to 11 houses, with Santa going one direction
///   and Robo-Santa going the other.
fn part2(input: &str) -> usize {
    let mut santa = Person::new();
    let mut robo_santa = Person::new();
    let mut visited = HashSet::from([santa.pos()]);
    let mut is_santa = true;

    for char in input.chars() {
        visited.insert(match is_santa {
            true => santa.step(char).pos(),
            false => robo_santa.step(char).pos(),
        });
        is_santa = !is_santa;
    }

    visited.len()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::read_input;

    #[test]
    fn test_part_1_samples() {
        let test_cases = vec![(">\n", 2), ("^>v<\n", 4), ("^v^v^v^v^v\n", 2)];
        test_cases.iter().for_each(|(input, expected)| {
            assert_eq!(part1(&input), *expected);
        });
    }

    #[test]
    fn test_part_1_real() {
        let input = read_input(3);
        assert_eq!(part1(&input), 2572);
    }

    #[test]
    fn test_part_2_samples() {
        let test_cases = vec![("^v\n", 3), ("^>v<\n", 3), ("^v^v^v^v^v\n", 11)];
        test_cases.iter().for_each(|(input, expected)| {
            assert_eq!(part2(&input), *expected);
        });
    }

    #[test]
    fn test_part_2_real() {
        let input = read_input(3);
        assert_eq!(part2(&input), 2631);
    }
}
