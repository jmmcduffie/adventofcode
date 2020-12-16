const fs = require("fs");
const input = fs
  .readFileSync(`${__dirname}/input.txt`, "utf8")
  .split("\n")
  .filter((line) => line !== "")
  .map(Number)
  .sort((a, b) => a - b);

function partition(array, boundary) {
  return array.reduce(
    (acc, currentItem) => {
      const currentSet = acc[acc.length - 1],
        lastItem = currentSet[currentSet.length - 1];

      if (!lastItem || currentItem - lastItem < boundary) {
        currentSet.push(currentItem);
      } else {
        acc.push([currentItem]);
      }

      return acc;
    },
    [[]]
  );
}

const sets = partition([0, ...input], 3);

const variations = sets.map((set) => {
  switch (set.length) {
    case 1:
    case 2:
      return 1;
    case 3:
      return 2;
    case 4:
      return 4;
    case 5:
      return 7;
  }
});

const answer = variations.reduce((prev, current) => prev * current);
console.log(answer);
