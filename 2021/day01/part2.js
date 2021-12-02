const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n")
  .map((int) => parseInt(int, 10));

var count = 0;

input
  .map((val, i, arr) => {
    const prev = arr[i - 1];
    const next = arr[i + 1];
    return prev + val + next;
  })
  .filter((val) => !isNaN(val))
  .reduce((prev, curr) => {
    if (prev != null && curr > prev) {
      count++;
    }
    return curr;
  });

console.log(count);
