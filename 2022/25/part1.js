const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").trim();

const sum = (a, b) => a + b;

const parseSNAFU = (string) => {
  return string
    .split("")
    .reverse()
    .reduce((sum, digit, position) => {
      let value = parseInt(digit, 10),
        multiplier = 5 ** position;
      if (digit === "-") value = -1;
      if (digit === "=") value = -2;
      return sum + value * multiplier;
    }, 0);
};

const toSNAFU = (number) => {
  let digits = [],
    carry = 0;

  while (number > 0) {
    let remainder = number % 5;
    if (carry) remainder++;

    if (remainder > 2) {
      if (remainder === 3) {
        digits.push("=");
      } else if (remainder === 4) {
        digits.push("-");
      } else {
        digits.push(0);
      }

      carry = 1;
    } else {
      digits.push(remainder);
      carry = 0;
    }

    number = Math.floor(number / 5);
  }

  if (carry) digits.push(carry);

  return digits.reverse().join("");
};

const requirements = input.split("\n").map(parseSNAFU);
const total = requirements.reduce(sum);

const solution = toSNAFU(total);
console.log(solution);

// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 2022, 12345, 314159265].forEach((n) =>
//   console.log(n, toSNAFU(n))
// );
