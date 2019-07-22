class Bomb{
  _cell;
  _cooldown;
  _date;
  _explosionDate;
  _flames;

  constructor(xG, yG, size, power, date) {
    this.cell = new Cell(xG, yG, size, 'bomb', true);
    this.cooldown = 2500;
    this.date = date;
    this.explosionDate = this.date+this.cooldown;
    this.flames = [];
    this.power = power;

    // map.constructForeCell(xG, yG, 'bomb');//game.actualMap.constructFore...
  }

  isExploded(){
    let now = (new Date()).getTime();
    if(now >= this.explosionDate){
      this.explode();
      return true;
    }
  }

  explode(){
    console.log(this);
    console.log(this.cell.$elmt);
    this.cell.$elmt.remove();//supprimer du dom
    this.addFlames();
  }

  addFlames(){
    let xG = this.cell.grid.x;
    let yG = this.cell.grid.y;
    let dateEx = (new Date).getTime();

    console.log("AAAAAAHBBB");
    for (let xTmp = xG-this.power; xTmp <= xG+this.power; xTmp++) {
      console.log("????");
      this.flames.push(new Flame(xTmp, yG, dateEx, 'center'));
    }
    for (let yTmp = yG-this.power; yTmp <= yG+this.power; yTmp++) {
      if(yTmp!=yG){//0.0 déjà fait
        this.flames.push(new Flame(xG, yTmp, dateEx, 'center'));
      }
    }
  }

  animate(){

  }



  set cell(val){ this._cell = val }
  set cooldown(val){ this._cooldown = val }
  set date(val){ this._date = val }
  set flames(val){ this._flames = val }
  set explosionDate(val){ this._explosionDate = val }
  set power(val){ this._power = val }

  get cell(){ return this._cell }
  get cooldown(){ return this._cooldown }
  get date(){ return this._date }
  get flames(){ return this._flames }
  get explosionDate(){ return this._explosionDate }
  get power(){ return this._power }

}
