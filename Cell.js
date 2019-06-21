class Cell {
  constructor($elmt, sizeCell, type='empty') {
    this.$elmt = $elmt;
    this.size = sizeCell;
    this.gridX = $elmt.data('x');
    this.gridY = $elmt.data('y');
    this.corner = {x:this.gridX*sizeCell, y:this.gridY*sizeCell};
    this.center = {x:this.corner.x+this.size/2, y:this.corner.y+this.size/2};
    this.type = type;
  }

  changeType(type){
    let oldType = this.type;
    this.type = type;
    this.updateDomType(oldType, type);
  }

  updateDomType(oldType, newType){
    // console.log(oldType);
    // console.log(newType);
    // console.log(this.$elmt);
    this.$elmt.removeClass(`cell--${oldType}`);
    this.$elmt.addClass(`cell--${newType}`);
  }

  getType(){
    return this.type;
  }

}
