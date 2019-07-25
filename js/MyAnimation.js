class MyAnimation {
  _imgDir = '../img/';
  _spritePage;
  _delay;
  _index;
  _interval;
  _spritesOffsets;
  _$sprite;

  constructor($sprite, spritePage, delay, frameNumbers, looping=true) {//fullDelay used if not loop animation
    this.$sprite = $sprite;
    this.spritePage = spritePage;
    // this.spritesOffsets = spritesOffsets;//[[0,0], [0,33]]
    this.frameNumbers = frameNumbers;
    this.delay = delay;
    this.indexFrame = 0;
    this.interval = null;
    this.looping = looping;
    this.frameToUse;
  }

  initIdle(){
    this.$sprite.removeClass('frame1');
    this.$sprite.removeClass('frame2');
    this.$sprite.removeClass('frame3');
    this.$sprite.removeClass('frame4');
    this.$sprite.addClass('frame0');
  }

  startAnimation(){
    // this.goNextSprite();
    this.applySprite();
    this.interval = setInterval(()=>this.goNextSprite(), this.delay); //sort du scope de this de classe
  }

  stopAnimation(){
    clearInterval(this.interval);
    this.indexFrame = 0;
    this.initIdle();
    this.interval = null;
  }

  goNextSprite(){
    this.indexFrame = (this.indexFrame+1)%(this.frameNumbers.length);
    this.applySprite();
  }

  applySprite(){
    this.frameToUse = this.frameNumbers[this.indexFrame];
    this.$sprite.removeClass('frame0');
    this.$sprite.removeClass('frame1');
    this.$sprite.removeClass('frame2');
    this.$sprite.removeClass('frame3');
    this.$sprite.removeClass('frame4');
    this.$sprite.addClass('frame'+this.frameToUse);
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
