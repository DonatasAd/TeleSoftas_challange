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
    const isSulfuras = this.item.name === 'Sulfuras, Hand of Ragnaros';
    const isAgedBrie = this.item.name === 'Aged Brie';
    const isBackstagePass = this.item.name === 'Backstage passes to a TAFKAL80ETC concert';
    const isConjured = this.item.name === 'Conjured';
    if (isSulfuras) return this.item.quality;
    if (isAgedBrie) return this.incrementQuality();
    if (isBackstagePass) {
      const BackstagePassQualityDiff = this.calcQualityDiffBackstagePass();
      return (this.item.quality = this.item.quality + BackstagePassQualityDiff);
    }
    if (isConjured) {
      const normalItemQualityDiff = this.calcQualityDiffNormalItem();
      return (this.item.quality = this.item.quality - normalItemQualityDiff * 2);
    }
    const normalItemQualityDiff = this.calcQualityDiffNormalItem();
    return (this.item.quality = this.item.quality - normalItemQualityDiff);
  };

  calcQualityDiffNormalItem = () => {
    const noMoreDaysToSell = this.item.sellIn === 0;
    const isQualityBiggerThan0 = this.item.quality > 0;
    const isQualityMoreThan2 = this.item.quality >= 2;
    if (noMoreDaysToSell && isQualityMoreThan2) return 2;
    if (isQualityBiggerThan0) return 1;
    return 0;
  };

  calcQualityDiffBackstagePass = () => {
    const tenDaysOrLessToSell = this.item.sellIn <= 10;
    const fiveDaysOrLessToSell = this.item.sellIn <= 5;
    const areNoMoreDaysToSell = this.item.sellIn <= 0;
    if (areNoMoreDaysToSell) return -this.item.quality;
    if (fiveDaysOrLessToSell) return +3;
    if (tenDaysOrLessToSell) return +2;
    return +1;
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
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (const item of this.items) {
      item.decrementQuality();
      item.decrementSellIn();
    }
    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
  DecoratedItem,
};
