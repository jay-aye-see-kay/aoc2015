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

// ---

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
