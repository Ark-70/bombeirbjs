Crafty.init(400, 400);

let square = Crafty.e('2D, DOM, Color');
square.attr({
  x: 50,
  y: 50,
  w: 100,
  h: 100
}).color('red');

square.origin("center");

square.bind('UpdateFrame', function(){
  // this.rotation = this.rotation + 1;
});
// domconstruct(14, 14);
