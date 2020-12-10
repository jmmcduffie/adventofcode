const fs = require("fs");

const input = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n")
  .map((int) => parseInt(int, 10))
  .filter((i) => !isNaN(i));

const invalid = 41682220;
var set;

input.every((n, i) => {
  var sum = n,
    next = i + 1;

  while (sum < invalid && next < input.length) {
    sum += input[next];
    next++;
  }

  if (sum === invalid) {
    set = input.slice(i, next);
  }

  return typeof set === "undefined";
});

const answer = Math.min(...set) + Math.max(...set);
console.log(answer);
