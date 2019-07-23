class MyAnimation {
  _imgDir = 'assets/img/';
  _spritePage;
  _delay;
  _index;
  _interval;
  _spritesOffsets;
  _$sprite;

  constructor($sprite, spritePage, delay, spritesOffsets) {
    this.$sprite = $sprite;
    this.spritePage = spritePage;
    this.spritesOffsets = spritesOffsets;//[[0,0], [0,33]]
    this.delay = delay;
    this.index = 0;
    this.interval = null;
  }

  initIdle(){
    this.$sprite.addClass('frame0');
  }

  startAnimation(){
    this.goNextSprite();
    this.interval = setInterval(()=>this.goNextSprite(), 500); //sort du scope de this de classe
  }

  stopAnimation(){
    clearInterval(this.interval);
    this.index = 0;
    this.applySprite();
    this.interval = null;
  }

  goNextSprite(){
    this.index = (this.index+1)%(this.spritesOffsets.length);
    this.applySprite();
  }

  applySprite(){
    this.$sprite.removeClass('frame0');
    this.$sprite.removeClass('frame1');
    this.$sprite.removeClass('frame2');
    this.$sprite.removeClass('frame3');
    this.$sprite.addClass('frame'+this.index);
    // this.$sprite.css('background-position', this.spritesOffsets[this.index]);
  }

  set spritesOffsets(val){ this._spritesOffsets = val; }
  set spritePage(val){ this._spritePage = val }
  set interval(val){ this._interval = val }
  set delay(val){ this._delay = val }
  set index(val){ this._index = val }
  set $sprite(val){ this._$sprite = val }

  get spritesOffsets(){ return this._spritesOffsets }
  get spritePage(){ return this._spritePage }
  get interval(){ return this._interval }
  get delay(){ return this._delay }
  get index(){ return this._index }
  get $sprite(){ return this._$sprite }
}
