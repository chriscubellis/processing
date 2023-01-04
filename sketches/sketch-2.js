// sketch-2.js
import p5 from "p5";

import { primary } from "../index.js";

const container = document.getElementById("sketch2");

var w = container.clientWidth;
var h = container.clientHeight;

let angle = 0;
let points = 3;
let speed = 0.01;

let sketch2 = function (p) {
  p.setup = function () {
    p.createCanvas(w, h, p.WEBGL);
    p.setAttributes("alpha", true);
  };

  p.draw = function () {
    p.background(0, 0, 0, 0);
    p.stroke(primary);
    p.strokeWeight(2);
    p.noFill();

    p.push();
    // rotate the shape around the y-axis
    p.rotateY(angle);

    // draw the shape
    p.box(100, 100, 100, points, points);

    p.pop();
    // increment the angle for the next frame
    angle += speed;
  };
};

let myp5 = new p5(sketch2, "sketch2");

export default sketch2;
