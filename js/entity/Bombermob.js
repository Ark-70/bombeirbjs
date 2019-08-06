class Bombermob extends Mob{
  //The bomberman-type ennemies (can plant bombs)

  constructor(xG, yG) {
    super(xG, yG, 'bomber');
  }

  init(){

  }

  update(){
    switch (this.state) {

      case 'iddle':
        let possibleMoves = this.whereCanTheyMove();
        this.nextMove = this.decideMove(possibleMoves);
        this.cellDestination = this.nextCellAfterMove(this.nextMove);
        this.moveTo(this.nextMove, this.cellDestination);
        this.state = 'moving';
        break;

      case 'moving':
          if(this.canTheyStillMove()){
            this.moveTo(this.nextMove, this.cellDestination);
          }else{
            this.bePushedAway();//if not entirely on the cell
          }
          this.state = 'iddle';
        break;

      case 'exploding':

        break;
      case 'invulnerable':
        break;
      default:
    }
  }

  canTheyStillMove(){return 1};

  decideMove(){
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
    let still = 0;//still move
    switch (direction) {
      case 'LEFT':
        if(cellDest.x<this.cell.upperLeft.x) still = 1;
        speedX = this.speed;
        break;
      case 'RIGHT':
        if(this.cell.upperLeft.x<cellDest.x+TILE_SIZE) still = 1;
        speedX = this.speed;
        break;
      case 'UP':
        if(cellDest.y<this.cell.upperLeft.y) still = 1;
        speedY = this.speed;
        break;
      case 'DOWN':
        if(this.cell.upperLeft.y<cellDest.y+TILE_SIZE) still = 1;
        speedY = this.speed;
        break;
    }
    if(still) move(this.cell.grid.x+speedX, this.cell.grid.y+speedY)
  }

  move(x, y){
    this.cell.center = {'x':x, 'y':y};
    this.cell.updateAllPosFrom('center');
  }

}
