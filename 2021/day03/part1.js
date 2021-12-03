const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split("\n");

const values = input
  .map((val) => val.split(""))
  .reduce(
    (prev, curr) => {
      prev.forEach((position, i) => position.push(curr[i]));
      return prev;
    },
    [...Array(input[0].length)].map((_) => [])
  )
  .map((position) =>
    position
      .filter((val) => typeof val !== "undefined")
      .reduce((dict, val) => {
        if (dict[val] == null) {
          dict[val] = 0;
        }
        dict[val]++;
        return dict;
      }, {})
  );

const gamma = values
  .map((position) => {
    const highest = Math.max(...Object.values(position));
    const index = Object.values(position).indexOf(highest);
    return Object.keys(position)[index];
  })
  .join("");

const epsilon = values
  .map((position) => {
    const lowest = Math.min(...Object.values(position));
    const index = Object.values(position).indexOf(lowest);
    return Object.keys(position)[index];
  })
  .join("");

const answer = parseInt(gamma, 2) * parseInt(epsilon, 2);

console.log(answer);
