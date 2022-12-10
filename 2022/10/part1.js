const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split(" "));

const sum = (a, b) => a + b;

const cycles = [];
let X = 1;

input.forEach((instruction) => {
  cycles.push(X);

  if (instruction[0] === "noop") {
    return;
  }

  cycles.push(X);

  X += parseInt(instruction[1], 10);
});

solution = cycles
  .reduce((arr, x, i) => {
    if (i % 40 === 19 && i < 220) arr.push((i + 1) * x);
    return arr;
  }, [])
  .reduce(sum);

console.log(solution);
