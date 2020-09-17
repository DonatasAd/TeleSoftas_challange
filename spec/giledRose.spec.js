const { Shop, Item } = require('../src/gildedRose');

describe('spec/giledRose.spec.js', () => {
  // Requirement - At the end of each day our system lowers both values for every item
  it('Should lower both values for every item', () => {
    const gildedRose = new Shop([new Item('foo', 10, 10), new Item('bar', 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(9);
    expect(items[0].sellIn).toEqual(9);
    expect(items[1].quality).toEqual(9);
    expect(items[1].sellIn).toEqual(9);
  });
  // Requirement - Once the sell by date has passed, Quality degrades twice as fast
  it('Should degrade quality twice as fast after sell date has passed', () => {
    const gildedRose = new Shop([new Item('foo', 0, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });
  // Requirement - The Quality of an item is never negative
  it('Should stop degrade quality at 0', () => {
    const gildedRose = new Shop([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });
  // Requirement - "Aged Brie" actually increases in Quality the older it gets
  it('Should increase "Aged Brie" quality older it gets', () => {
    const gildedRose = new Shop([new Item('Aged Brie', 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(1);
  });
  // Requirement - The Quality of an item is never more than 50
  it('Should stop increasing quality at 50', () => {
    const gildedRose = new Shop([new Item('Aged Brie', 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });
  // Requirement - "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
  // Requirement - "Sulfuras" is alegendary item and as such its Quality is 80 and it never alters.
  it('Should not decrease "Sulfuras" quality', () => {
    const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(80);
  });
  // Requirement - "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
  it('Should increase "Backstage passes" quality', () => {
    const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 20, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });
  // Requirement - "Backstage passes" quality increases by 2 when there are 10 days or less
  it('Should increase "Backstage passes" quality by 2 when 10 days left', () => {
    const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(22);
  });
  it('Should increase "Backstage passes" quality by 2 when 6 day left', () => {
    const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 6, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(22);
  });
  // Requirement - "Backstage passes" quality increases by 3 when there are 5 days or less
  it('Should increase "Backstage passes" quality by 3 when 5 days left', () => {
    const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(23);
  });
  it('Should increase "Backstage passes" quality by 3 when 1 days left', () => {
    const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 1, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(23);
  });
  // Requirement - "Backstage passes" quality drops to 0 after the concert
  it('Should drop "Backstage passes" quality to 0', () => {
    const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });
});
