const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").trim();

const comparePackets = (left, right, depth = 0) => {
  // if (depth === 10) throw new Error("too deep");

  const pad = `${"  ".repeat(depth)}- `;

  if (typeof right === "undefined") {
    // console.log(
    //   `${pad}Right side ran out of items, so inputs are not in the right order`
    // );
    return false;
  }

  // console.log(
  //   `${pad}Compare ${JSON.stringify(left)} vs ${JSON.stringify(right)}`
  // );

  if (typeof left === "number" && typeof right === "number") {
    if (left === right) {
      return null;
    }

    if (left < right) {
      // console.log(
      //   `  ${pad}Left side is smaller, so inputs are in the right order`
      // );
      return true;
    } else {
      // console.log(
      //   `  ${pad}Right side is smaller, so inputs are not in the right order`
      // );
      return false;
    }
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < left.length; i++) {
      let comparison = comparePackets(left[i], right[i], depth + 1);
      if (comparison !== null) return comparison;
    }

    if (right.length > left.length) {
      // console.log(
      //   `${pad}Left side ran out of items, so inputs are in the right order`
      // );
      return true;
    }

    return null;
  }

  if (typeof left === "number" && Array.isArray(right)) {
    // console.log(
    //   `  ${pad}Mixed types; convert left to [${left}] and retry comparison`
    // );
    return comparePackets([left], right, depth);
  }

  if (Array.isArray(left) && typeof right === "number") {
    // console.log(
    //   `  ${pad}Mixed types; convert right to [${right}] and retry comparison`
    // );
    return comparePackets(left, [right], depth);
  }
};

const pairs = input
  .split("\n\n")
  .map((pair) => pair.split("\n").map((packet) => eval(packet)));

const solution = pairs
  .map((pair, i) => {
    // console.log(`== Pair ${i + 1}==`);
    return comparePackets(pair[0], pair[1]);
  })
  .reduce((sum, comparison, i) => (comparison ? sum + i + 1 : sum), 0);

console.log(solution);
