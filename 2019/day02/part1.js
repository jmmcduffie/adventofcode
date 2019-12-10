const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf8').split(',').map((int) => parseInt(int, 10));

function runIntcode(program) {
  var output = program;

  for (let index = 0; index < output.length; index += 4) {
   let opcode = output[index],
    inputIndex1 = output[index + 1],
    inputIndex2 = output[index + 2],
    resultIndex = output[index + 3];

   if (opcode === 1) {
    output[resultIndex] = output[inputIndex1] + output[inputIndex2];
   } else if (opcode === 2) {
    output[resultIndex] = output[inputIndex1] * output[inputIndex2];
   } else {
     break;
   }
  }

  return output;
}

input[1] = 12;
input[2] = 2;

console.log(runIntcode(input));
