const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").trim();

const grid = input.split("\n").map((line) => line.split(""));
const cols = grid[0].length,
  rows = grid.length;
const squares = grid.flat();

const start = squares.indexOf("S"),
  end = squares.indexOf("E");

function getRow(square) {
  return Math.floor(square / cols);
}

function getCol(square) {
  return square % cols;
}

function getElevation(square) {
  return square === "E" ? 26 : square === "S" ? 1 : parseInt(square, 36) - 9;
}

function findEdges(node) {
  const x = getCol(node),
    y = getRow(node),
    elevation = getElevation(squares[node]);
  let edges = [];

  if (x > 0) edges.push(node - 1);
  if (y > 0) edges.push(node - cols);
  if (x < cols - 1) edges.push(node + 1);
  if (y < rows - 1) edges.push(node + cols);

  return edges.filter((n) => getElevation(squares[n]) <= elevation + 1);
}

const graph = squares.reduce((g, _, i) => {
  g[i] = findEdges(i);
  return g;
}, {});

function bfs(graph, source) {
  var queue = [{ vertex: source, count: 0 }],
    visited = { [source]: true },
    tail = 0;
  while (tail < queue.length) {
    var u = queue[tail].vertex,
      count = queue[tail++].count;
    graph[u].forEach(function (v) {
      if (!visited[v]) {
        visited[v] = true;
        queue.push({ vertex: v, count: count + 1 });
      }
    });
  }
  return queue;
}

const solution = bfs(graph, start).find((entry) => entry.vertex === end).count;
console.log(solution);
