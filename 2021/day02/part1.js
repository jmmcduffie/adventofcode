const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split("\n");

var position = 0;
var depth = 0;

input
  .map((val) => val.split(" "))
  .forEach((val) => {
    const command = val[0];
    const units = parseInt(val[1]);

    switch (command) {
      case "forward":
        position += units;
        break;
      case "down":
        depth += units;
        break;
      case "up":
        depth -= units;
        break;
    }
  });

console.log(position * depth);
