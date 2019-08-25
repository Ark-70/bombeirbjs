class Mob {

  constructor(xG, yG, type) {
    this.cell = new Forecell(xG, yG, 'mob');
    this.type = type;
    this.extraLives;
    this.speed;
    this.state = 'iddle';//'moving' 'iddle' 'exploding' 'invulnerable'
    this.iddleTime;
    this.nextMove;
  }

  init(){

  }

  update(){
    switch (this.state) {
      case 'iddle':
      stopAnimationIfOn(animatable);
        let possibleMoves = this.whereCanTheyMove();
        let nextMove = this.decideMove(possibleMoves);
        this.startMoving(nextMove);
        this.state = 'moving';
        break;
      case 'moving':
        startAnimationIfOff(animatable);
        if(!moveHasEnded()){
          if(this.canTheyStillMove()){
            keepMoving(nextMove);
          }else{
            this.bePushedAway();//if not entirely on the cell
          }
        }else{
          this.state = 'iddle';
        }
        break;
      case 'exploding':

        break;
      case 'dead':

        break;
      case 'invulnerable':
        break;
      default:
    }
  }

  die(){
    this.state = 'dead';
    this.cell.$elmt.remove();
  }


  whereCanTheyMove(){
    let x = this.cell.grid.x;
    let y = this.cell.grid.y;
    let cells = [[x-1, y], [x, y-1], [x+1, y], [x, y+1]];
    let correspondingCellsDir = ['LEFT', 'UP', 'RIGHT', 'DOWN']
    let possiblesTab = [];

    for (var i = 0; i < cells.length; i++) {
      let type = map.getCellTypeAt(cells[i][0], cells[i][1]);
      if(!Mob.isTypeAnObstacle(type)){ //equivalent this.constructor.isTypeAnObstacle()
        possiblesTab.push(correspondingCellsDir[i]);
      }
    }
    return possiblesTab;
  }


  decideMove(){

  }

  canTheyMove(){

  }

  moveDir(){

  }

  move(){

  }

  display(){
    this._cell.$elmt.css('left',this._cell.upperLeft.x);
    this._cell.$elmt.css('top',this._cell.upperLeft.y);
  }


  // STATICS
  static isTypeAnObstacle(type){
    switch (type) {
      case 'block':
      case 'wall':
      case 'bomb':
      case 'item':
        return 1;
      default:
        return 0;
    }
  }

}
