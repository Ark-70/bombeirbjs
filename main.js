//TODO réorganiser tout ça pour update que les positions dans les modèles
//et afficher tout seulement dans la map ou le dom qui affiche la map plutôt

const fps = 60;
const fpsLow = 25;
const gridWidth = 14;
const gridHeight = 14;


let $map = init(gridWidth, gridHeight);
let map = new Map($map, gridWidth, gridHeight);

let players = [];
players.push(new Player(5*map.cellSize,5*map.cellSize));

function draw(){
  for (player of players) {
    player.update();
    player.display();
  }
  IHMDebug(players[0], map);
}


setInterval(draw, 10);
// draw();
