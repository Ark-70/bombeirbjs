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

# Bugs
  on peut pas glisser quand on va vers la diagonale
  players.js:41

  //need updateAllPosFrom()
  //need 2 globals only : TILE_SIZE & gridSize
  //bug glide to north vers gauche
  a faire : les changements pour créer des walls et blocks sont pourris :
  les changer de manière à remplacer entièrement la cell et en créer des nouvelles, en faire une fonction
  //bug frame0 frame1 frame0 frame1 qui reste même si l'item a disparu
  //bug diagonale vers haut/bas d'un muret = bug
  <!-- //bug mob 2 pas vers droite/bas 1 vers up/gauche -->
