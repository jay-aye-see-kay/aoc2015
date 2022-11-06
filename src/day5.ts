/** 
--- Day 5: Doesn't He Have Intern-Elves For This? ---

Santa needs help figuring out which strings in his text file are naughty or nice.

A nice string is one with all of the following properties:

- It contains at least three vowels (aeiou only), like aei, xazegov, or
  aeiouaeiouaeiou.
- It contains at least one letter that appears twice in a row, like xx, abcdde
  (dd), or aabbccdd (aa, bb, cc, or dd).
- It does not contain the strings ab, cd, pq, or xy, even if they are part of
  one of the other requirements.

For example:

- ugknbfddgicrmopn is nice because it has at least three vowels (u...i...o...),
  a double letter (...dd...), and none of the disallowed substrings.
- aaa is nice because it has at least three vowels and a double letter, even
  though the letters used by different rules overlap.
- jchzalrnumimnmhp is naughty because it has no double letter.
- haegwjzuvuyypxyu is naughty because it contains the string xy.
- dvszwmarrgswjxmb is naughty because it contains only one vowel.

How many strings are nice?
*/
export function part1(input: string): number {
  function has3Vowels(word: string) {
    return word.replace(/[^aeiou]/g, "").length >= 3;
  }

  function hasConsecutiveLetters(word: string) {
    for (let i = 1; i < word.length; i++) {
      const letter = word[i];
      const prevLetter = word[i - 1];
      if (prevLetter === letter) {
        return true;
      }
    }
    return false;
  }

  function hasDisallowedString(word: string) {
    for (const disallowed of ["ab", "cd", "pq", "xy"]) {
      if (word.includes(disallowed)) {
        return true;
      }
    }
    return false;
  }
  const niceStrings = input
    .split("\n")
    .map((line) => line.trim())
    .filter((word) => word.length > 0)
    .filter(
      (word) =>
        !hasDisallowedString(word) &&
        has3Vowels(word) &&
        hasConsecutiveLetters(word)
    );

  return niceStrings.length;
}

/**
--- Part Two ---

Realizing the error of his ways, Santa has switched to a better model of
determining whether a string is naughty or nice. None of the old rules apply,
as they are all clearly ridiculous.

Now, a nice string is one with all of the following properties:

- It contains a pair of any two letters that appears at least twice in the
  string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa
  (aa, but it overlaps).
- It contains at least one letter which repeats with exactly one letter between
  them, like xyx, abcdefeghi (efe), or even aaa.

For example:

- qjhvhtzxzqqjkmpb is nice because is has a pair that appears twice (qj) and a
  letter that repeats with exactly one letter between them (zxz).
- xxyxx is nice because it has a pair that appears twice and a letter that
  repeats with one between, even though the letters used by each rule overlap.
- uurcxstgmygtbstg is naughty because it has a pair (tg) but no repeat with a
  single letter between them.
- ieodomkazucvgmuy is naughty because it has a repeating letter with one
  between (odo), but no pair that appears twice.

How many strings are nice under these new rules?
*/
export function part2(input: string) {
  function hasNonOverlappingPair(word: string) {
    for (let i = 0; i < word.length - 1; i++) {
      const pair = word.slice(i, i + 2);
      const rest = word.slice(i + 2);
      if (rest.includes(pair)) return true;
    }
    return false;
  }

  function hasRepeatedSpacedLetter(word: string) {
    for (let i = 0; i < word.length - 2; i++) {
      if (word[i] === word[i + 2]) return true;
    }
    return false;
  }

  const niceStrings = input
    .split("\n")
    .map((line) => line.trim())
    .filter((word) => word.length > 0)
    .filter(
      (word) => hasNonOverlappingPair(word) && hasRepeatedSpacedLetter(word)
    );

  return niceStrings.length;
}
