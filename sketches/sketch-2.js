// sketch-2.js
import p5 from "p5";

import { primary } from "../index.js";

const container = document.getElementById("sketch2");

var w = container.clientWidth;
var h = container.clientHeight;

let angle = 0;
let points = 3;
let speed = 0.01;

let currentShape = "box";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loopShapes() {
  while (true) {
    switch (currentShape) {
      case "box":
        currentShape = "sphere";
        break;
      case "sphere":
        currentShape = "torus";
        break;
      case "torus":
        currentShape = "box";
        break;
    }
    await delay(2500);
  }
}

loopShapes();

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
    switch (currentShape) {
      case "box":
        p.box(h / 3, h / 3, 100, points, points);
        break;
      case "sphere":
        p.sphere(50, 12, 12);
        break;
      case "torus":
        p.torus(h / 5, h / 7, 8, 4);
        break;
    }

    p.pop();
    // increment the angle for the next frame
    angle += speed;
  };
};

let myp5 = new p5(sketch2, "sketch2");

window.addEventListener("resize", function () {
  w = container.clientWidth;
  h = container.clientHeight;
  myp5.resizeCanvas(w, h);
});

export default sketch2;
