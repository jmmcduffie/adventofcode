const readline = require('readline');
const fs = require('fs');
const Writable = require('stream').Writable;

function calculateFuelRequirementForMass(mass) {
  return Math.floor(parseInt(mass, 10) / 3) - 2;
}

const reader = readline.createInterface({
  input: fs.createReadStream('./input.txt'),
  output: new Writable(),
  console: false
});

const moduleFuelRequirements = [];

reader.on('line', (line) => {
  var moduleFuelRequirement = calculateFuelRequirementForMass(line);

  for (let additionalFuel = moduleFuelRequirement; additionalFuel > 0;) {
    moduleFuelRequirements.push(additionalFuel);
    additionalFuel = calculateFuelRequirementForMass(additionalFuel);
  }
});

reader.on('close', () => {
  var totalFuelRequirement = moduleFuelRequirements.reduce((prev, current) => prev + current, 0);
  console.log(totalFuelRequirement);
})
