const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf8")
  .trim()
  .split("\n")
  .map((line) => {
    let parts = line.split(" ");
    return [parts[0], parseInt(parts[1], 10)];
  });

function moveKnot(knot, dir) {
  if (typeof dir !== "undefined") {
    if (dir.includes("U")) knot.y++;
    if (dir.includes("D")) knot.y--;
    if (dir.includes("L")) knot.x--;
    if (dir.includes("R")) knot.x++;
  }

  if (typeof knot.history === "undefined") knot.history = ["0, 0"];
  knot.history.push(`${knot.x}, ${knot.y}`);
}

const knots = [];
for (let i = 0; i < 10; i++) {
  knots[i] = { x: 0, y: 0 };
}

input.forEach(([dir, steps]) => {
  for (let i = 0; i < steps; i++) {
    moveKnot(knots[0], dir);

    knots.reduce((prev, knot) => {
      let xOffset = prev.x - knot.x,
        yOffset = prev.y - knot.y;
      knotDir = "";

      if (Math.abs(yOffset) > 1 || (yOffset !== 0 && Math.abs(xOffset) > 1)) {
        knotDir += Math.sign(yOffset) > 0 ? "U" : "D";
      }
      if (Math.abs(xOffset) > 1 || (xOffset !== 0 && Math.abs(yOffset) > 1)) {
        knotDir += Math.sign(xOffset) > 0 ? "R" : "L";
      }

      if (knotDir !== "") moveKnot(knot, knotDir);

      return knot;
    });
  }
});

const solution = new Set(knots[9].history).size;
console.log(solution);
