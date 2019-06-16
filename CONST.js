const LEFT  = 37
const UP    = 38
const RIGHT = 39
const DOWN  = 40

const DEBUG_PLAYER = 1;

function debug(debugConst, ...vars){
  if(debugConst){
    console.log(...vars);
  }
}
