class Forecell extends Cell {
  constructor(xG, yG, type=null, drop=null) {
    if(type=='mob') debugger;
    super(xG, yG, type, true, drop);
    this._$elmt = Dom.domCreateForeCell(xG, yG, type, TILE_SIZE);

  }
}
