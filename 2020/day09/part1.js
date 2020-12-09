const fs = require("fs");

const input = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n")
  .map((int) => parseInt(int, 10));

const preamble = 25;
var answer;

for (let i = preamble; i < input.length; i++) {
  let previousNumbers = input.slice(i - preamble, i);
  let combinations = previousNumbers.reduce((arr, x, xIndex) => {
    previousNumbers.forEach((y, yIndex) => {
      let sum = x + y;
      if (xIndex !== yIndex && !arr.includes(sum)) {
        arr.push(sum);
      }
    });

    return arr;
  }, []);

  if (!combinations.includes(input[i])) {
    answer = input[i];
    break;
  }
}

console.log(answer);
