class Bombermob extends Mob{
  //The bomberman-type ennemies (can plant bombs)

  constructor(xG, yG) {
    super(xG, yG, 'bomber');
    this.speed = 3;
  }

  init(){

  }

  update(){
    switch (this.state) {

      case 'iddle':
        if(waitingTimeFinished(){
          this.prepareToMove();
          this.moveTo(this.nextMove, this.cellDestination);
          this.state = 'moving';
          break;
        }

      case 'moving':
        if(this.canTheyStillMove()){
          let success = this.moveTo(this.nextMove, this.cellDestination);
          if(!success){
            this.state = 'iddle';
          }
        }else{
          this.bePushedAway();//if not entirely on the cell
        }

          // this.state = 'iddle';
        break;

      case 'exploding':

        break;
      case 'invulnerable':
        break;
      default:
    }
  }

  prepareToMove(){
    let possibleMoves = this.whereCanTheyMove();
    this.nextMove = this.chooseMove(possibleMoves);
    this.cellDestination = this.nextCellAfterMove(this.nextMove);
  }

  canTheyStillMove(){return 1};

  chooseMove(){
    return 'RIGHT';
  }

  canTheyMove(){

  }

  nextCellAfterMove(dir){
    if(dir=='LEFT')   return {x:this.cell.grid.x, y:this.cell.grid.y};
    if(dir=='RIGHT')  return {x:this.cell.grid.x, y:this.cell.grid.y};
    if(dir=='UP')     return {x:this.cell.grid.x, y:this.cell.grid.y-1};
    if(dir=='DOWN')   return {x:this.cell.grid.x, y:this.cell.grid.y+1};
  }

  moveTo(direction, cellDest){
    // let cellDestUL = cellDest.x
    let speedX = 0;
    let speedY = 0;
    let canMove = 0;//canMove move
    switch (direction) {
      case 'LEFT':
      if(gridPosToUpperLeft(cellDest.x)<this.cell.upperLeft.x) canMove = 1;
        speedX = this.speed;
        break;
      case 'RIGHT':
        console.log(this.cell.upperLeft.x,"<",gridPosToUpperLeft(cellDest.x)+TILE_SIZE-1);
        debugger;
        if(this.cell.upperLeft.x<gridPosToUpperLeft(cellDest.x)+TILE_SIZE-1) canMove = 1;
        speedX = this.speed;
        break;
      case 'UP':
        if(gridPosToUpperLeft(cellDest.y)<this.cell.upperLeft.y) canMove = 1;
        speedY = this.speed;
        break;
      case 'DOWN':
        if(this.cell.upperLeft.y<gridPosToUpperLeft(cellDest.y)+TILE_SIZE-1) canMove = 1;
        speedY = this.speed;
        break;
    }
    if(canMove) this.move(this.cell.center.x+speedX+speedX, this.cell.center.y+speedY) //speedX
    return canMove
  }

  move(x, y){
    this.cell.center = {'x':x, 'y':y};
    this.cell.updateAllPosFrom('center');
  }

  display(){
    this.cell.$elmt.css('left',this.cell.upperLeft.x);
    this.cell.$elmt.css('top',this.cell.upperLeft.y);
  }

}
