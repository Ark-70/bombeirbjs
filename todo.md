# Organisation

## Approche 1 (meilleure)

  let map = new Map();
  map.createMapDom();

## Approche 2 (actuelle)

  let $map = createMapDom();
  let map = new Map($map);
