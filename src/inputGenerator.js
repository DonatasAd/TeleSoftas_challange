const fs = require('fs');
const { Readable } = require('stream');
const OUTPUT_DESTINATION = './generatedInput.txt';
const ITEM_NAMES = ['Backstage passes to a TAFKAL80ETC concert', 'Aged Brie', 'Sulfuras, Hand of Ragnaros', 'foo', 'Conjured'];
const QUALITY_INTERVAL = [0, 50];
const SELLINS_INTERVAL = [-1, 10];
const MAX_ITEM_COUNT = 1000000;

class InputGenerator extends Readable {
  constructor(options) {
    super(options);
    this.count = 0;
    this.moreData = true;
  }
  _read() {
    let mayPush = true;
    do {
      mayPush = this.push(generateInputLine());
      if (this.count++ >= MAX_ITEM_COUNT) {
        this.moreData = false;
      }
    } while (mayPush && this.moreData);
    if (mayPush) {
      console.log('finish');
      this.push(null);
    }
  }
}

const inputGenerator = new InputGenerator();
const output = fs.createWriteStream(OUTPUT_DESTINATION);
inputGenerator.pipe(output);

function generateInputLine() {
  return `${ITEM_NAMES[random(0, 4)]} # ${random(QUALITY_INTERVAL[0], QUALITY_INTERVAL[1])} # ${random(SELLINS_INTERVAL[0], SELLINS_INTERVAL[1])}\n`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
