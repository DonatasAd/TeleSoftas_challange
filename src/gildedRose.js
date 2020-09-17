class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (const item of this.items) {
      // Booleans to check what item it is
      const isAgedBrie = item.name === 'Aged Brie';
      const isBackstagePass = item.name === 'Backstage passes to a TAFKAL80ETC concert';
      const isSulfuras = item.name === 'Sulfuras, Hand of Ragnaros';

      if (!isAgedBrie && !isBackstagePass) {
        if (item.quality > 0) {
          if (!isSulfuras) {
            item.quality = item.quality - 1;
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
          if (isBackstagePass) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
          }
        }
      }
      if (!isSulfuras) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (!isAgedBrie) {
          if (!isBackstagePass) {
            if (item.quality > 0) {
              if (!isSulfuras) {
                item.quality = item.quality - 1;
              }
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop,
};
