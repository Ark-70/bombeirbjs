const DB_MAP = 0;

class Map {
  _$elmt;
  _gridWidth;
  _gridHeight;
  _height;
  _width;
  _cells;
  _cellSize;

  constructor($map, gridWidth, gridHeight) {
    console.log($map);
    this.items = [];
    this._$elmt = $map;
    this._gridWidth = gridWidth;
    this._gridHeight = gridHeight;
    this._height = getUsableHeight(gridHeight);
    this._width = getUsableWidth(gridWidth);
    this._cellSize = this._height/gridHeight;//marche tant que height==width
    console.log(this._cellSize);
    this.constructGridCells(this.cells);
    this._cellsWall = [[8, 12], [2, 5], [10, 4], [12, 6], [6, 6], [7, 1]];
    this._cellsBlock = [[10, 12], [4, 5], [8, 4], [6,9], [10,7], [4,1], [11,1], [2,10]];
    this.mobs = [[7, 6], [3, 3], [6, 6], [8,8]];
    // this.replaceTypeOfCells(this.cellsBlock, 'block');
    // this.replaceTypeOfCells(this.cellsWall, 'wall');
  }

  constructGridCells(cells){
    this._cells = [];
    for (let xG=0; xG<gridWidth; xG++) {
      let tmpTabAllY = [];
      for (let yG=0; yG<gridHeight; yG++) {
        let tmpCell = new Cell(xG, yG);
        tmpTabAllY.push(tmpCell);
      }
      this._cells.push(tmpTabAllY);
    }
    // debugger;
  }

  constructForeCell(xG, yG, type){
    // let $tmpCell = domAddForeCell(xG, yG, type);
    let tmpCell = new Cell(xG, yG, type, true);
    this._cells.push(tmpCell);
  }

  getCellAt(x, y){
      let cell = this._cells[x][y];
      if(cell==undefined){
        debugger; console.error("!");
      }
    return cell;
  }
  getCellTypeAt(x, y){
    let tmpCell = this.getCellAt(x, y);
    return tmpCell.type;
  }

  createForecellMobs(posTab){
    let tmpTab = [];
    for (let pos of posTab) {
      tmpTab.push(new Bombermob(pos[0], pos[1]));
    }
    return tmpTab;
  }

  replaceTypeOfCells(cellsPosTab, type){
    // let oldCell = xG, yG, type='empty', isForeground=false, drop=null
    for (let cellPos of cellsPosTab) {
      this.replaceSingleTypeOfCells(cellPos, type);
    }
  }
  replaceSingleTypeOfCells(cellPos, type){
    let old = this._cells[cellPos[0]][cellPos[1]];
    let newCell;
    switch (type) {
      case 'block':
        newCell = new Block(old.grid.x, old.grid.y, 'bombUp'); break;
      case 'wall':
        newCell = new Wall(old.grid.x, old.grid.y); break;
      case 'item':
        newCell = new Item(old.grid.x, old.grid.y); break;
      default:
        newCell = new Cell(old.grid.x, old.grid.y, type);
    }
    this._cells[cellPos[0]][cellPos[1]] = newCell;
    // old._$elmt.removeClass().addClass('cell');
    newCell._$elmt = old._$elmt;
    newCell.updateDomType(old.type, newCell.type);
  }

  static posToGridPos(x, y){
    let gridX = Math.floor( x/TILE_SIZE );
    let gridY = Math.floor( y/TILE_SIZE );
    let grid = {'x':gridX, 'y':gridY};
    return grid;
  }

  static closestCols(xUpperLeft){
    if(xUpperLeft%TILE_SIZE<TILE_SIZE/2){
      return ['LEFT', 'RIGHT'];
    }else{
      return ['RIGHT', 'LEFT'];
    }
  }

  static closestLines(yUpperLeft){
    let distBweenCoorAndUpCol = yUpperLeft%TILE_SIZE;
    if(distBweenCoorAndUpCol<TILE_SIZE/2){
      return ['UP', 'DOWN'];
    }else{
      return ['DOWN', 'UP'];
    }
  }

  static offsetToBeOnALine(yUpperLeft){
    let offset = yUpperLeft%TILE_SIZE;
    if(this.closestLines(yUpperLeft)[0]=='UP'){
      offset *=(-1);
    }
    return offset;
    // mettre plutôt return offset pixel
    // console.log("next is in testing on line !");
    // return this.offsetToBeOnACol(y);//puisque sizeCellHeight==sizeCell==sizeCellWidth
  }
  static offsetToBeOnACol(xUpperLeft){
    let offset = xUpperLeft%TILE_SIZE;
    if(this.closestCols(xUpperLeft)[0]=='LEFT'){
      offset *=(-1);
    }
    return offset;
  }

  get cellSize(){ return this._cellSize; }
  get cellsWall(){ return this._cellsWall; }
  get cellsBlock(){ return this._cellsBlock; }
  get cells(){ return this._cells; }


  static innerDistanceBweenCells(cell1, cell2){
    // cell.pos, .width
    // TODO elle pue de ouf cell1 est prise depuis son centre mais pas cell2
    return ( Math.abs(cell1.pos-cell2.pos)-cell1.width/2-cell2.width/2 );
  }
}
