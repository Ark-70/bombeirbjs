class Mob {
  _cell;
  _type;
  _extraLives;
  _speed;
  _type;
  _inMovement;
  _iddleTime;

  constructor(xG, yG, type) {
    this.cell = new Cell(xG, yG, size, 'mob', true);
    this.type = type;

    switch (this.type) {
      case 'glouton':

        break;
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
