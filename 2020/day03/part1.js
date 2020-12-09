const readline = require("readline");
const fs = require("fs");
const Writable = require("stream").Writable;

const reader = readline.createInterface({
  input: fs.createReadStream("./input.txt"),
  output: new Writable(),
  console: false,
});

var treesEncountered = 0;
var currentPosition = 0;

reader.on("line", (line) => {
  var row = line;

  while (row.length < currentPosition + 1) {
    row += line;
  }

  if (row[currentPosition] === "#") {
    treesEncountered++;
  }

  currentPosition += 3;
});

reader.on("close", () => {
  console.log(treesEncountered);
});
