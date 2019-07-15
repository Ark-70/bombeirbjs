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

    $('.map').css('grid-template-columns', 'repeat('+nbHeight+',1fr)');
    for (let i=0; i<nbHeight ; i++) {
      for (let j=0; j<nbWidth ; j++) {
        let $cell = $(document.createElement('div')).addClass('cell').addClass('cell--empty').data('x', j).data('y', i);
        cells[j][i].$elmt = $cell;
        $('.map').append($cell);
      }
    }
  }

  // domAddCells(nbWidth, nbHeight){
  //   // let nb = nbWidth*nbHeight;
  //   for (let i=0; i<nbHeight ; i++) {
  //     for (let j=0; j<nbWidth ; j++) {
  //       jqCell = $(document.createElement('div')).addClass('cell').addClass('cell--empty').data('x', j).data('y', i);
  //       $('.map').append(jqCell);
  //     }
  //   }
  // }

  static domCreateForeCell(xG, yG, type, cellSize){
    let $tmpCell = $(document.createElement('div')).addClass('forecell').addClass('cell--'+type).data('x', xG).data('y', yG);
    $('.map').append($tmpCell);
    $tmpCell.css('left', xG*cellSize+'px');
    $tmpCell.css('top', yG*cellSize+'px');
    $tmpCell.css('width', cellSize+'px');
    $tmpCell.css('height', cellSize+'px');
    return $tmpCell;
  }

  resizeGrid(gridHeight, pixelPerfectSquare){
    let $map = $('.map');
    $map.css('grid-template-columns', 'repeat('+gridHeight+',1fr)');

    $map.css('max-width', pixelPerfectSquare+'px');
    $map.css('max-height', pixelPerfectSquare+'px');
    console.log("size map", pixelPerfectSquare);

    // cellSize = $('')
    $('.display').css('max-width', pixelPerfectSquare+'px');
    $('.display').css('max-height', pixelPerfectSquare+'px');

    // resizeForegroundCells(); $('.forecell').css('height')
    return $map;
  }

}
