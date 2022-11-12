/// Santa was hoping for a white Christmas, but his weather machine's "snow"
/// function is powered by stars, and he's fresh out! To save Christmas, he needs
/// you to collect fifty stars by December 25th.
/// 
/// Collect stars by helping Santa solve puzzles. Two puzzles will be made
/// available on each day in the Advent calendar; the second puzzle is unlocked
/// when you complete the first. Each puzzle grants one star. Good luck!
/// 
/// Here's an easy puzzle to warm you up.
/// 
/// Santa is trying to deliver presents in a large apartment building, but he can't
/// find the right floor - the directions he got are a little confusing. He starts
/// on the ground floor (floor 0) and then follows the instructions one character
/// at a time.
/// 
/// An opening parenthesis, (, means he should go up one floor, and a closing
/// parenthesis, ), means he should go down one floor.
/// 
/// The apartment building is very tall, and the basement is very deep; he will
/// never find the top or bottom floors.
/// 
/// For example:
/// 
///     (()) and ()() both result in floor 0.
///     ((( and (()(()( both result in floor 3.
///     ))((((( also results in floor 3.
///     ()) and ))( both result in floor -1 (the first basement level).
///     ))) and )())()) both result in floor -3.
/// 
/// To what floor do the instructions take Santa?
fn part1(input: &str) -> i32 {
    input.chars().fold(0, |floor, c| match c {
        '(' => floor + 1,
        ')' => floor - 1,
        _ => floor,
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;

    #[test]
    fn test_part_1_samples() {
        let test_cases = vec![
            ("(())", 0),
            ("()()", 0),
            ("(((", 3),
            ("(()(()(", 3),
            ("())", -1),
            ("))(", -1),
            (")))", -3),
            (")())())", -3),
        ];
        test_cases.iter().for_each(|(input, expected)| {
            assert_eq!(part1(&input), *expected);
        });
    }

    #[test]
    fn test_part_1_real() {
        let input = fs::read_to_string("../inputs/day1.txt").unwrap();
        assert_eq!(part1(&input), 280);
    }
}
