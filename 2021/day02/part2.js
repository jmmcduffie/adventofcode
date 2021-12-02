const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split("\n");

var position = 0;
var depth = 0;
var aim = 0;

input
  .map((val) => val.split(" "))
  .forEach((val) => {
    const command = val[0];
    const units = parseInt(val[1]);

    switch (command) {
      case "forward":
        position += units;
        depth += aim * units;
        break;
      case "down":
        aim += units;
        break;
      case "up":
        aim -= units;
        break;
    }
  });

console.log(position * depth);
