const DB_MAP = 1;

class Map {
  $elmt;
  gridWidth;
  gridHeight;
  height;
  width;
  cells;

  constructor($map, gridWidth, gridHeight) {
    this.$elmt = $map;
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.height = getUsableHeight(gridHeight);
    this.width = getUsableWidth(gridWidth);
    this.cellSize = this.height/gridHeight;//marche tant que height==width
    this.constructGridCells(this.cells);
    this.cellsWall = [[8, 12], [2, 5], [10, 4], [12, 6], [6, 6], [7, 1]];
    this.cellsBlock = [[10, 12], [4, 5], [8, 4], [6,9], [10,7], [4,1], [11,1], [2,10]];
    // this.replaceTypeOfCells(this.cellsBlock, 'block');
    // this.replaceTypeOfCells(this.cellsWall, 'wall');
  }

  constructGridCells(cells){
    this.cells = [];
    for (let yG=0; yG<gridHeight; yG++) {
      let tmpTabAllY = [];
      for (let xG=0; xG<gridWidth; xG++) {
        let tmpCell = new Cell(xG, yG, this.cellSize);
        tmpTabAllY.push(tmpCell);
      }
      this.cells.push(tmpTabAllY);
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
    this.cells.push(tmpCell);
  }

  getCellAt(x, y){
    console.log("get cell at", this.cells, x, y);
    return this.cells[x][y];
  }
  getCellTypeAt(x, y){
    let tmpCell = this.getCellAt(x, y);
    return tmpCell.getType();
  }

  replaceTypeOfCells(cellsPos, type){
    for (let pos of cellsPos) {
      this.cells[pos[0]][pos[1]].changeType(type);
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

  getCellSize(){
    return this.cellSize;
  }

  static innerDistanceBweenCells(cell1, cell2){
    // cell.pos, .width
    // TODO elle pue de ouf cell1 est prise depuis son centre mais pas cell2
    console.log(cell1, cell2);
    console.log("=> distance =", (Math.abs(cell1.pos-cell2.pos)-cell1.width/2-cell2.width/2));
    return ( Math.abs(cell1.pos-cell2.pos)-cell1.width/2-cell2.width/2 );
  }
}
