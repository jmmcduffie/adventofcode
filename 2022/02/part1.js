const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").trim().split("\n");

const sum = (a, b) => a + b;

const outcomes = {
  "A X": 3,
  "A Y": 6,
  "A Z": 0,
  "B X": 0,
  "B Y": 3,
  "B Z": 6,
  "C X": 6,
  "C Y": 0,
  "C Z": 3,
};

const shapes = {
  X: 1,
  Y: 2,
  Z: 3,
};

const rounds = input.map(
  (round) => shapes[round.split(" ")[1]] + outcomes[round]
);

const solution = rounds.reduce(sum, 0);
console.log(solution);
