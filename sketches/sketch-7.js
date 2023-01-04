// sketch-7.js

import p5 from "p5";
import { primary } from "../index.js";

const container = document.getElementById("sketch7");
var w = container.clientWidth;
var h = container.clientHeight;

let angle = 0;
let offset = -280;
let maxOffset = 280;

let sketch7 = function (p) {
  p.setup = function () {
    p.createCanvas(w, h);

    p.background(0, 0);
    p.stroke(primary);
    p.strokeWeight(1);
    p.noFill();
  };

  p.draw = function () {
    p.background(0);
    p.translate(w / 2, h / 2);
    p.rotate(angle);
    for (let i = 0; i < 8; i++) {
      p.push();
      p.rotate((p.TWO_PI * i) / 8);
      for (let j = 0; j < 16; j++) {
        let size = 30 + j * 30 + offset;
        p.rect(0, 0, size, size);
        p.rotate(p.TWO_PI / 16);
      }
      p.pop();
    }
    angle += 0.0025;
    offset += 0.1;

    // Reset offset when it reaches the maximum value to make the pattern loop seamlessly
    if (offset > maxOffset) {
      offset %= maxOffset;
    }
  };
};

let myp5 = new p5(sketch7, "sketch7");
