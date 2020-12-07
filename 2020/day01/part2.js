const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n")
  .map((int) => parseInt(int, 10));

function fixExpenseReport(entries) {
  var answer;

  entries.forEach((a) => {
    entries.forEach((b) => {
      entries.forEach((c) => {
        if (a + b + c === 2020) {
          answer = a * b * c;
        }
      });

      if (typeof answer !== "undefined") {
        return;
      }
    });

    if (typeof answer !== "undefined") {
      return;
    }
  });

  return answer;
}

console.log(fixExpenseReport(input));
