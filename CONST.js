const LEFT  = 37
const UP    = 38
const RIGHT = 39
const DOWN  = 40

const DEBUG_PLAYER = 1;

let focusIsOn=0;
//
// function debug(debugConst, ...vars){
//   if(debugConst){
//     console.log(...vars);
//   }
// }

function IHMDebug(player, map){


//DIRECTIONS PAD
  let valueTop =  (player.getKeyDown()['UP'])     ? 'solid' : 'none';
  let valueBottom =  (player.getKeyDown()['DOWN'])   ? 'solid' : 'none';
  let valueLeft = (player.getKeyDown()['LEFT'])   ? 'solid' : 'none';
  let valueRight = (player.getKeyDown()['RIGHT']) ? 'solid' : 'none';
    $('.debug__direction').css('border-top-style',    valueTop);
    $('.debug__direction').css('border-bottom-style', valueBottom);
    $('.debug__direction').css('border-left-style',   valueLeft);
    $('.debug__direction').css('border-right-style',  valueRight);

    $('.debug__direction').css('border-color', 'lightBlue');
    $('.debug__direction').css('border-width', '10px');
    let cssStrX;
    switch (player.directions.x) {
      case 'LEFT':
        cssStrX='left';
        // log
        break;
      case 'RIGHT':
        cssStrX='right';
        break;
      default:
        if($('.debug__direction').css('border-right-style')!=''){
          $('.debug__direction').css('border-right-style', 'none');
        }if($('.debug__direction').css('border-left-style')!=''){
          $('.debug__direction').css('border-left-style', 'none');
        }
      }
      $('.debug__direction').css('border-'+cssStrX+'-style', 'solid');
      $('.debug__direction').css('border-'+cssStrX+'-color', 'lightSalmon');
      $('.debug__direction').css('border-'+cssStrX+'-width', '20px');

      let cssStrY;
      switch (player.directions.y){
      case 'UP':
        cssStrY='top';
        break;
      case 'DOWN':
        cssStrY='bottom';
        break;
      default:
        if($('.debug__direction').css('border-bottom-style')!=''){
          $('.debug__direction').css('border-bottom-style', 'none');
        }if($('.debug__direction').css('border-top-style')!=''){
          $('.debug__direction').css('border-top-style', 'none');
        }
      }
      $('.debug__direction').css('border-'+cssStrY+'-style', 'solid');
      $('.debug__direction').css('border-'+cssStrY+'-color', 'lightSalmon');
      $('.debug__direction').css('border-'+cssStrY+'-width', '20px');

//VARIABLES
// if($('.debug__x').val()!=player.getPosX() && !focusIsOn)        $('.debug__x').val(player.getPosX());
// if($('.debug__y').val()!=player.getPosY() && !focusIsOn)        $('.debug__y').val(player.getPosY());
    if($('.debug__x').html()!=player.getPosX() && !focusIsOn)        $('.debug__x').html(player.getPosX());
    if($('.debug__y').html()!=player.getPosY() && !focusIsOn)        $('.debug__y').html(player.getPosY());
    if($('.debug__xgrid').html()!=player.getGridX() && !focusIsOn)  $('.debug__xgrid').html(player.getGridX());
    if($('.debug__ygrid').html()!=player.getGridY() && !focusIsOn)  $('.debug__ygrid').html(player.getGridY());

    $('.debug__cellsize').html(map.cellSize);
}

function areEqualTab(array1, array2){

  tab1 = [...array1];
  tab2 = [...array2];
  return (tab1.length === tab2.length && tab1.every((value, index) => value === tab2[index]));

}


// $('.debug__x').focusin( ()=>focusIsOn = 1 );
// $('.debug__y').focusin( ()=>focusIsOn = 1 );
// $('.debug__x').focusout( ()=>focusIsOn = 0 );
// $('.debug__y').focusout( ()=>focusIsOn = 0 );
//
//
// $('.debug__x').change( ()=>player.updateX($('.debug__x').val()) );
// $('.debug__y').change( ()=>player.updateY($('.debug__y').val()) );
