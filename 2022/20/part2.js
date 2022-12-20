const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").trim();

const sequence = input
  .split("\n")
  .map((n, key) => ({ key, value: parseInt(n, 10) * 811589153 }));

let updatedSequence = [...sequence];

for (let i = 0; i < 10; i++) {
  updatedSequence = sequence.reduce((sorted, item) => {
    let oldIndex = sorted.findIndex(({ key }) => key === item.key);
    sorted.splice(oldIndex, 1);

    let newIndex = (oldIndex + item.value) % (sequence.length - 1);
    if (newIndex === 0) sorted.push(item);
    else if (newIndex === sequence.length - 1) sorted.unshift(item);
    else sorted.splice(newIndex, 0, item);

    return sorted;
  }, updatedSequence);
}

const zero = updatedSequence.findIndex(({ value }) => value === 0);
const solution =
  updatedSequence[(zero + 1000) % updatedSequence.length].value +
  updatedSequence[(zero + 2000) % updatedSequence.length].value +
  updatedSequence[(zero + 3000) % updatedSequence.length].value;
console.log(solution);
