class Animation {
  _sprites;
  _delay;
  _index;
  _interval;
  _spritesOffsets;
  _$elmt;

  constructor(, delay, spritePage=null) {
    this.$elmt;
    this.sprites = sprites;
    this.spritesOffsets = spritesOffsets;
    this.delay = delay;
    this.index = 0;
    this.interval;
  }

  startAnimation(){

    setInterval(goNextSprite(), 500);
  }

  stopAnimation(){

  }

  goNextSprite(){
    this.index++;
    applySprite();
  }

  applySprite(){
    this.$elmt.css('')
  }

  set spritesOffsets(val){ this._spritesOffsets = val }
  set interval(val){ this._interval = val }
  set sprites(val){ this._sprites = val }
  set delay(val){ this._delay = val }
  set index(val){ this._index = val }
  set $elmt(val){ this._$elmt = val }

  get spritesOffsets(){ return this._spritesOffsets }
  get interval(){ return this._interval }
  get sprites(){ return this._sprites }
  get delay(){ return this._delay }
  get index(){ return this._index }
  get $elmt(){ return this._$elmt }
}
