class Bomb {
  _cell;
  _cooldown;
  _date;
  _explosionDate;
  _flames;
  _exploded;

  constructor(xG, yG, size, power, date, color = 'neutral') {
    this.cell = new Cell(xG, yG, size, 'bomb', true);
    this.cooldown = 2500;
    this.date = date;
    this.explosionDate = this.date + this.cooldown;
    this.flames = [];
    this.power = power;
    this.exploded = false;
    this._animation = new MyAnimation(this.cell.$elmt, 'bomberman.png', 300, [0, 1, 2, 3]);
    this._animation.startAnimation();
    // map.constructForeCell(xG, yG, 'bomb');//game.actualMap.constructFore...
  }

  update() {
    // this.animate();
  }

  shouldExplode() {
    let now = new Date().getTime();
    return (!this.exploded && now >= this.date + this.cooldown);
  }

  explodeAndGetFlames() {
    this.exploded = true;
    this.cell.$elmt.remove();//supprimer du dom
    return this.addFlames();
  }

  addFlames() {
    let xG = this.cell.grid.x;
    let yG = this.cell.grid.y;
    let dateEx = (new Date).getTime();
    let tmpTab = [];

    tmpTab.push(new Flame(xG, yG, dateEx, 'center'));

    for (let xTmp = xG - 1; xTmp >= xG - this.power; xTmp--) {
      let type = (map.getCellTypeAt(xTmp, yG));
      if (type == 'wall') { break; }
      let flameType = (xTmp == xG - this.power) ? 'left' : 'horizontal';
      tmpTab.push(new Flame(xTmp, yG, dateEx, flameType));
      if (type == 'item'||type == 'block') { break; }
    }
    for (let xTmp = xG + 1; xTmp <= xG + this.power; xTmp++) {
      let type = (map.getCellTypeAt(xTmp, yG));
      if (type == 'wall') { break; }
      let flameType = (xTmp == xG + this.power) ? 'right' : 'horizontal';
      tmpTab.push(new Flame(xTmp, yG, dateEx, flameType));
      if (type == 'item'||type == 'block') { break; }
    }
    for (let yTmp = yG - 1; yTmp >= yG - this.power; yTmp--) {
      let type = (map.getCellTypeAt(xG, yTmp));
      if (type == 'wall') { break; }
      let flameType = (yTmp == yG - this.power) ? 'up' : 'vertical';
      tmpTab.push(new Flame(xG, yTmp, dateEx, flameType));
      if (type == 'item'||type == 'block') { break; }
    }
    for (let yTmp = yG + 1; yTmp <= yG + this.power; yTmp++) {
      let type = (map.getCellTypeAt(xG, yTmp));
      if (type == 'wall') { break; }
      let flameType = (yTmp == yG + this.power) ? 'down' : 'vertical';
      tmpTab.push(new Flame(xG, yTmp, dateEx, flameType));
      if (type == 'item'||type == 'block') { break; }
    }

    return tmpTab;
  }

  // flameOnObject()



  set cell(val) { this._cell = val }
  set cooldown(val) { this._cooldown = val }
  set date(val) { this._date = val }
  set flames(val) { this._flames = val }
  set explosionDate(val) { this._explosionDate = val }
  set power(val) { this._power = val }
  set exploded(val) { this._exploded = val; }


  get cell() { return this._cell }
  get cooldown() { return this._cooldown }
  get date() { return this._date }
  get flames() { return this._flames }
  get explosionDate() { return this._explosionDate }
  get power() { return this._power }
  get exploded() { return this._exploded }

}
