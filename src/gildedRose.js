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
        item.sellIn--;
      }
      const noMoreDaysToSell = item.sellIn < 0;
      const isItemNormal = !isAgedBrie && !isBackstagePass && !isSulfuras;

      if (isItemNormal) {
        if (isQualityPositive) {
          item.quality--;
        }
      } else if (isQualityLessThan50) {
        item.quality++;
        if (isBackstagePass) {
          if (tenDaysOrLessToSell) {
            item.quality++;
          }

          if (fiveDaysOrLessToSell) {
            item.quality++;
          }
        }
      }

      if (noMoreDaysToSell) {
        if (!isAgedBrie) {
          if (!isBackstagePass) {
            if (isQualityPositive && !isSulfuras) {
              item.quality--;
            }
          } else {
            item.quality = 0;
          }
        } else if (isQualityLessThan50) {
          item.quality++;
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
