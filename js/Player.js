class Player{
  _cell;
  maxSpeed;
  directions;// wantedMovement;
  goingDir;// movement;
  _power;
  _bombs;
  _flames;

  constructor(xG, yG, size, speed=3, power=3) {
    this._cell = new Cell(xG, yG, size, 'player', true);
    this._animation = new MyAnimation(this.cell.$elmt.find('.sprite'), 'bomberman.png', 250, [1, 0, 2, 0], true);
    this.maxSpeed = speed;
    this.keyDown = {'x':{'LEFT':0, 'RIGHT':0}, 'y':{'UP':0, 'DOWN':0}};
    this.directions = {'x':0, 'y':0};
    this.goingDir = this.directions;
    this._power = power;
    this._bombs = [];
    this._size = size;
    this._flames = [];
  }

  update(){
    if (this.wantingToMove()){

      if(this._animation.interval==null) this._animation.startAnimation();
      let nextPos = this.posAfterDir(this.directions);
      let obstacles = this.obstaclesOn(...nextPos);

      if(obstacles == 0){
        this.move(...nextPos);
      }else{ //obstacles nearby
        this.wantToMove(obstacles);
      }

    }else{
      if(this._animation.interval!=null) this._animation.stopAnimation();
    }
  }

  updateTheirBombs(){
    if(this._bombs.length){
      for (let i = this._bombs.length-1; i >= 0; i--) {
        this._bombs[i].update();
        if(this._bombs[i].shouldExplode()){
          this._flames.push(...this._bombs[i].explodeAndGetFlames());
          this._bombs.splice(i, 1);
        }
      }
    }
  }

  updateTheirFlames(){
    if(this._flames.length){
      for (let i = this._flames.length-1; i>=0 ; i--){
        this._flames[i].update();
        if(this._flames[i].shouldExpire()){
          map.items.push(this._flames[i].expire());
          this._flames.splice(i, 1);
        }
      }
    }
  }

  plantBomb(){
    let xG = this._cell.grid.x, yG = this._cell.grid.y;
    if(map.getCellTypeAt(xG, yG)=='empty'){
      this._bombs.push(new Bomb(xG, yG, this._size, this._power, (new Date()).getTime()) );

    }
  }

  canTheyMove(directions){

  }

  wantToMove(obstacles){
      // console.log("NEXT POS");
      // let offsetToLine = Map.offsetToBeOnALine(this._cell.center.y);
      // let offsetToCol = Map.offsetToBeOnACol(this._cell.center.x);
      // console.log("nextPos", nextPos);
      // if(this.canTheyMove(...nextPos)){//METTRE TOUT LE TABLEAU

      // if(obstacles==0){//METTRE TOUT LE TABLEAU //Obligé ==0 pour []==0
      //   console.log("moved");
      // }else{
        let objA = {posCtr:0, width:this._cell.size}, objB = {posCtr:0, width:map.cellSize};
        //C'est ici que posCtr s'écrase même s'il y a une diagonale
        if(this.directions.x!=0) {
            objA.posCtr = this._cell.center.x; //gauche de l'objet A
            objB.posCtr = obstacles[0][0]*map.cellSize+map.cellSize/2; //droite de l'objet B
        }
        if(this.directions.y!=0) {
            objA.posCtr = this._cell.center.y; //gauche de l'objet A
            objB.posCtr = obstacles[0][1]*map.cellSize+map.cellSize/2; //droite de l'objet B
        }
        // let objs = this.getPosOfObjs()
        console.log("objA width",objA.width);
        let distance = Map.innerDistanceBweenCells({pos:objA.posCtr, width:objA.width},{pos:objB.posCtr, width:objB.width});


        // let distance = Map.innerDistanceBweenCells({pos:this._cell.center.y, width:this.height},{pos:obstacles[0][1]*map.cellSize, width:map.cellSize});
        console.log("distance et maxspeed",distance, this.maxSpeed);
        if(Math.abs(distance)<this.maxSpeed && distance!=0){
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
              // console.log("On a distance = "+distance+" et on move ("+this._cell.center.x+", "+this._cell.center.y+distance+")");
              break;
          }
          this.move(this._cell.center.x+addPos.x, this._cell.center.y+addPos.y);
        }else if(distance == 0){
          console.log("allooooo je suis québlo");
          // this.redirectMove(this.directions);
        }
      // }
  }

  isTouchingObstacles(obstacles){
    for (obstacle of obstacles) {
      obstacle
    }
  }

  getCornersOfPos(x, y){
    let off = this._cell.centerOffset;
    return [[x-off+1, y-off+1],
            [x+off-1, y-off+1],
            [x+off-1, y+off-1],
            [x-off+1, y+off-1]];
  }

  obstaclesOn(x, y){
    // optimisable : un coin toujours osef
    // optimisable : que les 8 cells autour sinon osef
    let cornersOfPlayer = this.getCornersOfPos(x, y);
    let casesMarchéesDessus = [];
    console.log("corners", cornersOfPlayer.toString());
    for (let corner of cornersOfPlayer) {
      // console.log("corner :", ...corner);
      let tmpGrid = Map.posToGridPos(...corner);
      let tmpTile = [tmpGrid.x, tmpGrid.y];
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
      console.log('checking cellPos', ...cellPos, map.getCellTypeAt(...cellPos));
      if(map.getCellTypeAt(...cellPos)!='empty'){
        // collision=1;
        obstacles.push([...cellPos]);
      }
    }
    return obstacles;
  }

  posAfterDir(dir, ajustedSpeed=undefined){
    let speedToUse = (ajustedSpeed==undefined) ? this.maxSpeed : ajustedSpeed;

    let newX = this._cell.center.x, newY = this._cell.center.y;
    switch (dir.x) {
      case 'LEFT':
        newX = this._cell.center.x - speedToUse;
      break;
      case 'RIGHT':
        newX = this._cell.center.x + speedToUse;
      break;
    }
    switch(dir.y){
      case 'UP':
        newY = this._cell.center.y - speedToUse;
      break;
      case 'DOWN':
        newY = this._cell.center.y + speedToUse;
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
  //   let newX = this._cell.center.x, newY = this._cell.center.y;
  //   switch (this.goingDir.x) {
  //     case 'LEFT':
  //       newX = this._cell.center.x - speedToUse;
  //     break;
  //     case 'RIGHT':
  //       newX = this._cell.center.x + speedToUse;
  //     break;
  //   }
  //   switch(this.goingDir.y){
  //     case 'UP':
  //       newY = this._cell.center.y - speedToUse;
  //     break;
  //     case 'DOWN':
  //       newY = this._cell.center.y + speedToUse;
  //     break;
  //   }
  //   this.move(newX, newY);
  // }

  move(x, y){
    this._cell.center = {'x':x, 'y':y};
    this._cell.updateAllPosFrom('center');
    // this._cell.grid = Map.posToGridPos(x, y);
  }

  display(){
    this._cell.$elmt.css('left',this._cell.upperLeft.x);
    this._cell.$elmt.css('top',this._cell.upperLeft.y);

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
    let offsetToLine = Map.offsetToBeOnALine(this._cell.center.y);
    let offsetToCol = Map.offsetToBeOnACol(this._cell.center.x);

    let nextPos = this.posAfterDir(this.directions);

    if(dir.x=='LEFT' || dir.x=='RIGHT'){
      if(!offsetToLine){
        this.goingDir = dir;
        this.moveInGoingDir();
      }else if(offsetToLine<this.maxSpeed){
        this.move(this._cell.center.x, this._cell.center.y+offsetToLine);
      }else{
        this.goingDir = Map.closestLine(this._cell.center.y);
        this.move(...nextPos);
      }
    }
    if(dir.y=='UP' || dir.y=='DOWN'){
      if(!offsetToCol){
        this.goingDir = dir;
        this.moveInGoingDir();
      }else if(offsetToCol<this.maxSpeed){
        this.move(this._cell.center.x+offsetToCol, this._cell.center.y);
      }else{
        this.goingDir = Map.closestCol(this._cell.center.x);
        this.move(...nextPos);
      }
    }
  }

// /* WITH OBSTACLES */
//   // wantToMove(dir){
//   //   let offsetToLine = Map.offsetToBeOnALine(this._cell.center.y);
//   //   let offsetToCol = Map.offsetToBeOnACol(this._cell.center.x);
//   //
//   //   if(dir=='LEFT' || dir=='RIGHT'){
//   //     if(!offsetToLine){
//   //       this.goingDir = dir;
//   //       this.moveInGoingDir();
//   //     }else if(offsetToLine<this.maxSpeed){
//   //       // console.log("snapping into", offsetToLine);
//   //       this.move(this._cell.center.x, this._cell.center.y+offsetToLine);
//   //     }else{
//   //       this.goingDir = Map.closestLine(this._cell.center.y);
//   //       this.moveInGoingDir();
//   //     }
//   //   }else if(dir=='UP' || dir=='DOWN'){
//   //     if(!offsetToCol){
//   //       this.goingDir = dir;
//   //       this.moveInGoingDir();
//   //     }else if(offsetToCol<this.maxSpeed){
//   //       // console.log("trying to snap !","this._cell.center.x",this._cell.center.x, "+ offsetToCol", offsetToCol, " = ", this._cell.center.x+offsetToCol);
//   //       this.move(this._cell.center.x+offsetToCol, this._cell.center.y);
//   //     }else{
//   //       this.goingDir = Map.closestCol(this._cell.center.x);
//   //       this.moveInGoingDir();
//   //     }
//   //   }
//   // }


  wantingToMove(){ return (this.directions.x!=0 || this.directions.y!=0) }



  updateX(x){ this._cell.center.x = x; }
  updateY(y){ this._cell.center.y = y; }
  setStateX(x){ this.state['x'] = x; }
  setStateY(y){ this.state['y'] = y; }
  setKeyDown(axe, keyStr, value=1){
    this.keyDown[axe][keyStr]=value;
  }
  setDirection(axe, dir){
    this.directions[axe] = dir;
    this._cell.$elmt.find('.sprite').removeClass('UP');
    this._cell.$elmt.find('.sprite').removeClass('RIGHT');
    this._cell.$elmt.find('.sprite').removeClass('DOWN');
    this._cell.$elmt.find('.sprite').removeClass('LEFT');
    // this.cell.$_elmt.removeClass('.'+dir);
    this._cell.$elmt.find('.sprite').addClass(dir);
  }


  getDirection(axe){ return this.directions[axe]; }
  getPosX(){ return this._cell.center.x; }
  getPosY(){ return this._cell.center.y; }
  getGridX(){ return this._cell.grid.x; }
  getGridY(){ return this._cell.grid.y; }
  getKeyDown(){ return this.keyDown; }

  get cell(){ return this._cell };

}
