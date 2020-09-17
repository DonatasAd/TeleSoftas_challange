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
      // Booleans to check quality
      const isQualityPositive = item.quality > 0;
      const isQualityLessThan50 = item.quality < 50;
      // Booleans to check sellIn
      const tenDaysOrLessToSell = item.sellIn <= 10;
      const fiveDaysOrLessToSell = item.sellIn <= 5;
      if (!isSulfuras) {
        item.sellIn = item.sellIn - 1;
      }
      const noMoreDaysToSell = item.sellIn < 0;
      
      if (!isAgedBrie && !isBackstagePass) {
        if (isQualityPositive) {
          if (!isSulfuras) {
            item.quality = item.quality - 1;
          }
        }
      } else {
        if (isQualityLessThan50) {
          item.quality = item.quality + 1;
          if (isBackstagePass) {
            if (tenDaysOrLessToSell) {
              if (isQualityLessThan50) {
                item.quality = item.quality + 1;
              }
            }
            if (fiveDaysOrLessToSell) {
              if (isQualityLessThan50) {
                item.quality = item.quality + 1;
              }
            }
          }
        }
      }

      if (noMoreDaysToSell) {
        if (!isAgedBrie) {
          if (!isBackstagePass) {
            if (isQualityPositive) {
              if (!isSulfuras) {
                item.quality = item.quality - 1;
              }
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (isQualityLessThan50) {
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
