const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8").trim();

const product = (a, b) => a * b;
class Monkey {
  constructor(data) {
    let notes = data.split("\n").reduce((m, attr) => {
      let [key, val] = attr.split(": ");
      m[key.trim()] = val;
      return m;
    }, {});

    this.itemsInspected = 0;
    this.setItems(notes["Starting items"]);
    this.setOperation(notes["Operation"]);
    this.setTest(notes["Test"], notes["If true"], notes["If false"]);
  }

  setItems(items) {
    this.items = items.split(", ").map((item) => parseInt(item, 10));
  }

  setOperation(operation) {
    let body = /new = ([a-z0-9+\-*/ ]+)/.exec(operation)[1];
    this.inspectItem = (old) => {
      this.itemsInspected++;
      return eval(body);
    };
  }

  setTest(...notes) {
    let [divisor, trueMonkey, falseMonkey] = notes.map((attr) =>
      parseInt(/\d+/.exec(attr)[0], 10)
    );

    this.divisor = divisor;

    this.throwItem = (item) =>
      item % this.divisor === 0 ? trueMonkey : falseMonkey;
  }

  inspectItems(monkeys) {
    // console.log(`    ${this.items}`);
    while (this.items.length) {
      let item = this.items.shift();
      // console.log(`    inspect ${item}`);
      item = this.inspectItem(item);
      // console.log(`    items inspected: ${this.itemsInspected}`);

      // reduce worry level
      item = item % factor;

      // throw item
      let monkey = this.throwItem(item);
      // console.log(`    give ${item} to ${monkey}`);
      monkeys[monkey].catchItem(item);
    }
  }

  catchItem(item) {
    this.items.push(item);
  }
}

const monkeys = input.split("\n\n").map((notes) => new Monkey(notes));
const factor = monkeys.map((monkey) => monkey.divisor).reduce(product);

for (let i = 0; i < 10000; i++) {
  // console.log(`\n\n-----Round  ${i + 1}-----`);
  monkeys.forEach((monkey, j) => {
    // console.log(`\n  ---Monkey ${j}-----`);
    monkey.inspectItems(monkeys);
  });
}

const solution = monkeys
  .map((monkey) => monkey.itemsInspected)
  .sort((a, b) => b - a)
  .slice(0, 2)
  .reduce(product);

console.log(solution);
