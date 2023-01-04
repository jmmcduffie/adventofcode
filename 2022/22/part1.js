const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").trimEnd().split("\n\n");

const maxRowLength = Math.max(...input[0].split("\n").map((row) => row.length));

const map = input[0]
  .split("\n")
  .map((row) =>
    Array.from({ ...row.split(""), length: maxRowLength }, (v) => v || " ")
  );
const path = input[1]
  .split(/([A-Z])/)
  .map((d) => (Number.isNaN(parseInt(d, 10)) ? d : parseInt(d, 10)));

const facings = [
  { id: "right", symbol: ">", R: 1, L: 3 },
  { id: "down", symbol: "v", R: 2, L: 0 },
  { id: "left", symbol: "<", R: 3, L: 1 },
  { id: "up", symbol: "^", R: 0, L: 2 },
];

const drawArrow = ([x, y], facing) => {
  map[y][x] = facings[facing].symbol;
};

const changeFacing = (facing, change) => facings[facing][change];

const changePosition = (position, change, facing) => {
  let axis = facing % 2 ? 1 : 0,
    rowOrColumn = axis ? map : map[position[1]],
    direction = facing > 1 ? -1 : 1;

  for (let i = 0; i < change; i++) {
    let point = position[axis],
      square;

    do {
      point += direction;

      if (point >= rowOrColumn.length) point = 0;
      else if (point < 0) point = rowOrColumn.length - 1;

      square = Array.isArray(rowOrColumn[point])
        ? rowOrColumn[point][position[0]]
        : rowOrColumn[point];
    } while (square === " ");

    if (square === "#") break;
    position[axis] = point;
    drawArrow(position, facing);
  }

  return position;
};

let position = [map[0].indexOf("."), 0],
  facing = 0;

drawArrow(position, facing);

path.forEach((direction) => {
  if (typeof direction === "string") {
    facing = changeFacing(facing, direction);
    map[position[1]][position[0]] = facings[facing].symbol;
  } else position = changePosition(position, direction, facing);
});

// console.log(map.map((row) => row.join("")).join("\n"));
const solution = 1000 * (position[1] + 1) + 4 * (position[0] + 1) + facing;
console.log(solution);
