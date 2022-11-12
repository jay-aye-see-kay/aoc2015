use std::{io, str::FromStr};

#[derive(Debug)]
struct Dim {
    l: i32,
    w: i32,
    h: i32,
}
fn parse_input(input: &str) -> Vec<Dim> {
    input
        .trim()
        .split('\n')
        .map(|line| {
            let edges: Vec<i32> = line.split('x').filter_map(|str| str.parse().ok()).collect();
            Dim {
                l: edges[0],
                w: edges[1],
                h: edges[2],
            }
        })
        .collect()
}

/// --- Day 2: I Was Told There Would Be No Math ---
///
/// The elves are running low on wrapping paper, and so they need to submit an
/// order for more. They have a list of the dimensions (length l, width w, and
/// height h) of each present, and only want to order exactly as much as they need.
///
/// Fortunately, every present is a box (a perfect right rectangular prism), which
/// makes calculating the required wrapping paper for each gift a little easier:
/// find the surface area of the box, which is 2*l*w + 2*w*h + 2*h*l. The elves
/// also need a little extra paper for each present: the area of the smallest side.
///
/// For example:
///
/// - A present with dimensions 2x3x4 requires 2*6 + 2*12 + 2*8 = 52 square feet
///   of wrapping paper plus 6 square feet of slack, for a total of 58 square feet.
/// - A present with dimensions 1x1x10 requires 2*1 + 2*10 + 2*10 = 42 square feet
///   of wrapping paper plus 1 square foot of slack, for a total of 43 square feet.
///
/// All numbers in the elves' list are in feet. How many total square feet of
/// wrapping paper should they order?
fn part1(input: &str) -> i32 {
    parse_input(input)
        .iter()
        .map(|Dim { l, w, h }| {
            let sides = [l * w, w * h, h * l];
            let smallest_side = sides.iter().min().unwrap();
            smallest_side + sides.iter().map(|s| s * 2).sum::<i32>()
        })
        .sum()
}

/// --- Part Two ---
///
/// The elves are also running low on ribbon. Ribbon is all the same width, so they
/// only have to worry about the length they need to order, which they would again
/// like to be exact.
///
/// The ribbon required to wrap a present is the shortest distance around its
/// sides, or the smallest perimeter of any one face. Each present also requires a
/// bow made out of ribbon as well; the feet of ribbon required for the perfect bow
/// is equal to the cubic feet of volume of the present. Don't ask how they tie
/// the bow, though; they'll never tell.
///
/// For example:
///
/// - A present with dimensions 2x3x4 requires 2+2+3+3 = 10 feet of ribbon to wrap
///   the present plus 2*3*4 = 24 feet of ribbon for the bow, for a total of 34
///   feet.
/// - A present with dimensions 1x1x10 requires 1+1+1+1 = 4 feet of ribbon to wrap
///   the present plus 1*1*10 = 10 feet of ribbon for the bow, for a total of 14
///   feet.
///
/// How many total feet of ribbon should they order?
fn part2(input: &str) -> i32 {
    parse_input(input)
        .iter()
        .map(|Dim { l, w, h }| {
            let perimeters = [2 * l + 2 * w, 2 * w + 2 * h, 2 * h + 2 * l];
            let smallest_perimeter = perimeters.iter().min().unwrap();
            let volume = l * w * h;
            smallest_perimeter + volume
        })
        .sum()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::read_input;

    #[test]
    fn test_part_1_samples() {
        let test_cases = vec![("2x3x4\n", 58), ("1x1x10\n", 43)];
        test_cases.iter().for_each(|(input, expected)| {
            assert_eq!(part1(&input), *expected);
        });
    }

    #[test]
    fn test_part_1_real() {
        let input = read_input(2);
        assert_eq!(part1(&input), 1606483);
    }

    #[test]
    fn test_part_2_samples() {
        let test_cases = vec![("2x3x4\n", 34), ("1x1x10\n", 14)];
        test_cases.iter().for_each(|(input, expected)| {
            assert_eq!(part2(&input), *expected);
        });
    }

    #[test]
    fn test_part_2_real() {
        let input = read_input(2);
        assert_eq!(part2(&input), 3842356);
    }
}
