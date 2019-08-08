class Cell {
  _grid       = {x:null, y:null};
  _upperLeft  = {x:null, y:null};
  _center     = {x:null, y:null};
  _size;
  _type;
  _$elmt;
  centerOffset;


  constructor(xG, yG, type='empty', isForeground=false, drop=null) {
    this._size = TILE_SIZE;
    this._grid =      {x:xG, y:yG};
    this._upperLeft = {x:this._grid.x*TILE_SIZE, y:this._grid.y*TILE_SIZE};
    this._center =    {x:this._upperLeft.x+this._size/2, y:this._upperLeft.y+this._size/2};
    this._type = type;
    this.centerOffset = this._size/2;
    if(this._type=='block'){
      this.drop = 'bombUp';
    }
  }

  resetProperties(){

  }
  // changeType(type){
  //   let oldType = this._type;
  //   this._type = type;
  //   this.updateDomType(oldType, type);
  // }

  updateClassDir(dir){
    this.$elmt.find('.sprite').removeClass('LEFT');
    this.$elmt.find('.sprite').removeClass('RIGHT');
    this.$elmt.find('.sprite').removeClass('UP');
    this.$elmt.find('.sprite').removeClass('DOWN');
    this.$elmt.find('.sprite').addClass(dir);
  }

  updateDomType(oldType, newType){
    this._$elmt.removeClass(`cell--${oldType}`);
    this._$elmt.addClass(`cell--${newType}`);
  }

  updateAllPosFrom(base){
    switch (base) {
      case 'center':
        for (const [key, value] of Object.entries(this._center)){
          this._upperLeft[key] = value-this.centerOffset;
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
  get size()     { return this._size; }

  set type(type)                { this._type = type; }
  set upperLeft(upperLeft)      { this._upperLeft = upperLeft; }
  set grid(grid)                { this._grid = grid; }
  set center(center)            { this._center = center; }
  set $elmt($elmt)              { this._$elmt = $elmt; }
  set size(val)                 { this._size = val; }
}
