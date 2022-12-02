const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").trim().split("\n");

const sum = (a, b) => a + b;

const shapes = {
  A: 1,
  B: 2,
  C: 3,
};

const scores = {
  X: 0,
  Y: 3,
  Z: 6,
};

const outcomes = {
  "A X": "C",
  "A Y": "A",
  "A Z": "B",
  "B X": "A",
  "B Y": "B",
  "B Z": "C",
  "C X": "B",
  "C Y": "C",
  "C Z": "A",
};

const rounds = input.map(
  (round) => shapes[outcomes[round]] + scores[round.split(" ")[1]]
);

const solution = rounds.reduce(sum, 0);
console.log(solution);
