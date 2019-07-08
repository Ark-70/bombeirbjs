const DB_MAP = 1;

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
    for (let yG=0; yG<gridHeight; yG++) {
      let tmpTabAllY = [];
      for (let xG=0; xG<gridWidth; xG++) {
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

  constructForeCell(xG, yG, type, foreground=true){
    // let $tmpCell = domAddForeCell(xG, yG, type);
    let tmpCell = new Cell(xG, yG, this.cellSize, type, isForeground=true);
    this._cells.push(tmpCell);
  }

  getCellAt(x, y){
    console.log("get cell at", this._cells, x, y);
    return this._cells[x][y];
  }
  getCellTypeAt(x, y){
    let tmpCell = this.getCellAt(x, y);
    return tmpCell.getType();
  }

  replaceTypeOfCells(cellsPos, type){
    for (let pos of cellsPos) {
      this._cells[pos[0]][pos[1]].changeType(type);
    }
  }

  static posToGridPos(x, y){
    let sizeCell = Math.round($($('.cell')[0]).css('height').replace('px',''));

    // let remainX = (x-Math.floor(x/sizeCell))%sizeCell;
    // let remainY = (y-Math.floor(y/sizeCell))%sizeCell;
    // let gridX = Math.floor( (x-remainX)/(sizeCell+1) );
    // let gridY = Math.floor( (y-remainY)/(sizeCell+1) );
    let gridX = Math.floor( x/sizeCell );
    let gridY = Math.floor( y/sizeCell );

    // console.log(`ALLO. y=[${y}], cellSize=[${sizeCell}], remainY=[${remainY}], gridY=[${gridY}]`);
    // if(DB_MAP) console.log(`DBMAP y=[${y}], x=[${x}], cellSize=[${sizeCell}], remainY=[${remainY}], gridY=[${gridY}], gridX=[${gridX}]`);
    return [gridX, gridY];
  }

  static closestCol(x){
    let sizeCell = Math.round($($('.cell')[0]).css('height').replace('px',''));
    if(x%sizeCell<sizeCell/2){
      return 'LEFT';
    }else{
      return 'RIGHT';
    }
  }

  static closestLine(y){
    let sizeCell = Math.round($($('.cell')[0]).css('height').replace('px',''));
    if(y%sizeCell<sizeCell/2){
      return 'UP';
    }else{
      return 'DOWN';
    }
  }

  static offsetToBeOnALine(y){
    let sizeCell = Math.round($($('.cell')[0]).css('height').replace('px',''));
    let offset = y%sizeCell;
    if(this.closestLine(y)==UP){
      offset *=(-1);
    }
    return offset;
    // mettre plutôt return offset pixel
    // console.log("next is in testing on line !");
    // return this.offsetToBeOnACol(y);//puisque sizeCellHeight==sizeCell==sizeCellWidth
  }
  static offsetToBeOnACol(x){
    let sizeCell = Math.round($($('.cell')[0]).css('height').replace('px',''));
    let offset = x%sizeCell;
    if(this.closestCol(x)==LEFT){
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
    console.log(cell1, cell2);
    console.log("=> distance =", (Math.abs(cell1.pos-cell2.pos)-cell1.width/2-cell2.width/2));
    return ( Math.abs(cell1.pos-cell2.pos)-cell1.width/2-cell2.width/2 );
  }
}
