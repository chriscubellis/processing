// sketch-3.js

function sketch3(p) {
  const container = document.getElementById("sketch3");

  var w = container.clientWidth;
  var h = container.clientHeight;

  let color;
  let speed;
  let seed;

  let maze = [];
  let rows = 10;
  let cols = 10;
  let cellSize = 40;

  p.setup = function () {
    p.createCanvas(w, h);

    color = 0;
    speed = 0.01;
    seed = p.random(10);
  };

  p.draw = function () {
    p.background(0, 0); // set background color to light gray

    color += speed;
    if (color > 1) {
      color = 0;
    }

    p.fill(p.color("#c7b198")); // interpolate between red and blue
    p.randomSeed(seed);
    for (let i = 0; i < 10; i++) {
      p.ellipse(p.random(p.width), p.random(p.height), 50, 50); // draw random ellipses
    }
  };
}

export default sketch3;
