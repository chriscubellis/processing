import p5 from "p5";
import Draggabilly from "draggabilly";

// defaults

export const primary = getComputedStyle(
  document.documentElement
).getPropertyValue("--primary");

// draggy

var draggableElems = document.querySelectorAll(".grid-item");
var draggies = [];
for (var i = 0; i < draggableElems.length; i++) {
  var draggableElem = draggableElems[i];
  var draggie = new Draggabilly(draggableElem, {
    // options...
  });
  draggies.push(draggie);
}
let counter = 9;
draggableElems.forEach((item) => {
  item.addEventListener("click", () => {
    // Increment the counter variable
    counter++;

    // Set the z-index of the clicked grid item to the current value of the counter variable
    item.style.zIndex = counter;
  });
});

// sketches

import sketch1 from "./sketches/sketch-1.js";
import sketch2 from "./sketches/sketch-2.js";
import sketch3 from "./sketches/sketch-3.js";
import sketch4 from "./sketches/sketch-4.js";
import sketch5 from "./sketches/sketch-5.js";
