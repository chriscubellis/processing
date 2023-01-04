// sketch-4.js

import p5 from "p5";
import { primary } from "../index.js";

const container = document.getElementById("sketch4");
var w = container.clientWidth;
var h = container.clientHeight;

let x, y, width, height;
let counter = 0; // add counter variable

let initialCircles = []; // array to store initial circles

let sketch4 = function (p) {
  p.setup = function () {
    p.createCanvas(w, h);

    var x = w / 2;
    var y = h / 2;

    p.frameRate(12);

    // add initial circles to array
    for (let i = 0; i < 250; i++) {
      let x = p.random(p.width);
      let y = p.random(p.height);
      initialCircles.push({ x, y });
    }
  };

  p.draw = function () {
    if (counter === 5000) {
      p.clear();
      counter = 0; // reset counter
    }

    var x = p.random(p.width);
    var y = p.random(p.height);
    var r = 25;
    var hover = p.dist(p.mouseX, p.mouseY, x, y) < r;
    if (hover) {
      p.fill(p.color("black"));
    } else {
      p.fill(p.color(primary));
    }
    p.ellipse(x, y, 50, 50);

    counter++; // increment counter
  };
};
let myp5 = new p5(sketch4, "sketch4");
