class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class ItemDecorator {
  constructor(item) {
    this.item = item;
  }
}

class DecoratedItem extends ItemDecorator {
  getItemName = () => {
    return this.item.name;
  };

  getItemSellIn = () => {
    return this.item.sellIn;
  };

  getItemQuality = () => {
    return this.item.quality;
  };

  decrementQuality = () => {
    const noMoreDaysToSell = this.item.sellIn <= 0;
    const noMoreQuality = this.item.quality === 0;
    const isAgedBrie = this.item.name === 'Aged Brie';
    if()
    if (noMoreDaysToSell) return (this.item.quality = this.item.quality - 2);
    if (noMoreQuality) return 0;
    return this.item.quality--;
  };

  incrementQuality = () => {
    const isQuality50 = this.item.quality === 50;
    if (isQuality50) {
      return 50;
    }
    return this.item.quality++;
  };

  decrementSellIn = () => {
    const noMoreDaysToSell = this.item.sellIn <= 0;
    if (noMoreDaysToSell) return 0;
    return this.item.sellIn--;
  };

  isItemNormal = () => {
    const isAgedBrie = this.item.name === 'Aged Brie';
    const isBackstagePass = this.item.name === 'Backstage passes to a TAFKAL80ETC concert';
    const isSulfuras = this.item.name === 'Sulfuras, Hand of Ragnaros';
    return !isAgedBrie && !isBackstagePass && !isSulfuras;
  };
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

      // if (isAgedBrie) return this.incrementQuality();
      // if (isBackstagePass) return this.incrementQuality();
    
      const isAgedBrie = this.item.name === 'Aged Brie';
      const isSulfuras = this.item.name === 'Sulfuras, Hand of Ragnaros';
      const isBackstagePass = this.item.name === 'Backstage passes to a TAFKAL80ETC concert';
      const isItemNormal = item.isItemNormal();
      
        item.decrementQuality();
        item.decrementSellIn();
     

      //   if (!isSulfuras) {
      //     item.sellIn--;
      //   }
      //   const noMoreDaysToSell = item.sellIn < 0;
      //   const isItemNormal = !isAgedBrie && !isBackstagePass && !isSulfuras;

      //   if (isItemNormal) {
      //     if (isQualityPositive) {
      //       item.quality--;
      //     }
      //   } else if (isQualityLessThan50) {
      //     item.quality++;
      //     if (isBackstagePass) {
      //       if (tenDaysOrLessToSell) {
      //         item.quality++;
      //       }

      //       if (fiveDaysOrLessToSell) {
      //         item.quality++;
      //       }
      //     }
      //   }

      //   if (noMoreDaysToSell) {
      //     if (!isAgedBrie) {
      //       if (!isBackstagePass) {
      //         if (isQualityPositive && !isSulfuras) {
      //           item.quality--;
      //         }
      //       } else {
      //         item.quality = 0;
      //       }
      //     } else if (isQualityLessThan50) {
      //       item.quality++;
      //     }
      //   }
    }
    return this.items;
  }
}
module.exports = {
  Item,
  Shop,
  DecoratedItem,
};
