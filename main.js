const fps = 60;
const fpstest = 1000;
const gridWidth = 14;
const gridHeight = 14;

let players = [];

init(gridWidth, gridHeight);
players.push(new Player(0,0));

function refreshGrid(){
  $('.cell').removeClass('cell--player');
}

function draw(){
  refreshGrid();
  for (player of players) {
    player.display();
  }
}

setInterval(draw, 1/fps);
