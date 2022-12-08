const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split("").map((tree) => parseInt(tree, 10)));

const product = (a, b) => a * b;

const scenicScores = input.map((row, i) =>
  row.map((tree, j) => {
    let col = input.map((_, ii) => input[ii][j]);

    let interveningTrees = [
      row.slice(0, j).reverse(),
      col.slice(0, i).reverse(),
      row.slice(j + 1),
      col.slice(i + 1),
    ];

    return interveningTrees
      .map((dir) => {
        let count = dir.findIndex((k) => k >= tree);
        return count < 0 ? dir.length : count + 1;
      })
      .reduce(product, 1);
  })
);

const solution = Math.max(...scenicScores.flat());
console.log(solution);
