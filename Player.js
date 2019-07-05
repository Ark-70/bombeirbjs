class Player{
  cell;
  maxSpeed;
  directions;// wantedMovement;
  goingDir;// movement;

  constructor(xG, yG, size, speed=3) {
    // super(x, y);
    this.cell = new Cell(xG, yG, size, 'player');

    // this.x = x;
    // this.y = y;
    // console.log(map.cellSize);
    // console.log($($('.cell')[0]).css('height'));
    // this.width = map.cellSize;
    // this.height = map.cellSize;
    // this.offsetFromCenter = {x:(-this.width/2), y:(-this.height/2)};
    // this.x += map.cellSize/2;
    // this.y += map.cellSize/2;
    this.maxSpeed = speed;
    this.keyDown = {'x':{'UP':0, 'DOWN':0}, 'y':{'LEFT':0, 'RIGHT':0}};
    // let gridPos = Map.posToGridPos(xG, yG);
    // this.gridPos = {'x':gridPos[0], 'y':gridPos[1]};
    this.directions = {'x':0, 'y':0};
    this.goingDir = this.directions;
  }

  update(){
    // if()
    if (this.directions.x!=0 || this.directions.y!=0){
      this.wantToMove();
    }
  }

  plantBomb(){
    let xG = this.gridPos.x, yG = this.gridPos.y;
    if(map.getCellTypeAt(xG, yG)=='empty'){
      map.constructForeCell(xG, yG, 'bomb');
    }

  }

  canTheyMove(directions){

  }

  wantToMove(){
      let nextPos = this.posAfterDir(this.directions);
      let obstacles = this.obstaclesOn(...nextPos);
      let offsetToLine = Map.offsetToBeOnALine(this.y);
      let offsetToCol = Map.offsetToBeOnACol(this.x);
      // console.log("nextPos", nextPos);
      // if(this.canTheyMove(...nextPos)){//METTRE TOUT LE TABLEAU

      if(obstacles==0){//METTRE TOUT LE TABLEAU //Obligé ==0 pour []==0
        this.move(...nextPos);
        console.log("moved");
      }else{
        console.log("thereisobstacle", obstacles);
        let objA = {posCtr:0, width:this.width}, objB = {posCtr:0, width:map.cellSize};
        //C'est ici que posCtr s'écrase même s'il y a une diagonale
        if(this.directions.x!=0) {
            objA.posCtr = this.x; //gauche de l'objet A
            objB.posCtr = obstacles[0][0]*map.cellSize+map.cellSize/2; //droite de l'objet B
        }
        if(this.directions.y!=0) {
            objA.posCtr = this.y; //gauche de l'objet A
            objB.posCtr = obstacles[0][1]*map.cellSize+map.cellSize/2; //droite de l'objet B
        }
        // let objs = this.getPosOfObjs()
        let distance = Map.innerDistanceBweenCells({pos:objA.posCtr, width:objA.width},{pos:objB.posCtr, width:objB.width});


        // let distance = Map.innerDistanceBweenCells({pos:this.y, width:this.height},{pos:obstacles[0][1]*map.cellSize, width:map.cellSize});
        console.log("distance et maxspeed",distance, this.maxSpeed);
        if( (-this.maxSpeed)<distance && distance<this.maxSpeed ){//TODO A CHANGER CA, C'EST BIZARRE QUE CE CAS SE TRAITE QUE MAINTENANT
          console.log("Need to snap on obstacle");
        // TODO c'est chelou qu'un jour j'ai une distance = -1 mais bon ballec maintenant j'ai bodge pour que ça marche alors ça va pas me faire chier longtemps
          let addPos = {x:0,y:0};
          switch (this.directions.x) {
            case 'LEFT':
            case 'RIGHT':
              addPos.x = Math.abs(distance);
              break;
          }
          switch (this.directions.y) {
            case 'UP':
            case 'DOWN':
              addPos.y = Math.abs(distance);
              // console.log("On a distance = "+distance+" et on move ("+this.x+", "+this.y+distance+")");
              break;
          }
          this.move(this.x+addPos.x, this.y+addPos.y);
        }
      }//else{
        // this.goingDir = Map.closestLine(this.y);
        // this.moveInGoingDir();
      // }
      // }else if(!isTouchingObstacles(obstacles)){
      //   snapOnIt();
      // }else{
      //   glide();
      // }
    // this.moveInGoingDir();
    // if(dirX=='LEFT' || dirX=='RIGHT'){
    //   this.goingDir.x = dirX;
    //   this.moveInGoingDir();
    // }if(dirY=='UP' || dirY=='DOWN'){
    //   this.goingDir.y = dirY;
    //   this.moveInGoingDir();
    // }
  }

  isTouchingObstacles(obstacles){
    for (obstacle of obstacles) {
      obstacle
    }
  }

  getCornersOfPos(x, y){
    let off = this.offsetFromCenter;
    return [[x-off.x-1, y-off.y-1],
            [x+off.x+1, y-off.y-1],
            [x+off.x+1, y+off.y+1],
            [x-off.x-1, y+off.y+1]];
  }

  obstaclesOn(x, y){
    // optimisable : un coin toujours osef
    // optimisable : que les 8 cells autour sinon osef
    let cornersOfPlayer = this.getCornersOfPos(x, y);
    let casesMarchéesDessus = [];
    console.log("");
    console.log("corners", cornersOfPlayer);
    for (let corner of cornersOfPlayer) {
      // console.log("corner :", ...corner);
      let tmpGrid = Map.posToGridPos(...corner);
      let tmpTile = [ ...tmpGrid ];
      let alreadyInTab = 0;
      for (let tile of casesMarchéesDessus) {
        if(areEqualTab(tile, tmpTile)){
          alreadyInTab = 1;
        }
      }
      if(!alreadyInTab) casesMarchéesDessus.push(tmpTile);
    }
    console.log("cases marchees dessus", casesMarchéesDessus);

    // let collision=0;
    let obstacles = [];

    // console.log("On veut voir les types de : ", ...casesMarchéesDessus[0],"-", ...casesMarchéesDessus[1],"-", ...casesMarchéesDessus[2],"-", ...casesMarchéesDessus[3]);
    for (let cellPos of casesMarchéesDessus) {
      let tmpCell = map.getCellAt(...cellPos);
      if(tmpCell.getType()!='empty'){
        // collision=1;
        obstacles.push([...cellPos]);
        // console.log("cornersOfPlayer", cornersOfPlayer);
        // console.log(casesMarchéesDessus);
        // console.log(...cellPos);
        // console.log(tmpCell.$elmt[0]);
      }
    }
    return obstacles;
  }

  posAfterDir(dir, ajustedSpeed=undefined){
    let speedToUse = (ajustedSpeed==undefined) ? this.maxSpeed : ajustedSpeed;

    let newX = this.x, newY = this.y;
    switch (dir.x) {
      case 'LEFT':
        newX = this.x - speedToUse;
      break;
      case 'RIGHT':
        newX = this.x + speedToUse;
      break;
    }
    switch(dir.y){
      case 'UP':
        newY = this.y - speedToUse;
      break;
      case 'DOWN':
        newY = this.y + speedToUse;
      break;
    }
    return [newX, newY];
  }
  // moveInGoingDir(ajustedSpeed=undefined){
  //   let speedToUse;
  //   if(ajustedSpeed!=undefined){
  //     speedToUse = ajustedSpeed;
  //   }else{
  //     speedToUse = this.maxSpeed;
  //   }
  //
  //   let newX = this.x, newY = this.y;
  //   switch (this.goingDir.x) {
  //     case 'LEFT':
  //       newX = this.x - speedToUse;
  //     break;
  //     case 'RIGHT':
  //       newX = this.x + speedToUse;
  //     break;
  //   }
  //   switch(this.goingDir.y){
  //     case 'UP':
  //       newY = this.y - speedToUse;
  //     break;
  //     case 'DOWN':
  //       newY = this.y + speedToUse;
  //     break;
  //   }
  //   this.move(newX, newY);
  // }

  move(x, y){
    this.x = x;
    this.y = y;
    let gridPos = Map.posToGridPos(x, y);
    this.gridPos.x = gridPos[0];
    this.gridPos.y = gridPos[1];
    // gridPos[1]
  }

  display(){
    $('.player').css('left',this.x+this.offsetFromCenter.x);
    $('.player').css('top',this.y+this.offsetFromCenter.y);
    // $($('.cell')[z]).css('background-color', 'black');
    // $($('.cell')[z]).addClass('cell--player');

  }

  // set speed(speed){
  //   this.maxSpeed = sêed;
  // }

  resetDirection(axe){
    // ça ça sert plus à rien en vrai
    this.directions[axe] = 0;
    for (let key in this.keyDown) {
      // console.log("allo :", key, this.keyDown[key]);
      if (this.keyDown[key]==1) {
        this.directions[axe] = key;
        break;
      }
    }
  }



/* WITH OBSTACLES */
  redirectMove(dir){
    let offsetToLine = Map.offsetToBeOnALine(this.y);
    let offsetToCol = Map.offsetToBeOnACol(this.x);

    if(dir=='LEFT' || dir=='RIGHT'){
      if(!offsetToLine){
        this.goingDir = dir;
        this.moveInGoingDir();
      }else if(offsetToLine<this.maxSpeed){
        // console.log("snapping into", offsetToLine);
        this.move(this.x, this.y+offsetToLine);
      }else{
        this.goingDir = Map.closestLine(this.y);
        this.moveInGoingDir();
      }
    }else if(dir=='UP' || dir=='DOWN'){
      if(!offsetToCol){
        this.goingDir = dir;
        this.moveInGoingDir();
      }else if(offsetToCol<this.maxSpeed){
        // console.log("trying to snap !","this.x",this.x, "+ offsetToCol", offsetToCol, " = ", this.x+offsetToCol);
        this.move(this.x+offsetToCol, this.y);
      }else{
        this.goingDir = Map.closestCol(this.x);
        this.moveInGoingDir();
      }
    }
  }

// /* WITH OBSTACLES */
//   // wantToMove(dir){
//   //   let offsetToLine = Map.offsetToBeOnALine(this.y);
//   //   let offsetToCol = Map.offsetToBeOnACol(this.x);
//   //
//   //   if(dir=='LEFT' || dir=='RIGHT'){
//   //     if(!offsetToLine){
//   //       this.goingDir = dir;
//   //       this.moveInGoingDir();
//   //     }else if(offsetToLine<this.maxSpeed){
//   //       // console.log("snapping into", offsetToLine);
//   //       this.move(this.x, this.y+offsetToLine);
//   //     }else{
//   //       this.goingDir = Map.closestLine(this.y);
//   //       this.moveInGoingDir();
//   //     }
//   //   }else if(dir=='UP' || dir=='DOWN'){
//   //     if(!offsetToCol){
//   //       this.goingDir = dir;
//   //       this.moveInGoingDir();
//   //     }else if(offsetToCol<this.maxSpeed){
//   //       // console.log("trying to snap !","this.x",this.x, "+ offsetToCol", offsetToCol, " = ", this.x+offsetToCol);
//   //       this.move(this.x+offsetToCol, this.y);
//   //     }else{
//   //       this.goingDir = Map.closestCol(this.x);
//   //       this.moveInGoingDir();
//   //     }
//   //   }
//   // }


  updateX(x){ this.x = x; }
  updateY(y){ this.y = y; }
  setStateX(x){ this.state['x'] = x; }
  setStateY(y){ this.state['y'] = y; }
  setKeyDown(axe, keyStr, value=1){ this.keyDown[axe][keyStr]=value; }
  setDirection(axe, dir){ this.directions[axe] = dir; }
  getDirection(axe){ return this.directions[axe]; }
  getPosX(){ return this.x; }
  getPosY(){ return this.y; }
  getGridX(){ return this.gridPos.x; }
  getGridY(){ return this.gridPos.y; }
  getKeyDown(){ return this.keyDown; }
}
