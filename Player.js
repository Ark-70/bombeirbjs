class Player extends Entity{
  constructor(x, y, speed=5) {
    super(x, y);
    this.speed = speed;
    let gridPos = Map.posToGridPos(x, y);
    this.gridX = gridPos[0];
    this.gridY = gridPos[1];
    this.direction;
    this.goingDir;
  }

  // canTheyMove(this.x, this.y){
  //
  // }
  moveInGoingDir(ajustedSpeed=undefined){
    let speedToUse;
    if(ajustedSpeed!=undefined){
      speedToUse = ajustedSpeed;
    }else{
      speedToUse = this.speed;
    }

    let newX = this.x, newY = this.y;
    switch (this.goingDir) {
      case LEFT:
        newX = this.x - speedToUse;
      break;
      case RIGHT:
        newX = this.x + speedToUse;
      break;
      case UP:
        newY = this.y - speedToUse;
      break;
      case DOWN:
        newY = this.y + speedToUse;
      break;
    }
    this.move(newX, newY);
  }

  move(x, y){
    this.x = x;
    this.y = y;
  }

  display(){
    let z = this.y*gridWidth+this.x;
    $('.player').css('left',this.x);
    $('.player').css('top',this.y);
    // $($('.cell')[z]).css('background-color', 'black');
    // $($('.cell')[z]).addClass('cell--player');

  }

  // set speed(speed){
  //   this.speed = sêed;
  // }

  wantToMove(dir){
    let offsetToLine = Map.offsetToBeOnALine(this.y);
    let offsetToCol = Map.offsetToBeOnACol(this.x);

    if(dir==LEFT || dir==RIGHT){
      if(!offsetToLine){
        this.goingDir = dir;
        this.moveInGoingDir();
      }else if(offsetToLine<this.speed){
        console.log("snapping into",offsetToLine);
        this.move(this.x, this.y+offsetToLine);
      }else{
        this.goingDir = Map.closestLine(this.y);
        this.moveInGoingDir();
      }
    }else if(dir==UP || dir==DOWN){
      if(!offsetToCol){
        this.goingDir = dir;
        this.moveInGoingDir();
        }else if(offsetToCol<this.speed){
        console.log("trying to snap !","this.x",this.x, "+ offsetToCol", offsetToCol, " = ", this.x+offsetToCol);
        this.move(this.x+offsetToCol, this.y);
      }else{
        this.goingDir = Map.closestCol(this.x);
        this.moveInGoingDir();
      }
    }
  }


}
