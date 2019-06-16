// gérer les directions avec pushed et released ? pour les diagonales

const ALPHA_START = 'A'.charCodeAt(0);
const ALPHA_END   = 'Z'.charCodeAt(0);

// $('html').keypress(traiterEventKey(event));
// $('html').keydown(traiterEventKeyCode(event));
$('html').keypress( (event) =>  traiterEventKey(event) );
$('html').keydown( (event) =>  traiterEventKeyCode(event) );

function traiterEventKey(event){
  key = event.key;
  switch (key) {
    case "":

      break;
    default:

  }
}

function traiterEventKeyCode(event){
  key = event.keyCode;
  switch (key) {
    case UP :
    case RIGHT :
    case DOWN :
    case LEFT:
      players[0].wantToMove(key);
      // players[0].move(newX, newY);
    default:
    //do nothing

  }
}
