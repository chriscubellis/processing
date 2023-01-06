// sketch-8.js

import p5 from "p5";
import { primary } from "../index.js";

const container = document.getElementById("sketch9");
var w = container.clientWidth;
var h = container.clientHeight;

let rotation = 0;
let counter = 0;

let sketch9 = function (p) {
  p.setup = function () {
    p.createCanvas(w, h, p.WEBGL);
    p.background(0, 0);
    p.stroke(primary);
    p.strokeWeight(1);
    p.noFill();
    p.frameRate(4);
  };

  p.draw = function () {
    p.background(0);
    p.rotateX(rotation);
    p.rotateY(rotation);

    if (counter % 9 == 0) {
      p.box(100);
    } else if (counter % 9 == 1) {
      p.push();
      p.translate(-50, -50, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(50, 50, 0);
      p.box(50);
      p.pop();
    } else if (counter % 9 == 2) {
      p.push();
      p.translate(-50, 0, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(50, 0, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(0, -50, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(0, 50, 0);
      p.box(50);
      p.pop();
    } else if (counter % 9 == 3) {
      p.push();
      p.translate(-50, -75, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(0, -75, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(50, -75, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(-50, 75, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(0, 75, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(50, 75, 0);
      p.box(50);
      p.pop();
    } else if (counter % 9 == 4) {
      p.push();
      p.translate(-75, -75, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(-25, -75, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(25, -75, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(75, -75, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(-75, -25, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(75, -25, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(-75, 25, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(75, 25, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(-25, 25, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(25, 25, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(0, 0, 0);
      p.box(50);
      p.pop();
    } else if (counter % 9 == 5) {
      p.push();
      p.translate(-50, 0, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(50, 0, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(0, -50, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(0, 50, 0);
      p.box(50);
      p.pop();
    } else if (counter % 9 == 6) {
      p.push();
      p.translate(-50, -50, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(50, 50, 0);
      p.box(50);
      p.pop();
    } else if (counter % 9 == 7) {
      p.push();
      p.translate(-50, -50, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(50, -50, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(-50, 50, 0);
      p.box(50);
      p.pop();
      p.push();
      p.translate(50, 50, 0);
      p.box(50);
      p.pop();
    } else if (counter % 9 == 8) {
      p.box(100);
    }

    rotation += 0.04;
    counter++;
  };
};

let myp5 = new p5(sketch9, "sketch9");

window.addEventListener("resize", function () {
  w = container.clientWidth;
  h = container.clientHeight;
  myp5.resizeCanvas(w, h);
});
