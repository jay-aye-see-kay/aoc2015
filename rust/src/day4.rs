const CUTOFF: i32 = 10_000_000;

/// --- Day 4: The Ideal Stocking Stuffer ---
///
/// Santa needs help mining some AdventCoins (very similar to bitcoins) to use as
/// gifts for all the economically forward-thinking little girls and boys.
///
/// To do this, he needs to find MD5 hashes which, in hexadecimal, start with at
/// least five zeroes. The input to the MD5 hash is some secret key (your puzzle
/// input, given below) followed by a number in decimal. To mine AdventCoins, you
/// must find Santa the lowest positive number (no leading zeroes: 1, 2, 3, ...)
/// that produces such a hash.
///
/// For example:
///
/// - If your secret key is abcdef, the answer is 609043, because the MD5 hash of
///   abcdef609043 starts with five zeroes (000001dbbfa...), and it is the lowest
///   such number to do so.
/// - If your secret key is pqrstuv, the lowest number it combines with to make an
///   MD5 hash starting with five zeroes is 1048970; that is, the MD5 hash of
///   pqrstuv1048970 looks like 000006136ef....
///
/// Your puzzle input is ckczppom.
fn part1(input: &str) -> Option<i32> {
    find_md5_prefix(input, "00000")
}

/// --- Part Two ---
///
/// Now find one that starts with six zeroes.
fn part2(input: &str) -> Option<i32> {
    find_md5_prefix(input, "000000")
}

fn find_md5_prefix(input: &str, prefix: &str) -> Option<i32> {
    for index in 0..CUTOFF {
        let digest = md5::compute(format!("{input}{index}"));
        if format!("{:x}", digest).starts_with(prefix) {
            return Some(index);
        }
    }
    None
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_1_samples() {
        let test_cases = vec![("abcdef", 609043), ("pqrstuv", 1048970)];
        test_cases.iter().for_each(|(input, expected)| {
            assert_eq!(part1(input), Some(*expected));
        });
    }

    #[test]
    fn test_part_1_real() {
        assert_eq!(part1(&"ckczppom"), Some(117946));
    }

    #[test]
    fn test_part_2_real() {
        assert_eq!(part2(&"ckczppom"), Some(3938038));
    }
}
