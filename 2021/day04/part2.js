const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split("\n");

const numbers = input[0].split(",");
const boards = input
  .slice(1)
  .reduce((boards, line) => {
    if (line === "") {
      boards.push([]);
    } else {
      boards[boards.length - 1].push(line.trim().split(/\s+/));
    }
    return boards;
  }, [])
  .filter((board) => board.length !== 0);

var answer = null;

for (let number of numbers) {
  boards
    .filter((board) => !checkBoard(board))
    .forEach((board, _, boards) => {
      markBoard(board, number);

      if (boards.length === 1 && checkBoard(board)) {
        answer = parseInt(number, 10) * sumBoard(board);
      }
    });

  if (answer != null) {
    break;
  }
}

console.log(answer);

function markBoard(board, number) {
  board.forEach((row, i) =>
    row.forEach((space, j) => {
      if (space === number) {
        board[i][j] = true;
      }
    })
  );
}

function checkBoard(board) {
  const cols = board[0].reduce((arr, _, i) => {
    arr.push(board.map((row) => row[i]));
    return arr;
  }, []);
  return [...board, ...cols].some((combo) =>
    combo.every((space) => space === true)
  );
}

function sumBoard(board) {
  return board
    .flat()
    .map((val) => parseInt(val, 10))
    .filter((val) => !isNaN(val))
    .reduce((a, b) => a + b);
}
