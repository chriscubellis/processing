// sketch-2.js

function sketch2(p) {
  const container = document.getElementById("sketch2");

  var w = container.clientWidth;
  var h = container.clientHeight;

  var x = 100.0;
  var y = 100;
  var speed = 2.5;

  p.setup = function () {
    p.createCanvas(w, h);
  };

  p.draw = function () {
    p.background(100, 0);
    p.fill("#c7b198");
    x += speed;
    if (x > p.width) {
      x = 0;
    }
    p.ellipse(x, y, 50, 50);
  };
}

export default sketch2;
