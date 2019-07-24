class Flame {

  constructor(xG, yG, date, flameType, color) {
    this.cell = new Cell(xG, yG, tileSize, 'flame', true);
    this.date = date;
    this.expired = false;
    this.cooldown = 1000;//temps d'expiration en ms

    if(map.getCellTypeAt(xG, yG)=='block'){
      //TODO A déplacer
      flameType = 'block';
      let tmpBlock = map.getCellAt(xG, yG);
      tmpBlock._type = 'empty';
      tmpBlock.updateDomType('block', 'item');
      tmpBlock.animation = new MyAnimation(tmpBlock.$elmt, 'items.png', 100, [[0, 0], [5, 0]]);
      tmpBlock.animation.startAnimation();
    }
    // this.cell.$elmt.addClass('flame--'+color);
    this.cell.$elmt.addClass(flameType);
    if(this)
    this.animation = new MyAnimation(this.cell.$elmt, 'terrain.png', 100, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    this.animation.startAnimation();
    // this.color = color;
    // console.log("j'y passe");

  }

  update(){
    // console.log("bijour");
  }

  shouldExpire(){
    // console.log("AAAAAAAAAAAAAAAAAAAAAAAA");
    let now = new Date().getTime();
    return (!this.expired && now >= this.date+this.cooldown);
  }

  expire(){
    this.expired = true;
    this.cell.$elmt.remove();//supprimer du dom
  }


}
