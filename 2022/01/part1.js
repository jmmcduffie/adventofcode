const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").trim().split("\n\n");

const elves = input.map((elf) =>
  elf
    .split("\n")
    .map((count) => parseInt(count, 10))
    .reduce((a, b) => a + b, 0)
);

const solution = Math.max(...elves);

console.log(solution);
