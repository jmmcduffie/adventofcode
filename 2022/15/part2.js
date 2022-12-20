const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").trim();

const upperLimit = 4000000;

const calculateDistance = ([x1, y1], [x2, y2]) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2);

const findBoundaries = ([x, y], distance) => {
  let range = distance + 1,
    yMin = y - range >= 0 ? y - range : 0,
    yMax = y + range <= upperLimit ? y + range : upperLimit,
    boundaries = [];

  for (let i = yMin; i <= yMax; i++) {
    let xRange = range - Math.abs(y - i);

    if (xRange > 0) {
      if (x - xRange >= 0) {
        boundaries.push([x - xRange, i]);
      }

      if (x + xRange <= upperLimit) {
        boundaries.push([x + xRange, i]);
      }
    } else if (x >= 0 && x <= upperLimit) {
      boundaries.push([x, i]);
    }
  }

  return boundaries;
};

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

let position = undefined;
for (let i = 0; i < sensors.length; i++) {
  let sensor = sensors[i];
  position = findBoundaries(sensor.loc, sensor.distance).find((pos) =>
    sensors.every(({ loc, distance }) => calculateDistance(loc, pos) > distance)
  );
  if (typeof position !== "undefined") break;
}

const solution = position[0] * 4000000 + position[1];
console.log(solution);
