const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n")
  .filter((line) => line !== "")
  .map(Number)
  .sort((a, b) => a - b);

const differences = { 1: 0, 2: 0, 3: 1 };

input.reduce((prev, current) => {
  const difference = current - prev;
  differences[difference]++;
  return current;
}, 0);

const answer = differences[1] * differences[3];
console.log(answer);
