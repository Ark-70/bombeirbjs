class Mob {

  constructor(xG, yG, type) {
    this.cell = new Forecell(xG, yG, 'mob');
    this.type = type;
    this.extraLives;
    this.speed;
    this.state;//'moving' 'iddle' 'exploding' 'invulnerable'
    this.iddleTime;
    this.nextMove;

    switch (this.type) {
      case 'glouton':

        break;
      case 'bigoudi':
      default:
    }

  }

  init(){

  }

  update(){
    switch (this.state) {
      case 'iddle':
        let possibleMoves = this.whereCanTheyMove();
        let nextMove = this.decideMove(possibleMoves);
        this.startMoving(nextMove);
        this.state = 'moving';
        break;
      case 'moving':
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
      case 'invulnerable':
        break;
      default:
    }
  }


  whereCanTheyMove(){
    let x = this.grid.x;
    let y = this.grid.y;
    let cells = [[x-1, y], [x, y-1], [x+1, y], [x, y+1]];
    for (var i = 0; i < cells.length; i++) {
      let type = map.getCellTypeAt(cells[i][0], cell[i][1]);
      if(Mob.isTypeAnObstacle(type)){ //equivalent this.constructor.isTypeAnObstacle()
      }

    }

  }


  decideMove(){

  }

  canTheyMove(){

  }

  moveDir(){

  }

  move(){

  }

  static isTypeAnObstacle(type){
    switch (type) {
      case 'block':
      case 'wall':
      case 'bomb':
      case 'item':
      return 1;
      break;
      default:
      return 0;
    }
  }

}
