# Organisation

## Approche 1 (meilleure)

  let map = new Map();
  map.createMapDom();

## Approche 2 (actuelle)

  let $map = createMapDom();
  let map = new Map($map);

# private attributes

  au lieu d'avoir des this.____truc, écrire plutôt des attributs privés avec this.#truc

# package Atom

  auto all align indent cursors


//need updateAllPosFrom()
