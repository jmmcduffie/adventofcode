const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf8")
  .trimEnd()
  .split("\n")
  .map((line) =>
    line.split(",").map((line) => line.split("-").map((n) => parseInt(n, 10)))
  );

const solution = input.filter(
  ([[x1, x2], [y1, y2]]) =>
    (x1 >= y1 && x1 <= y2) ||
    (x2 >= y1 && x2 <= y2) ||
    (y1 >= x1 && y1 <= x2) ||
    (y2 >= x1 && y2 <= x2)
).length;

console.log(solution);
