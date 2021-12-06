const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n")
  .filter((line) => line !== "")
  .map((line) =>
    line
      .split(" ")
      .filter((segment) => segment !== "->")
      .map((segment) => segment.split(",").map((point) => parseInt(point, 10)))
  );

const diagram = [];

input.forEach(([[x1, y1], [x2, y2]]) => {
  if (x1 == x2) {
    markVerticalLine(diagram, x1, [y1, y2]);
  } else if (y1 == y2) {
    markHorizontalLine(diagram, y1, [x1, x2]);
  }
});

const sum = diagram.flat().filter((point) => point >= 2).length;

console.log(sum);

function markVerticalLine(diagram, x, y) {
  const [y1, y2] = y.sort((a, b) => a - b);
  for (let i = y1; i <= y2; i++) {
    if (typeof diagram[i] === "undefined") {
      diagram[i] = [];
    }

    if (typeof diagram[i][x] === "undefined") {
      diagram[i][x] = 1;
    } else {
      diagram[i][x]++;
    }
  }
}

function markHorizontalLine(diagram, y, x) {
  const [x1, x2] = x.sort((a, b) => a - b);

  if (typeof diagram[y] === "undefined") {
    diagram[y] = [];
  }

  for (let i = x1; i <= x2; i++) {
    if (typeof diagram[y][i] === "undefined") {
      diagram[y][i] = 1;
    } else {
      diagram[y][i]++;
    }
  }
}
