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

const buildEquation = ({ id, job }) => {
  let [a, b, c] = job.split(" "),
    number = parseInt(a, 10);

  if (id === "humn") return "x";
  if (!Number.isNaN(number)) return number;

  a = buildEquation(findMonkey(a));
  if (id === "root") b = "=";
  c = buildEquation(findMonkey(c));

  return typeof a === "number" && typeof c === "number"
    ? eval([a, b, c].join(" "))
    : [a, b, c];
};

const inverseOperands = { "/": "*", "*": "/", "+": "-", "-": "+" };

const solveEquation = (equation) => {
  let [solution, , problem] =
    typeof equation[0] === "number" ? equation : equation.reverse();

  while (Array.isArray(problem)) {
    let numberFirst = typeof problem[0] === "number",
      number = numberFirst ? problem[0] : problem[2],
      left =
        numberFirst && !["*", "+"].includes(problem[1]) ? number : solution,
      right =
        numberFirst && ["/", "-"].includes(problem[1]) ? solution : number,
      operand =
        numberFirst && ["/", "-"].includes(problem[1])
          ? problem[1]
          : inverseOperands[problem[1]];

    solution = eval(`${left} ${operand} ${right}`);
    problem = numberFirst ? problem[2] : problem[0];
  }

  return solution;
};

const equation = buildEquation(findMonkey("root"));
const solution = solveEquation(equation);
console.log(solution);

// x - a = b -> x = b + a
// a - x = b -> x = a - b
// x + a = b -> x = b - a
// a + x = b -> x = b - a
// x * a = b -> x = b / a
// a * x = b -> x = b / a
// x / a = b -> x = b * a
// a / x = b -> x = a / b
