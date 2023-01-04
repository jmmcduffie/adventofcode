const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").trim();

const getAdjacentCubes = ([x, y, z]) => [
  [x, y, z + 1],
  [x, y, z - 1],
  [x, y + 1, z],
  [x, y - 1, z],
  [x + 1, y, z],
  [x - 1, y, z],
];

const isOutOfBounds = (
  [x, y, z],
  { minX, maxX, minY, maxY, minZ, maxZ },
  offset = 0
) =>
  x < minX - offset ||
  x > maxX + offset ||
  y < minY - offset ||
  y > maxY + offset ||
  z < minZ - offset ||
  z > maxZ + offset;

function bfs(graph, source) {
  var queue = [{ vertex: source }],
    visited = { [source.join(",")]: true },
    tail = 0;

  while (tail < queue.length) {
    let current = queue[tail].vertex,
      adjacent = getAdjacentCubes(current).filter(
        (cube) => !isOutOfBounds(cube, boundaries, 1)
      );

    queue[tail].count = adjacent.filter((cube) =>
      graph.includes(cube.join(","))
    ).length;

    adjacent
      .filter((cube) => !graph.includes(cube.join(",")))
      .forEach((cube) => {
        let key = cube.join(",");
        if (!visited[key]) {
          visited[key] = true;
          queue.push({ vertex: cube });
        }
      });

    tail++;
  }

  return queue;
}

const cubes = input.split("\n");

const boundaries = cubes.reduce(
  ({ minX, maxX, minY, maxY, minZ, maxZ }, cube) => {
    let [x, y, z] = cube.split(",").map((point) => parseInt(point, 10));
    minX = x < minX || typeof minX === "undefined" ? x : minX;
    maxX = x > maxX || typeof maxX === "undefined" ? x : maxX;
    minY = y < minY || typeof minY === "undefined" ? y : minY;
    maxY = y > maxY || typeof maxY === "undefined" ? y : maxY;
    minZ = z < minZ || typeof minZ === "undefined" ? z : minZ;
    maxZ = z > maxZ || typeof maxZ === "undefined" ? z : maxZ;
    return { minX, maxX, minY, maxY, minZ, maxZ };
  },
  {}
);

const startingPoint = [
  boundaries.minX - 1,
  boundaries.minY - 1,
  boundaries.minZ - 1,
];

const edges = bfs(cubes, startingPoint).reduce(
  (sum, { count }) => sum + count,
  0
);

console.log(edges);
