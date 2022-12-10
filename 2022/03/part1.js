const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").trimEnd().split("\n");

const sum = (a, b) => a + b;

const rucksacks = input.map((rucksack) => {
  let median = rucksack.length / 2;
  return [rucksack.substring(0, median), rucksack.substring(median)];
});

const errors = rucksacks.map((rucksack) =>
  rucksack[0].split("").reduce((arr, item) => {
    if (rucksack[1].includes(item) && !arr.includes(item)) arr.push(item);
    return arr;
  }, [])
);

const solution = errors
  .map((rucksack) =>
    rucksack.map(
      (error) => parseInt(error, 36) - (error === error.toUpperCase() ? -17 : 9)
    )
  )
  .flat()
  .reduce(sum);

console.log(solution);
