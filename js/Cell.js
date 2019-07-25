class Cell {
  _grid       = {x:null, y:null};
  _upperLeft  = {x:null, y:null};
  _center     = {x:null, y:null};
  _size;
  _centerOffset;
  _type;
  _$elmt;


  constructor(xG, yG, cellSize, type='empty', isForeground=false, drop=null) {
    this._size = cellSize;
    this._grid =      {x:xG, y:yG};
    this._upperLeft = {x:this._grid.x*cellSize, y:this._grid.y*cellSize};
    this._center =    {x:this._upperLeft.x+this._size/2, y:this._upperLeft.y+this._size/2};
    this._type = type;
    if(this._type=='block'){
      this.drop = 'bombUp';
    }
    this._centerOffset = cellSize/2;
    if(isForeground){
      this._$elmt = Dom.domCreateForeCell(xG, yG, type, cellSize);
    }
  }

  changeType(type){
    let oldType = this._type;
    this._type = type;
    this.updateDomType(oldType, type);
  }

  updateDomType(oldType, newType){
    this._$elmt.removeClass(`cell--${oldType}`);
    this._$elmt.addClass(`cell--${newType}`);
  }

  updateAllPosFrom(base){
    switch (base) {
      case 'center':
        console.log(this._center);
        for (const [key, value] of Object.entries(this._center)){
          this._upperLeft[key] = value-this._centerOffset;
        }
        this._grid = Map.posToGridPos(...Object.values(this._center));
        break;
      case 'grid':
        break;

      case 'upperLeft':
        break;

      default:

    }
  }

  get type()      { return this._type; }
  get upperLeft() { return this._upperLeft; }
  get grid()      { return this._grid; }
  get center()    { return this._center; }
  get $elmt()     { return this._$elmt; }
  get centerOffset()     { return this._centerOffset; }
  get size()     { return this._size; }

  set type(type)                { this._type = type; }
  set upperLeft(upperLeft)      { this._upperLeft = upperLeft; }
  set grid(grid)                { this._grid = grid; }
  set center(center)            { this._center = center; }
  set $elmt($elmt)              { this._$elmt = $elmt; }
  set centerOffset(centerOffset){ ;this._centerOffset = centerOffset; }
  set size(val)                 { this._size = val; }
}
