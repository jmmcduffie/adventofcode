const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split(" "));

const screen = [];
var sprite = 1,
  row = 0,
  pixel = 0;

function drawPixel() {
  if (typeof screen[row] === "undefined") screen.push([]);
  screen[row].push(
    [sprite - 1, sprite, sprite + 1].includes(pixel) ? "#" : "."
  );

  if (pixel < 39) {
    pixel++;
  } else {
    row++;
    pixel = 0;
  }
}

input.forEach((instruction) => {
  drawPixel();
  if (instruction[0] === "noop") return;

  drawPixel();
  sprite += parseInt(instruction[1], 10);
});

console.log(screen[0].length);
solution = screen.map((row) => row.join("")).join("\n");
console.log(solution);
