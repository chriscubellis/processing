// sketch-4.js

import p5 from "p5";

const container = document.getElementById("sketch4");
var w = container.clientWidth;
var h = container.clientHeight;

let x, y, width, height;

let sketch4 = function (p) {
  p.setup = function () {
    p.createCanvas(w, h);

    var x = w / 2;
    var y = h / 2;

    seed = p.random(10);
  };

  p.draw = function () {
    var x = p.random(p.width);
    var y = p.random(p.height);
    var r = 25;
    var hover = p.dist(p.mouseX, p.mouseY, x, y) < r;
    if (hover) {
      p.fill(p.color("black"));
    } else {
      p.fill(p.color("#c7b198"));
    }
    p.ellipse(x, y, 50, 50);
  };
};
let myp5 = new p5(sketch4, "sketch4");
