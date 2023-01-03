import p5 from "p5";

const gridItems = document.querySelectorAll(".grid-item"); // select all grid items

gridItems.forEach((gridItem) => {
  // loop through all grid items
  new p5((sketch) => {
    // create new p5.js sketch for each grid item
    let color;
    let speed;
    let seed;

    sketch.setup = function () {
      let canvas = sketch.createCanvas(
        gridItem.offsetWidth,
        gridItem.offsetHeight
      ); // create canvas with width and height of grid item
      canvas.parent(gridItem); // insert canvas into grid item
      color = 0;
      speed = 0.01;
      seed = sketch.random(10);
    };

    sketch.draw = function () {
      sketch.background(220); // set background color to light gray

      color += speed;
      if (color > 1) {
        color = 0;
      }

      sketch.fill(
        sketch.lerpColor(sketch.color("red"), sketch.color("blue"), color)
      ); // interpolate between red and blue
      sketch.randomSeed(seed);
      for (let i = 0; i < 10; i++) {
        sketch.ellipse(
          sketch.random(sketch.width),
          sketch.random(sketch.height),
          50,
          50
        ); // draw random ellipses
      }
    };
  });
});
