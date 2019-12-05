const readline = require('readline');
const fs = require('fs');
const Writable = require('stream').Writable;

function calculateFuelRequirementForModule(mass) {
  return Math.floor(parseInt(mass, 10) / 3) - 2;
}

const reader = readline.createInterface({
  input: fs.createReadStream('./input.txt'),
  output: new Writable(),
  console: false
});

const moduleFuelRequirements = [];

reader.on('line', (line) => {
  moduleFuelRequirements.push(calculateFuelRequirementForModule(line));
});

reader.on('close', () => {
  var totalFuelRequirement = moduleFuelRequirements.reduce((prev, current) => prev + current, 0);
  console.log(totalFuelRequirement);
})
