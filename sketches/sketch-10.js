// sketch-10.js

import p5 from "p5";
import { primary } from "../index.js";

const container = document.getElementById("sketch10");
var w = container.clientWidth;
var h = container.clientHeight;

let eyeX = 0;
let eyeY = 0;
let pupilX = 0;
let pupilY = 0;
let blink = false;

let sketch10 = function (p) {
  p.setup = function () {
    p.createCanvas(w, h);
    p.background(0, 0);
    p.stroke(primary);
    p.strokeWeight(1);
    p.noFill();
    eyeX = w / 2;
    eyeY = h / 2;
    pupilX = eyeX;
    pupilY = eyeY;
  };

  p.draw = function () {
    // Draw the eye
    p.background(0, 0);
    p.noFill();

    if (blink) {
      p.fill(primary);
    } else {
      p.fill(0, 0);
    }
    p.ellipse(eyeX, eyeY, 100, 100);

    // Draw the lines
    for (let i = 0; i < 10; i++) {
      p.push();
      p.line(
        eyeX + 50 * p.cos((p.TWO_PI / 10) * i),
        eyeY + 50 * p.sin((p.TWO_PI / 10) * i),
        eyeX + 100 * p.cos((p.TWO_PI / 10) * i),
        eyeY + 100 * p.sin((p.TWO_PI / 10) * i)
      );
      p.pop();
    }

    // Draw the pupil
    if (blink) {
      p.fill(0, 0);
    } else {
      p.fill(primary);
    }
    p.ellipse(pupilX, pupilY, 25, 25);
  };

  p.mouseMoved = function () {
    // Update the position of the pupil to follow the cursor
    p.clear();
    let dx = p.mouseX - eyeX;
    let dy = p.mouseY - eyeY;
    let distance = p.sqrt(dx * dx + dy * dy);
    let angle = p.atan2(dy, dx);
    pupilX = eyeX + distance * p.cos(angle) * 0.75;
    pupilY = eyeY + distance * p.sin(angle) * 0.75;

    // Constrain the pupil's movement within the eye
    if (distance > 50) {
      pupilX = eyeX + 40 * p.cos(angle);
      pupilY = eyeY + 25 * p.sin(angle);
    }
  };

  p.mousePressed = function () {
    // Blink the eye when the mouse is pressed
    blink = true;
    setTimeout(function () {
      blink = false;
    }, 1000);
  };
};

let myp5 = new p5(sketch10, "sketch10");

window.addEventListener("resize", function () {
  w = container.clientWidth;
  h = container.clientHeight;
  myp5.resizeCanvas(w, h);
});
