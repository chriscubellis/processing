// sketch-4.js

import p5 from "p5";
import { primary } from "../index.js";

const container = document.getElementById("sketch5");
var w = container.clientWidth;
var h = container.clientHeight;

let x, y, width, height;

let sketch5 = function (p) {
  p.setup = function () {
    p.createCanvas(w, h);

    x = w / 2;
    y = h / 2;
  };

  p.draw = function () {
    p.stroke(primary);
    p.strokeWeight(2);
    p.point(x, y);

    let newX = x + p.random(-10, 10);
    let newY = y + p.random(-10, 10);

    x = p.constrain(newX, 0, w);
    y = p.constrain(newY, 0, h);
  };
};

let myp5 = new p5(sketch5, "sketch5");
