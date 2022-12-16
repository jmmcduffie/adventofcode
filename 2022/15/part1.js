const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").trim();

const calculateDistance = ([x1, y1], [x2, y2]) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2);

const comparePoints = ([x1, y1], [x2, y2]) => x1 === x2 && y1 === y2;

const sensors = input.split("\n").map((reading) => {
  let [[, x1], [, x2]] = [...reading.matchAll(/x=(-?\d+)/g)],
    [[, y1], [, y2]] = [...reading.matchAll(/y=(-?\d+)/g)],
    loc = [parseInt(x1, 10), parseInt(y1, 10)],
    beacon = [parseInt(x2, 10), parseInt(y2, 10)],
    distance = calculateDistance(loc, beacon);

  return {
    loc,
    beacon,
    distance,
  };
});
// console.log(sensors);

const xMin = Math.min(...sensors.map(({ loc: [x], distance }) => x - distance)),
  xMax = Math.max(...sensors.map(({ loc: [x], distance }) => x + distance));
// console.log(xMin, xMax);

const y = 2000000;
let positions = 0;
for (let i = xMin; i <= xMax; i++) {
  let covered = sensors.some(
    ({ loc, beacon, distance }) =>
      calculateDistance(loc, [i, y]) <= distance &&
      !comparePoints(beacon, [i, y])
  );
  if (covered) positions++;
}

const solution = positions;
console.log(solution);
