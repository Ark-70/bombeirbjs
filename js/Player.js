const DB_PLAYER_MOVE = 0;

class Player{
  _cell;
  maxSpeed;
  directions;// wantedMovement;
  goingDir;// movement;
  _power;
  _bombs;
  _flames;

  constructor(xG, yG, size, speed=3, power=3) {
    this._cell = new Forecell(xG, yG, 'player');
    this._animation = new MyAnimation(this.cell.$elmt.find('.sprite'), 'bomberman.png', 250, [1, 0, 2, 0], true);
    this.maxSpeed = speed;
    this.keyDown = {'x':{'LEFT':0, 'RIGHT':0}, 'y':{'UP':0, 'DOWN':0}};
    this.directions = {'x':0, 'y':0};
    this.goingDir = this.directions;
    this._power = power;
    this._bombs = [];
    this._size = TILE_SIZE;
    this._flames = [];
  }

  update(){
    if(this.walkingOnItem()){
      this.collectItem();
    }
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
    let xG = this._cell.grid.x;
    let yG = this._cell.grid.y;
    if(map.getCellTypeAt(xG, yG)=='empty'){
      this._bombs.push(new Bomb(xG, yG, this._power));
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
        if(DB_PLAYER_MOVE) console.log("objA width",objA.width);
        let distance = Map.innerDistanceBweenCells({pos:objA.posCtr, width:objA.width},{pos:objB.posCtr, width:objB.width});


        // let distance = Map.innerDistanceBweenCells({pos:this._cell.center.y, width:this.height},{pos:obstacles[0][1]*map.cellSize, width:map.cellSize});
        if(DB_PLAYER_MOVE) console.log("distance et maxspeed",distance, this.maxSpeed);
        if(Math.abs(distance)<this.maxSpeed && distance!=0){
          if(DB_PLAYER_MOVE) console.log("Need to snap on obstacle");
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
              // if(DB_PLAYER_MOVE) console.log("On a distance = "+distance+" et on move ("+this._cell.center.x+", "+this._cell.center.y+distance+")");
              break;
          }
          this.move(this._cell.center.x+addPos.x, this._cell.center.y+addPos.y);
        }else if(distance == 0){
          this.redirectMove(this.directions);
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
    if(DB_PLAYER_MOVE) console.log("corners", cornersOfPlayer.toString());
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
    if(DB_PLAYER_MOVE) console.log("cases marchees dessus", casesMarchéesDessus);

    let obstacles = [];
    // console.log("On veut voir les types de : ", ...casesMarchéesDessus[0],"-", ...casesMarchéesDessus[1],"-", ...casesMarchéesDessus[2],"-", ...casesMarchéesDessus[3]);
    for (let cellPos of casesMarchéesDessus) {
      if(DB_PLAYER_MOVE) console.log('checking cellPos', ...cellPos, map.getCellTypeAt(...cellPos));
      if(map.getCellTypeAt(...cellPos)!='empty' && map.getCellTypeAt(...cellPos)!='item'){
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

  move(x, y){
    this._cell.center = {'x':x, 'y':y};
    console.log("EUH ALLO");
    debugger;
    this._cell.updateAllPosFrom('center');
    // this._cell.grid = Map.posToGridPos(x, y);
  }

  display(){
    console.log("c'est la ?");
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
    if(dir.x=='LEFT' || dir.x=='RIGHT'){
      let primaryDir = (dir.x=='RIGHT') ? 1 : -1;
      let cellFirstChoice = map.getCellTypeAt(this._cell.grid.x+primaryDir, this._cell.grid.y);
      if(cellFirstChoice!='wall' && cellFirstChoice!='block'){
        this.move(...this.posAfterDir({'x':null, 'y':Map.closestLines(this._cell.upperLeft.y)[0]}));
      }else{
        let secondaryDir = (Map.closestLines(this._cell.upperLeft.y)[1]=='DOWN') ? 1 : -1;
        let cellSecondChoice = map.getCellTypeAt(this._cell.grid.x+primaryDir, this._cell.grid.y+secondaryDir);
        if(cellSecondChoice!='wall' && cellSecondChoice!='block'){
          this.move(...this.posAfterDir({'x':null, 'y':Map.closestLines(this._cell.upperLeft.y)[1]}));
        }
      }
    }
    if(dir.y=='UP' || dir.y=='DOWN'){
      let primaryDir = (dir.y=='DOWN') ? 1 : -1;
      let cellFirstChoice = map.getCellTypeAt(this._cell.grid.x, this._cell.grid.y+primaryDir);
      if(cellFirstChoice!='wall' && cellFirstChoice!='block'){
        this.move(...this.posAfterDir({'x':Map.closestCols(this._cell.upperLeft.x)[0], 'y':null}));
      }else{
        let secondaryDir = (Map.closestCols(this._cell.upperLeft.y)[1]=='RIGHT') ? 1 : -1;
        let cellSecondChoice = map.getCellTypeAt(this._cell.grid.x+secondaryDir, this._cell.grid.y+primaryDir);
        if(cellSecondChoice!='wall' && cellSecondChoice!='block'){
          this.move(...this.posAfterDir({'x':Map.closestCols(this._cell.upperLeft.y)[1], 'y':null}));
        }
      }
    }
  }

  collectItem(){
    let cell = map.getCellAt(...Object.values(this._cell.grid));
    switch (cell.type) {
      case 'item':
        cell.type = 'empty';
        this._power++;
        break;
      default:

    }
  }


  walkingOnItem(){ return (map.getCellTypeAt(...Object.values(this._cell.grid))=='item') }
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
