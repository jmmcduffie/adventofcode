const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf8")
  .trim()
  .split(",")
  .map((num) => parseInt(num, 10));

var school = [...input];
var count = 0;

for (let fish of school) {
  count += calculateDescendants(256, fish);
}

console.log(count);

function calculateDescendants(daysRemaining, timer) {
  const offset = 6 - timer;
  var sum = 1;

  for (let i = 1; i <= (daysRemaining + offset) / 7; i++) {
    sum += calculateDescendants(daysRemaining + offset - i * 7, 8);
  }

  return sum;
}
