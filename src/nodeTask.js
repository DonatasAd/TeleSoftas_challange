const fs = require('fs');
const readline = require('readline');
const { Item, DecoratedItem } = require('../src/gildedRose');

// Paths to files
const GENERATED_INPUT = './generatedInput.txt';
const AGED_BRIE_OUTPUT = './output/AgedBrie.txt';
const SULFURAS_OUTPUT = './output/Sulfuras.txt';
const FOO_OUTPUT = './output/Foo.txt';
const BACKSTAGE_PASS_OUTPUT = './output/BackstagePass.txt';
const CONJURED_OUTPUT = './output/Conjured.txt';

// Read and write streams
const fileStream = fs.createReadStream(GENERATED_INPUT);
const writableAgedBrieStream = fs.createWriteStream(AGED_BRIE_OUTPUT);
const writableSulfurasStream = fs.createWriteStream(SULFURAS_OUTPUT);
const writableFooStream = fs.createWriteStream(FOO_OUTPUT);
const writableBackstagePassStream = fs.createWriteStream(BACKSTAGE_PASS_OUTPUT);
const writableConjuredStream = fs.createWriteStream(CONJURED_OUTPUT);

// Error handling on streams
const handleError = (err) => console.error(err);
fileStream.on('error', handleError);
writableAgedBrieStream.on('error', handleError);
writableSulfurasStream.on('error', handleError);
writableFooStream.on('error', handleError);
writableBackstagePassStream.on('error', handleError);
writableConjuredStream.on('error', handleError);

function extractDataFromString(line) {
  // Extract data string line
  const dataFromLine = line.split('#');
  const name = dataFromLine[0].trim();
  const sellIn = parseInt(dataFromLine[1].trim());
  const quality = parseInt(dataFromLine[2].trim());
  // Update Item
  const decoratedItem = new DecoratedItem(new Item(name, sellIn, quality));
  return decoratedItem;
}

function updateLine(decoratedItem) {
  // Update item
  decoratedItem.decrementQuality();
  decoratedItem.decrementSellIn();
  // convert decoretedItem object to new line string
  const updatedLine = `${decoratedItem.getItemName()} # ${decoratedItem.getItemSellIn()} # ${decoratedItem.getItemQuality()} \n`;
  return updatedLine;
}

function processGiledRoseFile() {
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  rl.on('line', (line) => {
    try {
      const decoratedItem = extractDataFromString(line);
      const updatedLine = updateLine(decoratedItem);
      const name = decoratedItem.getItemName();
      // Write to file based on Item name
      switch (name) {
        case 'Sulfuras, Hand of Ragnaros':
          writableSulfurasStream.write(updatedLine);
          break;
        case 'foo':
          writableFooStream.write(updatedLine);
          break;
        case 'Aged Brie':
          writableAgedBrieStream.write(updatedLine);
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          writableBackstagePassStream.write(updatedLine);
          break;
        case 'Conjured':
          writableConjuredStream.write(updatedLine);
          break;
        default:
          console.log('Unknown item name found!');
          return;
      }
    } catch (error) {
      console.error(error);
    }
  });

  rl.on('close', () => {
    console.log('File processing is done!');
  });
}

processGiledRoseFile();
