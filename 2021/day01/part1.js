const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n")
  .map((int) => parseInt(int, 10));

var count = 0;

input.reduce((prev, curr, i, list) => {
  if (prev != null && curr > prev) {
    count++;
  }
  return curr;
});

console.log(count);
