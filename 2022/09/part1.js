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

  knot.history.push(`${knot.x}, ${knot.y}`);
}

const head = { x: 0, y: 0, history: [] },
  tail = { x: 0, y: 0, history: [] };

moveKnot(head);
moveKnot(tail);

input.forEach(([dir, steps]) => {
  for (let i = 0; i < steps; i++) {
    moveKnot(head, dir);

    let xOffset = head.x - tail.x,
      yOffset = head.y - tail.y;
    tailDir = "";

    if (Math.abs(yOffset) > 1 || (yOffset !== 0 && Math.abs(xOffset) > 1)) {
      tailDir += Math.sign(yOffset) > 0 ? "U" : "D";
    }
    if (Math.abs(xOffset) > 1 || (xOffset !== 0 && Math.abs(yOffset) > 1)) {
      tailDir += Math.sign(xOffset) > 0 ? "R" : "L";
    }

    if (tailDir !== "") moveKnot(tail, tailDir);
  }
});

const solution = new Set(tail.history).size;
console.log(solution);

// 0,0 1,0 2,0 3,0 4,1 4,2 4,3 3,4 2,4 3,3 4,3 3,2 2,2 1,2
