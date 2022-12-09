const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").trim().split("");

const marker = input.findIndex(
  (_, i) => new Set(input.slice(i - 4, i)).size === 4
);

const solution = marker;
console.log(solution);
