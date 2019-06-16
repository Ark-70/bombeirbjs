class Map {
  constructor(mapSize, gridSize, cellSize) {
    this.mapSize = mapSize; //px
    this.heightSize = gridSize; //number of cells
    this.widthSize = gridSize; //number of cells
    this.cellSize = cellSize; //px
  }

  static posToGridPos(x, y){
    let sizeCell = Math.round($($('.cell')[0]).css('height').replace('px',''));
    let centrdX = x+(sizeCell/2);

    let remain = x%sizeCell;
    let gridX = x-remain/sizeCell;
    remain = y%sizeCell;
    let gridY = y-remain/sizeCell;

    return [gridX, gridY];
  }

  static closestCol(x){
    let sizeCell = Math.round($($('.cell')[0]).css('height').replace('px',''));
    if(x%sizeCell<sizeCell/2){
      return LEFT;
    }else{
      return RIGHT;
    }
  }

  static closestLine(y){
    let sizeCell = Math.round($($('.cell')[0]).css('height').replace('px',''));
    if(y%sizeCell<sizeCell/2){
      return UP;
    }else{
      return DOWN;
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
}
