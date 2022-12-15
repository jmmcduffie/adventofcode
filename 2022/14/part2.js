const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").trim();

const getRow = (len, char = ".") => new Array(len).fill(char);
const drawRock = (grid, coords) => {
  coords.reduce(([x1, y1], [x2, y2]) => {
    let [start, end] = (x1 === x2 ? [y1, y2] : [x1, x2]).sort((a, b) => a - b);
    for (let i = start; i <= end; i++) {
      if (x1 === x2) {
        grid[i][x1] = "#";
      } else {
        grid[y1][i] = "#";
      }
    }
    return [x2, y2];
  });
};

const rocks = input
  .split("\n")
  .map((rock) =>
    rock
      .split(" -> ")
      .map((point) => point.split(",").map((n) => parseInt(n, 10)))
  );

const [xValues, yValues] = rocks.flat().reduce(
    ([xx, yy], [x, y]) => {
      xx.push(x);
      yy.push(y);
      return [xx, yy];
    },
    [[], []]
  ),
  left = Math.min(...xValues),
  right = Math.max(...xValues),
  bottom = Math.max(...yValues) + 2;

const grid = [];
for (let i = 0; i <= bottom; i++)
  grid.push(getRow(right + bottom, i === bottom ? "#" : "."));
grid[0][500] = "+";

rocks.forEach((rock) => drawRock(grid, rock));

let sand = 0,
  x = 500,
  y = 0;
while (grid[0][500] === "+") {
  let y2 = y + 1;
  if (grid[y2][x] === ".") {
    y = y2;
  } else if (grid[y2] && grid[y2][x - 1] === ".") {
    y = y2;
    x--;
  } else if (grid[y2] && grid[y2][x + 1] === ".") {
    y = y2;
    x++;
  } else {
    grid[y][x] = "O";
    sand++;
    x = 500;
    y = 0;
  }
}
// console.log(grid.map((row) => row.slice(500 - bottom).join("")).join("\n"));

const solution = sand;
console.log(solution);
