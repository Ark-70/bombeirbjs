// QUE MAP SOIT DIVISIBLE PAR NBWIDTH//NBHEIGHT EN PIXEL PERFECT, PAS QUE J'AI MAP.WIDTH=501px
class Dom {
  constructor() {

  }

  init(gridWidth, gridHeight){
    domAddCells(gridWidth, gridHeight);
    // gridAddSolids();
    let sizeMap = resizeGrid(gridHeight, getUsableHeight(gridHeight));
    return sizeMap;
  }

  createMapDom(cells, nbWidth, nbHeight, squareSize){
    $('.map').css('max-height', squareSize+'px');
    $('.map').css('max-width', squareSize+'px');

    for (let i=0; i<nbHeight ; i++) {
      for (let j=0; j<nbWidth ; j++) {
        $cell = $(document.createElement('div')).addClass('cell').addClass('cell--empty').data('x', j).data('y', i);
        cells[i][j].$elmt = $cell;
        $('.map').append($cell);
      }
    }
  }

  domAddCells(nbWidth, nbHeight){
    // let nb = nbWidth*nbHeight;
    for (let i=0; i<nbHeight ; i++) {
      for (let j=0; j<nbWidth ; j++) {
        jqCell = $(document.createElement('div')).addClass('cell').addClass('cell--empty').data('x', j).data('y', i);
        $('.map').append(jqCell);
      }
    }
  }

  domAddForeCell(xG, yG, type){
    let $tmpCell = $(document.createElement('div')).addClass('forecell').addClass('cell--'+type).data('x', xG).data('y', yG);
    $('.map').append($tmpCell);
    console.log("ALLO FQFNEFS");
    resizeForegroundCells();
    let sizeCell = Math.round($($('.cell')[0]).css('height').replace('px',''));
    $tmpCell.css('left',xG*sizeCell+'px');
    $tmpCell.css('top',yG*sizeCell+'px');
    return $tmpCell;
  }

  resizeGrid(gridHeight, pixelPerfectSquare){
    let $map = $('.map');
    $map.css('grid-template-columns', 'repeat('+gridHeight+',1fr)');

    $map.css('max-width', pixelPerfectSquare+'px');
    $map.css('max-height', pixelPerfectSquare+'px');
    console.log("size map", pixelPerfectSquare);

    cellSize = $('')
    $('.display').css('max-width', pixelPerfectSquare+'px');
    $('.display').css('max-height', pixelPerfectSquare+'px');

    resizeForegroundCells();
    return $map;
  }

  resizeForegroundCells(){
    let size = Math.round($($('.cell')[0]).css('height').replace('px',''));
    console.log("size cell", size);
    let border = 1;
    $('.forecell').css('height', (size)+'px');
    $('.forecell').css('width', (size)+'px');
  }
}
