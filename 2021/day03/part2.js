const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").split("\n");

const lifeSupportRating = getRatingValue(input, getMostCommonValue);
const co2ScrubberRating = getRatingValue(input, getLeastCommonValue);

console.log(parseInt(lifeSupportRating, 2) * parseInt(co2ScrubberRating, 2));

function getRatingValue(values, criteriaFilter) {
  for (let numbers = [...values], i = 0; i < values[0].length; i++) {
    const bitCriteria = criteriaFilter.call(null, numbers, i);
    numbers = numbers.filter((val) => val[i] === bitCriteria);

    if (numbers.length === 1) {
      return numbers[0];
    }
  }
}

function getMostCommonValue(list, position) {
  const dict = getValueDictionary(list.map((val) => val[position])),
    values = Object.values(dict),
    highest = Math.max(...values),
    index = values.indexOf(highest);
  if (values.indexOf(highest, index + 1) > index) {
    return "1";
  } else {
    return Object.keys(dict)[index];
  }
}

function getLeastCommonValue(list, position) {
  const dict = getValueDictionary(list.map((val) => val[position])),
    values = Object.values(dict),
    lowest = Math.min(...values),
    index = values.indexOf(lowest);
  if (values.indexOf(lowest, index + 1) > index) {
    return "0";
  } else {
    return Object.keys(dict)[index];
  }
}

function getValueDictionary(list) {
  return list
    .filter((val) => typeof val !== "undefined")
    .reduce((dict, val) => {
      if (dict[val] == null) {
        dict[val] = 0;
      }
      dict[val]++;
      return dict;
    }, {});
}
