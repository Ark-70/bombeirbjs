// QUE MAP SOIT DIVISIBLE PAR NBWIDTH//NBHEIGHT EN PIXEL PERFECT, PAS QUE J'AI MAP.WIDTH=501px

function init(gridWidth, gridHeight){
  domAddCells(gridWidth, gridHeight);
  gridAddSolids();
  resize(gridHeight);
}

function domAddCells(nbWidth, nbHeight){
  // let nb = nbWidth*nbHeight;
  for (let i=0; i<nbHeight ; i++) {
    for (let j=0; j<nbWidth ; j++) {
      jqCell = $(document.createElement('div')).addClass('cell').addClass('cell--empty').data('x', j).data('y', i);
      $('.map').append(jqCell);
    }
  }
}

function gridAddSolids(){
  $($('.cell')[10]).addClass('cell--bloc');
  $($('.cell')[15]).addClass('cell--bloc');
  $($('.cell')[17]).addClass('cell--bloc');
  $($('.cell')[19]).addClass('cell--bloc');
  $($('.cell')[59]).addClass('cell--bloc');
}

function resize(gridHeight){
  $map = $('.map');
  $map.css('grid-template-columns', 'repeat('+gridHeight+',1fr)');
  let pxToRemove = parseInt( $('body').css('margin-top').replace('px',''))*2;
  // console.log(window.innerHeight);
  // console.log($('body').css('margin-top'));
  // console.log(pxToRemove);
  let usableSizeSquare = window.innerHeight - pxToRemove;
  let pixelPerfectSquare = Math.floor(usableSizeSquare/gridHeight)*gridHeight;
  $map.css('max-width', pixelPerfectSquare+'px');
  $map.css('max-height', pixelPerfectSquare+'px');
  console.log("size map", pixelPerfectSquare);

  $('.display').css('max-width', pixelPerfectSquare+'px');
  $('.display').css('max-height', pixelPerfectSquare+'px');

  resizeForegroundCells();
}

function resizeForegroundCells(){
  let size = Math.round($($('.cell')[0]).css('height').replace('px',''));
  console.log("size cell", size);
  let border = 1;
  $('.forecell').css('height', (size)+'px');
  $('.forecell').css('width', (size)+'px');
}
