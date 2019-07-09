//TODO réorganiser tout ça pour update que les positions dans les modèles
//et afficher tout seulement dans la map ou le dom qui affiche la map plutôt

const fps = 60;
const fpsLow = 25;
const gridWidth = 14;
const gridHeight = 14;

let map = new Map($('.map'), gridWidth, gridHeight);
// map.constructCells();

let dom = new Dom();

let gameSize = getUsableHeight(gridHeight);
dom.createMapDom(map.cells, gridWidth, gridHeight, gameSize);

map.replaceTypeOfCells(map.cellsWall, 'wall');
map.replaceTypeOfCells(map.cellsBlock, 'block');

let players = [];
let tileSize = gameSize/gridHeight;
players.push(new Player(5, 5, tileSize));



function gameUpdate(){
  for (player of players) {
    player.update();
  }
  // for (bomb of bombs){
  //   bomb.update();
  // }
  gameDraw();
}

function gameDraw(){
  for (player of players) {
    player.display();
  }
  // for (bomb of bombs){
  //   bomb.display();
  // }
  IHMDebug(players[0], map);
}

setInterval(gameUpdate, 1000);
// gameUpdate();
