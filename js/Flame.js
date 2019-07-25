class Flame {

  constructor(xG, yG, date, flameType, color) {
    this.cell = new Cell(xG, yG, tileSize, 'flame', true);
    this.date = date;
    this.expired = false;
    this.cooldown = 700;//temps d'expiration en ms

    if(map.getCellTypeAt(xG, yG)=='block'){
      //TODO A déplacer
      flameType = 'block';
      let tmpBlock = map.getCellAt(xG, yG);
      tmpBlock._type = 'item';
      tmpBlock.updateDomType('block', 'item');
      tmpBlock.animation = new MyAnimation(tmpBlock.$elmt, 'items.png', 100, [0, 1]);
      tmpBlock.animation.startAnimation();
    }else if(map.getCellTypeAt(xG, yG)=='item'){
      //TODO A déplacer
      flameType = 'item';
      let tmpBlock = map.getCellAt(xG, yG);
      tmpBlock._type = 'empty';
      tmpBlock.updateDomType('item', 'empty');
    }

    // this.cell.$elmt.addClass('flame--'+color);
    this.cell.$elmt.addClass(flameType);
    if(flameType!='item' && flameType!='block'){
      this.animation = new MyAnimation(this.cell.$elmt, 'terrain.png', 700/12, [0, 1, 2, 3, 4, 3, 4, 3, 4, 3, 2, 1, 0], false);
    }else{
      this.animation = new MyAnimation(this.cell.$elmt, 'terrain.png', 700/4, [0, 1, 2, 3, 4], false);
    }
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
