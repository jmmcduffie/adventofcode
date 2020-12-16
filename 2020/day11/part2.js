const fs = require("fs");
const input = fs
  .readFileSync(`${__dirname}/input.txt`, "utf8")
  .split("\n")
  .filter((line) => line !== "")
  .map((row) => row.split(""));

function getVisibleSeats(seatingMap, row, col) {
  return [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]
    .map(([y, x]) => {
      var currentY = row + y,
        currentX = col + x,
        nextSeat;

      while (typeof seatingMap[currentY] !== "undefined") {
        nextSeat = seatingMap[currentY][currentX];

        if (nextSeat !== ".") {
          break;
        }

        currentY += y;
        currentX += x;
      }

      return nextSeat;
    })
    .filter((seat) => typeof seat !== "undefined");
}

function applyRules(seats) {
  var changed = false;

  const newSeats = seats.map((row, rowIndex) => {
    return row.map((currentSeat, colIndex) => {
      const visibleSeats = getVisibleSeats(seats, rowIndex, colIndex);

      if (currentSeat === "L" && !visibleSeats.includes("#")) {
        changed = true;
        return "#";
      } else if (
        currentSeat === "#" &&
        visibleSeats.filter((seat) => seat === "#").length >= 5
      ) {
        changed = true;
        return "L";
      } else {
        return currentSeat;
      }
    });
  });

  return [newSeats, changed];
}

var [seatingMap, changed] = applyRules(input);
while (changed) {
  [seatingMap, changed] = applyRules(seatingMap);
}

const answer = seatingMap.reduce((sum, row) => {
  return sum + row.reduce((sum, seat) => sum + (seat === "#" ? 1 : 0), 0);
}, 0);

console.log(answer);
