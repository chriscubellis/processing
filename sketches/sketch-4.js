// sketch-4.js

import p5 from "p5";
import { primary } from "../index.js";

const container = document.getElementById("sketch4");
var w = container.clientWidth;
var h = container.clientHeight;

let x, y, width, height;
let counter = 0; // add counter variable

let initialCircles = []; // array to store initial circles

async function animateCircles() {
  for (let circle of initialCircles) {
    circle.y += circle.speed;
    if (circle.y > h) {
      initialCircles.splice(initialCircles.indexOf(circle), 1);
    }
  }
}

setInterval(animateCircles, 50);

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
    let circle = p.ellipse(x, y, 50, 50);
    initialCircles.push(circle);

    setTimeout(function () {
      initialCircles.splice(initialCircles.indexOf(circle), 1);
    }, 1000);

    counter++; // increment counter
  };
};
let myp5 = new p5(sketch4, "sketch4");

window.addEventListener("resize", function () {
  w = container.clientWidth;
  h = container.clientHeight;
  myp5.resizeCanvas(w, h);
});
