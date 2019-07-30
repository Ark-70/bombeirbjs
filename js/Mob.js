class Mob {

  constructor(xG, yG, type) {
    this.cell = new Cell(xG, yG, size, 'mob', true);
    this.type = type;
    this.extraLives;
    this.speed;
    this.inMovement;
    this.iddleTime;

    switch (this.type) {
      case 'glouton':

        break;
      case 'mickey':
      default:

    }

  }

  init(){

  }

  update(){
    if(!_inMovement){
      let nextMove = this.decideMove();

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

}
