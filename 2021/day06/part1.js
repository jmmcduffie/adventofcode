const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf8")
  .trim()
  .split(",")
  .map((num) => parseInt(num, 10));

var school = [...input];

for (let day = 1; day <= 80; day++) {
  let spawn = 0;

  school.forEach((fish, i) => {
    if (fish === 0) {
      school[i] = 6;
      spawn++;
    } else {
      school[i] = --fish;
    }
  });

  if (spawn > 0) {
    school = school.concat(Array(spawn).fill(8));
  }
}

console.log(school.length);
