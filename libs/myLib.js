function getUsableHeight(gridHeight){
  let pxToRemove = parseInt( $('body').css('margin-top').replace('px',''))*2;
  let usableSizeSquare = window.innerHeight - pxToRemove;
  let pixelPerfectSquare = Math.floor(usableSizeSquare/gridHeight)*gridHeight;
  return pixelPerfectSquare;
}

function getUsableWidth(gridWidth){
  let pxToRemove = parseInt( $('body').css('margin-top').replace('px',''))*2;
  let usableSizeSquare = window.innerWidth - pxToRemove;
  let pixelPerfectSquare = Math.floor(usableSizeSquare/gridWidth)*gridWidth;
  return pixelPerfectSquare;
}

function stopAnimationIfOn(animatable){
  if(animatable.animation.interval!=null)
  animatable.animation.stopAnimation();
}

function startAnimationIfOff(animatable){
  if(animatable.animation.interval==null)
  animatable.animation.startAnimation();
}

function gridPosToUpperLeft(x, y=null){
  //je sais pas si le +1 est nécessaire
  let xUpperLeft = x*TILE_SIZE+1;
  if(y==null) return xUpperLeft;
  yUpperLeft = y*TILE_SIZE+1;
  return [xUpperLeft, yUpperLeft];
}
