const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").trim();

const product = (a, b) => a * b;

const comparePackets = (left, right) => {
  if (typeof right === "undefined") return false;

  if (typeof left === "number" && typeof right === "number")
    return left - right;

  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < left.length; i++) {
      let comparison = comparePackets(left[i], right[i]);
      if (comparison !== 0) return comparison;
    }

    if (right.length > left.length) {
      return -1;
    }

    return 0;
  }

  if (typeof left === "number" && Array.isArray(right)) {
    return comparePackets([left], right);
  }

  if (Array.isArray(left) && typeof right === "number") {
    return comparePackets(left, [right]);
  }
};

const dividers = [[[2]], [[6]]];

const pairs = input
  .split("\n\n")
  .map((pair) => pair.split("\n").map((packet) => eval(packet)))
  .flat()
  .concat(dividers)
  .sort(comparePackets);

const solution = dividers
  .map((divider) =>
    pairs.findIndex(
      (packet) => JSON.stringify(packet) === JSON.stringify(divider)
    )
  )
  .map((index) => ++index)
  .reduce(product);

console.log(solution);
