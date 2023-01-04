// comic shift

const comicLink = document.getElementById("comic");
let toggle = false;
var draggableElems = document.querySelectorAll(".grid-item");

comicLink.addEventListener("click", function () {
  toggle = !toggle; // toggle the flag variable
  if (toggle) {
    translateDraggableElems(draggableElems);
  } else {
    // reset the transform style property to its default value
    draggableElems.forEach(function (elem) {
      elem.style.transition = "transform 1s";
      elem.style.transform = "";
      elem.addEventListener("transitionend", function () {
        elem.style.transition = "";
      });
    });
  }
});

function translateDraggableElems(draggableElems) {
  draggableElems.forEach(function (elem) {
    // random number between -100 and 100
    const xTranslation = Math.floor(Math.random() * 201) - 100;
    // random number between -100 and 100
    const yTranslation = Math.floor(Math.random() * 201) - 100;
    elem.style.transition = "transform 1s";
    elem.style.transform = `translate(${xTranslation}px, ${yTranslation}px)`;
    elem.addEventListener("transitionend", function () {
      elem.style.transition = "";
    });
  });
}
