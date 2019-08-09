class Bombermob extends Mob{
  //The bomberman-type ennemies (can plant bombs)

  constructor(xG, yG) {
    super(xG, yG, 'bomber');
    this.speed = 3;
    this.state = 'iddle_first_frame';
    this.startIddleDate;
    this.nextMove;
    this.iddleDuration;
    this.animation = new MyAnimation(this.cell.$elmt.find('.sprite'), 'bomberman.png', 250, [1, 0, 2, 0], true);
  }

  init(){

  }

  update(){
    // debugger;
    switch (this.state) {

      case 'iddle_first_frame':
        stopAnimationIfOn(this);
        this.startIddleDate = (new Date()).getTime();
        this.iddleDuration = Math.random()*3500+1000;
        this.state = 'iddle';
      //no break -> ->

      case 'iddle':
        debugger;
        if(this.iddleTimeFinished()){
          this.startIddleDate = null;
          this.prepareToMove();
          this.moveTo(this.nextMove, this.cellDestination);
          this.state = 'moving';
        }
      break;

      case 'moving':
        startAnimationIfOff(this);
        if(this.canTheyStillMove()){
          let success = this.moveTo(this.nextMove, this.cellDestination);
          if(success){
            this.cell.updateClassDir(this.nextMove);
          }else{
            if(Math.random()<0.5){
              this.state = 'iddle'; //don't stop animation, juste rethink of a move
            }else{
              this.state = 'iddle_first_frame';
            }
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
    debugger;
    let possibleMoves = this.whereCanTheyMove();
    this.nextMove = this.chooseMove(possibleMoves);
    this.cellDestination = this.nextCellAfterMove(this.nextMove);
  }

  canTheyStillMove(){return 1};

  chooseMove(possibleMoves){
    let index = Math.floor(Math.random()*possibleMoves.length);
    console.log(possibleMoves);
    return possibleMoves[index];
    // return 'RIGHT';
  }

  canTheyMove(){

  }

  nextCellAfterMove(dir){
    if(dir=='LEFT')   return {x:this.cell.grid.x-1, y:this.cell.grid.y};
    if(dir=='RIGHT')  return {x:this.cell.grid.x+1, y:this.cell.grid.y};
    if(dir=='UP')     return {x:this.cell.grid.x,   y:this.cell.grid.y-1};
    if(dir=='DOWN')   return {x:this.cell.grid.x,   y:this.cell.grid.y+1};
  }

  moveTo(direction, cellDest){
    // let cellDestUL = cellDest.x
    let speedX = 0;
    let speedY = 0;
    let canMove = 0;//canMove move
    switch (direction) {
      case 'LEFT':
      if(gridPosToUpperLeft(cellDest.x)<this.cell.upperLeft.x) canMove = 1;
        speedX = -this.speed;
        break;
      case 'RIGHT':
        if(this.cell.upperLeft.x<gridPosToUpperLeft(cellDest.x)) canMove = 1;
        // if(this.cell.upperLeft.x<gridPosToUpperLeft(cellDest.x)+TILE_SIZE-1) canMove = 1;
        speedX = this.speed;
        break;
      case 'UP':
        if(gridPosToUpperLeft(cellDest.y)<this.cell.upperLeft.y) canMove = 1;
        speedY = -this.speed;
        break;
      case 'DOWN':
        if(this.cell.upperLeft.y<gridPosToUpperLeft(cellDest.y)) canMove = 1;
        speedY = this.speed;
        break;
    }
    if(canMove){
      // this.move(direction);
      this.changePosition(this.cell.center.x+speedX, this.cell.center.y+speedY) //speedX
    }
    return canMove;
  }



  changePosition(x, y){
    this.cell.center = {'x':x, 'y':y};
    this.cell.updateAllPosFrom('center');
  }

  display(){
    this.cell.$elmt.css('left',this.cell.upperLeft.x);
    this.cell.$elmt.css('top',this.cell.upperLeft.y);
  }


  //QUICK FUNCTIONS / ABSTRACTION FUNCTIONS
  move(dir){
  //marche pas cette merde je laisse tomber
    let speedX, speedY;
    switch (dir) {
      case 'LEFT':  speedX = (-1)*this.speed; break;
      case 'RIGHT': speedX = this.speed;      break;
      case 'UP':    speedY = (-1)*this.speed; break;
      case 'DOWN':  speedY = this.speed;      break;
      default:
    }
    debugger;
    this.changePosition(this.cell.center.x+speedX, this.cell.center.y+speedY);
    changeSprite;
  }

  iddleTimeFinished(){
    return ( (new Date()).getTime() > (this.startIddleDate + this.iddleDuration) );
  }

  // firstFrameOfIddle(){ return (this.startIddleDate == null) }

}
