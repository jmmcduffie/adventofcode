const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").trim();

const getAdjacentCubes = ([x, y, z]) =>
  [
    [x, y, z + 1],
    [x, y, z - 1],
    [x, y + 1, z],
    [x, y - 1, z],
    [x + 1, y, z],
    [x - 1, y, z],
  ].map((c) => c.join(","));

const cubes = input
  .split("\n")
  .map((cube) => cube.split(",").map((side) => parseInt(side, 10)));

const solution = cubes.reduce(
  ({ viewed, sides }, cube) => {
    let adjacent = getAdjacentCubes(cube);
    sides += 6 - adjacent.filter((val) => viewed.includes(val)).length * 2;
    viewed.push(cube.join(","));

    return {
      viewed,
      sides,
    };
  },
  { viewed: [], sides: 0 }
);

console.log(solution.sides);
