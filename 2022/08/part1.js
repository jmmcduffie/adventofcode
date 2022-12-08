const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split("").map((tree) => parseInt(tree, 10)));

var visibleTrees = 0;

for (let i = 0; i < input.length; i++) {
  let row = input[i];

  if (i === 0 || i === input.length - 1) {
    // edge trees
    visibleTrees += row.length;
    continue;
  }

  for (let j = 0; j < input[i].length; j++) {
    let col = input.map((_, ii) => input[ii][j]);

    if (j === 0 || j === input[i].length - 1) {
      // edge trees
      visibleTrees++;
      continue;
    }

    let interveningTrees = [
      row.slice(0, j),
      col.slice(0, i),
      row.slice(j + 1),
      col.slice(i + 1),
    ];

    if (
      interveningTrees
        .map((dir) => dir.every((tree) => tree < row[j]))
        .includes(true)
    )
      visibleTrees++;
  }
}

const solution = visibleTrees;
console.log(solution);

// for (let ii = 0; ii < input.length; ii++) {
//   if (ii === i) continue;
//   interveningTrees.push(input[ii][j]);
// }
