const readline = require("readline");
const fs = require("fs");
const Writable = require("stream").Writable;

const reader = readline.createInterface({
  input: fs.createReadStream("./input.txt"),
  output: new Writable(),
  console: false,
});

function parsePassword(entry) {
  const [range, letter, input] = entry.split(" ");
  const [position1, position2] = range.split("-");
  const policy = {
    position1: parseInt(position1, 10),
    position2: parseInt(position2, 10),
    letter: letter[0],
  };
  return [policy, input];
}

function passwordIsValid(password, policy) {
  const position1match = password[policy.position1 - 1] === policy.letter;
  const position2match = password[policy.position2 - 1] === policy.letter;
  return position1match ? !position2match : position2match;
}

const validPasswords = [];

reader.on("line", (line) => {
  const [policy, input] = parsePassword(line);

  if (passwordIsValid(input, policy)) {
    validPasswords.push(input);
  }
});

reader.on("close", () => {
  console.log(validPasswords.length);
});
