class Item extends Cell {
  constructor(xG, yG, subtype='bombUp') {
    super(xG, yG, 'item_'+subtype);
  }
}
