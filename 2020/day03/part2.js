const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf8").split("\n");

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const treesEncountered = slopes.map(([xOffset, yOffset]) => {
  var count = 0,
    x = 0;

  for (let y = 0; y < input.length - 1; y += yOffset) {
    let row = input[y];

    while (row.length < x + 1) {
      row += input[y];
    }

    if (row[x] === "#") {
      count++;
    }

    x += xOffset;
  }

  return count;
});

console.log(treesEncountered);

const answer = treesEncountered.reduce((prev, current) => prev * current);

console.log(answer);
