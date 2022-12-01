const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").trim().split("\n\n");

const sum = (a, b) => a + b;

const elves = input.map((elf) =>
  elf
    .split("\n")
    .map((count) => parseInt(count, 10))
    .reduce(sum, 0)
);

const topThree = elves.sort((a, b) => b - a).slice(0, 3);

const solution = topThree.reduce(sum, 0);

console.log(solution);
