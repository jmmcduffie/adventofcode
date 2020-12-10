const fs = require("fs");
const _ = require("lodash");

const input = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n")
  .filter((line) => line !== "");

function runProgram(instructions) {
  const visitedInstructions = [];
  var accumulator = 0,
    i = 0;

  while (i < instructions.length) {
    if (visitedInstructions.includes(i)) {
      return false;
    }

    visitedInstructions.push(i);
    let [operation, argument] = instructions[i];

    switch (operation) {
      case "jmp":
        i += argument;
        break;
      case "acc":
        accumulator += argument;
      default:
        i++;
    }
  }

  return accumulator;
}

const faultyInstructions = input.map((instruction) => {
  var [operation, argument] = instruction.split(" ");
  return [operation, parseInt(argument, 10)];
});

var answer;

faultyInstructions.every((instruction, index) => {
  var instructions = _.cloneDeep(faultyInstructions);

  if (instruction[0] === "jmp") {
    instructions[index][0] = "nop";
  } else if (instruction[0] === "nop") {
    instructions[index][0] = "jmp";
  }
  answer = runProgram(instructions);
  return !answer;
});

console.log(answer);
