#![allow(unused)]

use std::fs;

mod day1;
mod day2;

/// helper fn to read the input file all in one
pub fn read_input(day: i32) -> String {
    let path = format!("../inputs/day{day}.txt");
    fs::read_to_string(&path).expect(&format!("Could not open {path}"))
}
