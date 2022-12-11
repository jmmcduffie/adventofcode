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

    this.throwItem = (item) =>
      item % divisor === 0 ? trueMonkey : falseMonkey;
  }

  inspectItems(monkeys) {
    while (this.items.length) {
      let item = this.items.pop();

      item = this.inspectItem(item);

      // reduce worry level
      item = Math.floor(item / 3);

      // throw item
      let monkey = this.throwItem(item);
      monkeys[monkey].catchItem(item);
    }
  }

  catchItem(item) {
    this.items.push(item);
  }
}

const monkeys = input.split("\n\n").map((notes) => new Monkey(notes));

for (let i = 0; i < 20; i++) {
  monkeys.forEach((monkey) => monkey.inspectItems(monkeys));
}

const solution = monkeys
  .map((monkey) => monkey.itemsInspected)
  .sort((a, b) => b - a)
  .slice(0, 2)
  .reduce(product);

console.log(solution);
