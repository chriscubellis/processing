// sketch-1.js
import p5 from "p5";

const container = document.getElementById("sketch1");
var w = container.clientWidth;
var h = container.clientHeight;

import { primary } from "../index.js";

let color;
let speed;
let seed;
let radius = 4;

const GRAVITY = 0.25;
const DAMPING = 0.9999;
const REMOVE_AFTER = 10000; // number of milliseconds to keep a circle before removing it

let circles = [];

let sketch1 = function (p) {
  p.setup = function () {
    p.createCanvas(w, h);
    p.fill(primary);

    p.frameRate(60); // set the frame rate to 60 fps
    p.textSize(20); // set the text size to 20 pixels

    let x = p.random(w);
    let y = 1;
    let r = p.random(5, 25);
    let vx = p.random(-5, 5);
    let vy = p.random(-5, 5);
    circles.push(new Circle(x, y, r, vx, vy));
  };

  p.draw = function () {
    p.background(0, 0);

    for (let circle of circles) {
      circle.applyForce(0, GRAVITY);
      circle.update();
      circle.display();
    }
  };

  class Circle {
    constructor(x, y, r, vx, vy) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.vx = vx;
      this.vy = vy;
    }

    applyForce(fx, fy) {
      this.vx += fx;
      this.vy += fy;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      this.vx *= DAMPING;
      this.vy *= DAMPING;

      if (this.x - this.r < 0 || this.x + this.r > w) {
        this.vx *= -1;
      }
      if (this.y - this.r < 0 || this.y + this.r > h) {
        this.vy *= -1;
      }
    }

    display() {
      if (
        this.x - this.r < 0 ||
        this.x + this.r > w ||
        this.y - this.r < 0 ||
        this.y + this.r > h
      ) {
        return; // do not display circle if it is outside the canvas
      }
      p.ellipse(this.x, this.y, this.r * radius);
      p.fill(primary);
    }
  }
};

let myp5 = new p5(sketch1, "sketch1");
