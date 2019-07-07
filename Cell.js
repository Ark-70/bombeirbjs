class Cell {
  _grid       = {x:null, y:null};
  _upperLeft  = {x:null, y:null};
  _center     = {x:null, y:null};
  _size;
  _centerOffset;
  _type;
  _$elmt;


  constructor(xG, yG, cellSize, type='empty', isForeground=false) {
    this._size = cellSize;
    // this._gridX = $elmt.data('x');
    // this._gridY = $elmt.data('y');
    this._corner = {x:this._gridX*cellSize, y:this._gridY*cellSize};
    this._center = {x:this._corner.x+this._size/2, y:this._corner.y+this._size/2};
    this._type = type;
  }



  changeType(type){
    let oldType = this._type;
    this._type = type;
    this.updateDomType(oldType, type);
  }

  updateDomType(oldType, newType){
    // console.log(oldType);
    // console.log(newType);
    // console.log(this._$elmt);
    this._$elmt.removeClass(`cell--${oldType}`);
    this._$elmt.addClass(`cell--${newType}`);
  }


  get type()      { return this._type; }
  get upperLeft() { return this._upperLeft; }
  get grid()      { return this._grid; }
  get center()    { return this._center; }
  get $elmt()     { return this._$elmt; }

  set type(type)              { this._type = type; }
  set upperLeft(upperLeft)    { this._upperLeft = upperLeft; }
  set grid(grid)              { this._grid = grid; }
  set center(center)          { this._center = center; }
  set $elmt($elmt)            { console.log("ALLO");this._$elmt = $elmt; }

}
