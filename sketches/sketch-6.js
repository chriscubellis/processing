// sketch-6.js

import p5 from "p5";
import { primary } from "../index.js";

const container = document.getElementById("sketch6");
var w = container.clientWidth;
var h = container.clientHeight;

let angle;
let radius;

let x, y, width, height;

let sketch6 = function (p) {
  p.setup = function () {
    p.createCanvas(w, h);

    p.background(0, 0);
    p.stroke(primary);
    p.strokeWeight(1);
    p.noFill();

    angle = 0;
    radius = 0;
  };

  p.draw = function () {
    let x = w / 2 + radius * p.cos(angle);
    let y = h / 2 + radius * p.sin(angle);

    p.line(w / 2, h / 2, x, y);

    angle += 1;
    radius += 0.25;

    // Reset angle, radius, and clear the canvas when radius is greater than the maximum distance from the center to a corner
    if (radius > p.dist(w / 1, h / 1, 0, 0)) {
      angle = 0;
      radius = 0;
      p.background(0);
    }
  };
};

let myp5 = new p5(sketch6, "sketch6");
