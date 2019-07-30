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
    // this.replaceTypeOfCells(this.cellsBlock, 'block');
    // this.replaceTypeOfCells(this.cellsWall, 'wall');
  }

  constructGridCells(cells){
    this._cells = [];
    for (let xG=0; xG<gridWidth; xG++) {
      let tmpTabAllY = [];
      for (let yG=0; yG<gridHeight; yG++) {
        let tmpCell = new Cell(xG, yG, this._cellSize);
        tmpTabAllY.push(tmpCell);
      }
      this._cells.push(tmpTabAllY);
    }
  }
    // let cellsDom = $('.cell').toArray();
    // // console.log($cellsDom.toArray());
    // for (let y=0 ; y<gridHeight ; y++) {
    //   let tmpTabAllY = [];
    //   for (let x=0; x<gridWidth; x++) {
    //     let elmt = cellsDom[x*this.gridWidth+y]
    //     let tmpCell = new Cell($(elmt), this.cellSize);
    //     tmpTabAllY.push(tmpCell);
    //     // C'EST QU'UN TABLEAU ET PAS UN TABLEAU DE TABLEAU
    //     // let tmpCell = new Cell($(elmt), this.cellSize);
    //   }
    //   this.cells.push(tmpTabAllY);
    // }

  constructForeCell(xG, yG, type, isForeground=true){
    // let $tmpCell = domAddForeCell(xG, yG, type);
    let tmpCell = new Cell(xG, yG, this.cellSize, type, isForeground=true);
    this._cells.push(tmpCell);
  }

  getCellAt(x, y){
    return this._cells[x][y];
  }
  getCellTypeAt(x, y){
    let tmpCell = this.getCellAt(x, y);
    return tmpCell.type;
  }

  replaceTypeOfCells(cellsPos, type){
    for (let pos of cellsPos) {
      this._cells[pos[0]][pos[1]].changeType(type);
    }
  }

  static posToGridPos(x, y){
    let gridX = Math.floor( x/tileSize );
    let gridY = Math.floor( y/tileSize );
    let grid = {'x':gridX, 'y':gridY};
    return grid;
  }

  static closestCols(xUpperLeft){
    if(xUpperLeft%tileSize<tileSize/2){
      return ['LEFT', 'RIGHT'];
    }else{
      return ['RIGHT', 'LEFT'];
    }
  }

  static closestLines(yUpperLeft){
    let distBweenCoorAndUpCol = yUpperLeft%tileSize;
    if(distBweenCoorAndUpCol<tileSize/2){
      return ['UP', 'DOWN'];
    }else{
      return ['DOWN', 'UP'];
    }
  }

  static offsetToBeOnALine(yUpperLeft){
    let offset = yUpperLeft%tileSize;
    if(this.closestLines(yUpperLeft)[0]=='UP'){
      offset *=(-1);
    }
    return offset;
    // mettre plutôt return offset pixel
    // console.log("next is in testing on line !");
    // return this.offsetToBeOnACol(y);//puisque sizeCellHeight==sizeCell==sizeCellWidth
  }
  static offsetToBeOnACol(xUpperLeft){
    let offset = xUpperLeft%tileSize;
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
