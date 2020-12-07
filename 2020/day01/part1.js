const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n")
  .map((int) => parseInt(int, 10));

function fixExpenseReport(entries) {
  var answer;

  entries.forEach((a) => {
    entries.forEach((b) => {
      if (a + b === 2020) {
        answer = a * b;
      }
    });

    if (typeof answer !== "undefined") {
      return;
    }
  });

  return answer;
}

console.log(fixExpenseReport(input));
