const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").trimEnd().split("\n\n");

const stacks = input[0]
  .split("\n")
  .map((line) => line.split("").filter((_, i) => i % 4 === 1))
  .reduce((arr, row) => {
    row.forEach((crate, i) => {
      arr[i] = arr[i] || [];
      if (/[A-Z]/.test(crate)) arr[i].unshift(crate);
    });
    return arr;
  }, []);

const instructions = input[1]
  .split("\n")
  .map((line) => line.split(" ").filter((_, i) => i % 2 === 1));

instructions.forEach((move) => {
  let [crates, from, to] = move;
  stacks[to - 1].push(...stacks[from - 1].splice(crates * -1));
});

const solution = stacks.map((stack) => stack[stack.length - 1]).join("");
console.log(solution);
