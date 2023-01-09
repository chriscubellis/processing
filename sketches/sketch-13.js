// sketch-11.js

import p5 from "p5";
import { primary } from "../index.js";

const container = document.getElementById("sketch13");
var w = container.clientWidth;
var h = container.clientHeight;

let grid = [];
let rows, cols, layers;
let cellSize;
let containerPos = { x: 0, y: 0 }; // store container position

let sketch13 = function (p) {
  p.setup = function () {
    p.createCanvas(w, h, p.WEBGL);
    p.stroke(primary);
    p.strokeWeight(1);
    p.background(0, 0);
    p.setAttributes("alpha", true);

    rows = 10;
    cols = 15;
    layers = 5;
    cellSize = (w / cols) * 1.5;
    p.perspective(p.PI / 2, w / h, 350, 1500); // set the perspective

    for (let z = 0; z < layers; z++) {
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let cell = new Cell(x, y, z);
          grid.push(cell);
        }
      }
    }
    focus();
  };

  p.draw = function () {
    p.background(0, 0);
    p.rotateY((containerPos.x - p.pmouseX) * 0.0001);
    p.rotateX((containerPos.y - p.pmouseY) * 0.001);
    p.translate(-w / 1.5, -h / 1.5);

    for (let i = 0; i < grid.length; i++) {
      grid[i].update();
      grid[i].show();
    }
  };

  class Cell {
    constructor(x, y, z) {
      this.x = x * cellSize;
      this.y = y * cellSize;
      this.z = z * cellSize;
      this.offset = p.random(p.TWO_PI);
      this.strokeColor = p.color(primary);
      this.fillColor = p.color(0);
    }

    update() {
      this.z += p.sin(p.frameCount * 0.01 + this.offset) * 3;
    }

    show() {
      p.push();
      p.translate(this.x, this.y, this.z);
      p.stroke(this.strokeColor);
      p.fill(this.fillColor);
      p.box(cellSize);
      p.pop();
    }
  }
};

let myp5 = new p5(sketch13, "sketch13");

window.addEventListener("resize", function () {
  w = container.clientWidth;
  h = container.clientHeight;
  myp5.resizeCanvas(w, h);
});
