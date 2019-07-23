class Bomb{
  _cell;
  _cooldown;
  _date;


  constructor(xG, yG, size, power, date) {
    this.cell = new Cell(xG, yG, size, 'bomb', true);
    this.cooldown = 2500;
    this.date = date;

    // map.constructForeCell(xG, yG, 'bomb');//game.actualMap.constructFore...
  }

  update(){
    this.animate();
  }

  shouldExplode(){
    let now = new Date().getTime();
    return (now >= this.date+this.cooldown);
  }

  explode(){
    console.log(this);
    console.log(this.cell.$elmt);
    this.cell.$elmt.remove();
  }

  animate(){

  }


  set cell(val){ this._cell = val }
  set cooldown(val){ this._cooldown = val }
  set date(val){ this._date = val }

  get cell(){ return this._cell }
  get cooldown(){ return this._cooldown }
  get date(){ return this._date }


}
