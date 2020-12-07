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
  const [min, max] = range.split("-");
  const policy = {
    min: parseInt(min, 10),
    max: parseInt(max, 10),
    letter: letter[0],
  };
  return [policy, input];
}

function passwordIsValid(password, policy) {
  const count = (password.match(new RegExp(policy.letter, "g")) || []).length;
  return count >= policy.min && count <= policy.max;
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
