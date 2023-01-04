// sketch-1.js
import p5 from "p5";

const container = document.getElementById("sketch1");
var w = container.clientWidth;
var h = container.clientHeight;

let color;
let speed;
let seed;

const GRAVITY = 0;
const DAMPING = 0.9999;

let circles = [];

let sketch1 = function (p) {
  p.setup = function () {
    p.createCanvas(w, h);

    for (let i = 0; i < 1; i++) {
      let x = p.random(w);
      let y = p.random(h);
      let r = p.random(5, 25);
      let vx = p.random(-5, 5);
      let vy = p.random(-5, 5);
      circles.push(new Circle(x, y, r, vx, vy));
    }
  };

  p.draw = function () {
    p.background(0, 0);
    // Remove excess circles from the array
    while (circles.length > 500) {
      circles.shift();
    }
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

      for (let other of circles) {
        if (other !== this) {
          let d = p.dist(this.x, this.y, other.x, other.y);
          if (d < this.r + other.r) {
            this.vx *= -1;
            this.vy *= -1;
          }
        }
      }
    }

    display() {
      p.ellipse(this.x, this.y, this.r * 2);
      p.fill("#c7b198");
    }
  }
};

let myp5 = new p5(sketch1, "sketch1");
