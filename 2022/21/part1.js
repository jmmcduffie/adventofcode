const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").trim();

const monkeys = input.split("\n").map((monkey) => {
  let [id, job] = monkey.split(": ");
  return {
    id,
    job,
  };
});

const findMonkey = (id) => monkeys.find((m) => m.id === id);

const performJob = ({ job }) => {
  let [a, b, c] = job.split(" "),
    number = parseInt(a, 10);

  if (!Number.isNaN(number)) return number;

  let first = performJob(findMonkey(a)),
    second = performJob(findMonkey(c));

  return eval(`first ${b} second`);
};

const solution = performJob(findMonkey("root"));
console.log(solution);
