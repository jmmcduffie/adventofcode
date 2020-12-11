const fs = require("fs");
const input = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n")
  .filter((line) => line !== "")
  .map((row) => row.split(""));

function getAdjacentSeats(collection, row, col) {
  const previousRow = collection[row - 1] || [],
    currentRow = collection[row],
    nextRow = collection[row + 1] || [],
    previousCol = col - 1,
    nextCol = col + 1;
  return [
    previousRow[previousCol],
    previousRow[col],
    previousRow[nextCol],
    currentRow[previousCol],
    currentRow[nextCol],
    nextRow[previousCol],
    nextRow[col],
    nextRow[nextCol],
  ].filter((seat) => typeof seat !== "undefined");
}

function applyRules(seats) {
  var changed = false;

  const newSeats = seats.map((row, rowIndex) => {
    return row.map((currentSeat, colIndex) => {
      const adjacentSeats = getAdjacentSeats(seats, rowIndex, colIndex);

      if (currentSeat === "L" && !adjacentSeats.includes("#")) {
        changed = true;
        return "#";
      } else if (
        currentSeat === "#" &&
        adjacentSeats.filter((seat) => seat === "#").length >= 4
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
