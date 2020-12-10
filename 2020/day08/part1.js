const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf8").split("\n");

const completedInstructions = [];
var accumulator = 0;

for (let i = 0; i < input.length; i++) {
  if (completedInstructions.includes(i)) {
    break;
  }

  let [operation, argument] = input[i].split(" ");
  argument = parseInt(argument, 10);

  switch (operation) {
    case "acc":
      accumulator += argument;
      break;
    case "jmp":
      i += argument - 1;
      break;
  }

  completedInstructions.push(i);
}

console.log(accumulator);
