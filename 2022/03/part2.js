const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").trimEnd().split("\n");

const sum = (a, b) => a + b;

const groups = [];
for (let i = 0; i < input.length; i += 3) {
  groups.push(input.slice(i, i + 3));
}

const badges = groups.map((rucksack) =>
  rucksack[0].split("").reduce((arr, item) => {
    if (
      rucksack[1].includes(item) &&
      rucksack[2].includes(item) &&
      !arr.includes(item)
    )
      arr.push(item);
    return arr;
  }, [])
);

const solution = badges
  .map((rucksack) =>
    rucksack.map(
      (badge) => parseInt(badge, 36) - (badge === badge.toUpperCase() ? -17 : 9)
    )
  )
  .flat()
  .reduce(sum);

console.log(solution);
