// gérer les directions avec pushed et released ? pour les diagonales

const ALPHA_START = 'A'.charCodeAt(0);
const ALPHA_END   = 'Z'.charCodeAt(0);

// $('html').keydown(traiterEventKeyCode(event));
$('html').keypress( (event) =>  traiterEventKeyPressed(event) );
$('html').keydown(  (event) =>  traiterEventKeyDown(event) );
$('html').keyup(    (event) =>  traiterEventKeyUp(event) );

// function traiterEventKey(event){
//   key = event.key;
//   switch (key) {
//     case "ENTER":
//
//       break;
//     default:
//
//   }
// }
function traiterEventKeyPressed(event){
  let key = event.key;
  switch (key) {
    case ' ':
      console.log("ALLO0");
      players[0].plantBomb();
      break;
    default:

  }
}


function traiterEventKeyDown(event){
  let key = event.keyCode;
  switch (key) {
    case LEFT :
      players[0].setKeyDown('x', 'LEFT', 1);
      players[0].setDirection('x', 'LEFT');
      break;
    case RIGHT :
      players[0].setKeyDown('x', 'RIGHT', 1);
      players[0].setDirection('x', 'RIGHT');
      break;
    case UP :
      players[0].setKeyDown('y', 'UP', 1);
      players[0].setDirection('y', 'UP');
      break;
    case DOWN :
    players[0].setKeyDown('y', 'DOWN', 1);
      players[0].setDirection('y', 'DOWN');
      break;
      default:
  }
}

function traiterEventKeyUp(event){
  let dir = event.keyCode;
  switch (dir) {
    case UP :
      players[0].setKeyDown('y', 'UP', 0);
      if(players[0].getDirection('y')=='UP'){
        players[0].resetDirection('y');
      }
      break;
    case DOWN :
      players[0].setKeyDown('y', 'DOWN', 0);
      if(players[0].getDirection('y')=='DOWN'){
        players[0].resetDirection('y');
      }
      break;
    case LEFT :
      players[0].setKeyDown('x', 'LEFT', 0);
      if(players[0].getDirection('x')=='LEFT'){
        players[0].resetDirection('x');
      }
      break;
    case RIGHT :
      players[0].setKeyDown('x', 'RIGHT', 0);
      if(players[0].getDirection('x')=='RIGHT'){
        players[0].resetDirection('x');
      }
      break;
      default:
  }
}

// $()
// function traiterEventKeyCode(event){
//   key = event.keyCode;
//   switch (key) {
//     case UP :
//     case RIGHT :
//     case DOWN :
//     case LEFT:
//       players[0].wantToMove(key);
//       // players[0].move(newX, newY);
//     default:
//     //do nothing
//
//   }
// }
