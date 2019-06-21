const fps = 60;
const fpsLow = 25;
const gridWidth = 14;
const gridHeight = 14;

let players = [];

let $map = init(gridWidth, gridHeight);
let map = new Map($map, gridWidth, gridHeight);

players.push(new Player(4*map.cellSize,4*map.cellSize));

function draw(){
  for (player of players) {
    player.update();
    player.display();
  }
  IHMDebug(players[0], map);
}

$('html').keypress( (event) =>  traiterEventKey(event) );

setInterval(draw, 10);
// draw();
