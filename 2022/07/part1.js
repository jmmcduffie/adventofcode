const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf8")
  .trim()
  .split("\n")
  .map((line) => line.split(" "));

const sum = (a, b) => a + b;

function sizeDirectory(dir) {
  return Object.entries(dir).reduce((count, [key, value]) => {
    if (key === "..") {
      return count;
    }

    let size = value;

    if (typeof value === "object") {
      size = sizeDirectory(value);
    }

    return count + size;
  }, 0);
}

const filesystem = {};
const directories = [filesystem];
let wd = filesystem;

for (line of input) {
  if (line[0] === "$") {
    if (line[1] === "cd") {
      if (line[2] === "/") {
        wd = filesystem;
      } else {
        wd = wd[line[2]];
      }
    }
  } else {
    if (line[0] === "dir" && typeof wd[line[1]] === "undefined") {
      let dir = { "..": wd };
      wd[line[1]] = dir;
      directories.push(dir);
    } else {
      wd[line[1]] = parseInt(line[0], 10);
    }
  }
}

const solution = directories
  .map((dir) => sizeDirectory(dir))
  .filter((size) => size <= 100000)
  .reduce(sum, 0);
console.log(solution);
