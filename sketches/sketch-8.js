// sketch-8.js

import p5 from "p5";
import { primary } from "../index.js";

const container = document.getElementById("sketch8");
var w = container.clientWidth;
var h = container.clientHeight;

const CELLS_X = 50;
const CELLS_Y = 50;

const CELL_SIZE_X = container.clientWidth / CELLS_X;
const CELL_SIZE_Y = container.clientHeight / CELLS_Y;

let grid = [];
let stack = [];
let currentCell;

let sketch8 = function (p) {
  class Cell {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.visited = false;
      this.walls = {
        top: true,
        right: true,
        bottom: true,
        left: true,
      };
    }

    // Draw the cell
    draw() {
      let x = this.x * CELL_SIZE_X;
      let y = this.y * CELL_SIZE_Y;
      p.noFill();
      p.stroke(primary);
      if (this.walls.top) {
        p.line(x, y, x + CELL_SIZE_X, y);
      }
      if (this.walls.right) {
        p.line(x + CELL_SIZE_X, y, x + CELL_SIZE_X, y + CELL_SIZE_Y);
      }
      if (this.walls.bottom) {
        p.line(x + CELL_SIZE_X, y + CELL_SIZE_Y, x, y + CELL_SIZE_Y);
      }
      if (this.walls.left) {
        p.line(x, y + CELL_SIZE_Y, x, y);
      }
      if (this.visited) {
        p.fill(primary);
        p.rect(x, y, CELL_SIZE_X, CELL_SIZE_Y);
      }
    }

    // Get a random unvisited neighbor of the cell
    getRandomUnvisitedNeighbor() {
      let neighbors = [];
      let x = this.x;
      let y = this.y;
      if (x > 0 && !grid[index(x - 1, y)].visited)
        neighbors.push(grid[index(x - 1, y)]);
      if (x < CELLS_Y - 1 && !grid[index(x + 1, y)].visited)
        neighbors.push(grid[index(x + 1, y)]);
      if (y > 0 && !grid[index(x, y - 1)].visited)
        neighbors.push(grid[index(x, y - 1)]);
      if (y < CELLS_X - 1 && !grid[index(x, y + 1)].visited)
        neighbors.push(grid[index(x, y + 1)]);
      if (neighbors.length > 0) {
        return p.random(neighbors);
      } else {
        return undefined;
      }
    }
  }

  p.setup = function () {
    p.createCanvas(CELLS_X * CELL_SIZE_X, CELLS_Y * CELL_SIZE_Y);
    p.frameRate(30);
    p.background(0, 0);

    // Create the grid
    for (let y = 0; y < CELLS_X; y++) {
      for (let x = 0; x < CELLS_Y; x++) {
        grid.push(new Cell(x, y));
      }
    }

    // Select a random starting cell and mark it as visited
    currentCell = grid[p.floor(p.random(0, CELLS_X * CELLS_Y))];
    currentCell.visited = true;
    stack.push(currentCell);

    // Start the generation loop
    p.draw();
  };

  p.draw = function () {
    let nextCell = currentCell.getRandomUnvisitedNeighbor();

    // If there is a neighbor, remove the wall between them and mark the neighbor as visited
    if (nextCell) {
      stack.push(nextCell);
      removeWalls(currentCell, nextCell);
      nextCell.visited = true;
      currentCell = nextCell;
    } else if (stack.length > 0) {
      // If there are no neighbors, backtrack by popping the most recent cell from the stack
      currentCell = stack.pop();
    } else {
      // If the stack is empty, the maze is complete
      console.log("Maze complete!");

      // Show the button
      button.style.display = "block";
    }

    // Draw the cells
    for (let cell of grid) {
      cell.draw();
    }
  };

  function removeWalls(a, b) {
    let x = a.x - b.x;
    if (x === 1) {
      a.walls.left = false;
      b.walls.right = false;
    } else if (x === -1) {
      a.walls.right = false;
      b.walls.left = false;
    }
    let y = a.y - b.y;
    if (y === 1) {
      a.walls.top = false;
      b.walls.bottom = false;
    } else if (y === -1) {
      a.walls.bottom = false;
      b.walls.top = false;
    }
  }

  function index(x, y) {
    return x + y * CELLS_X;
  }

  // Create a button element and append it to the container element
  let button = document.createElement("button");
  button.innerHTML = "Try again";
  //container.appendChild(button);

  // When the button is clicked, reset the sketch by calling setup()
  button.addEventListener("click", function () {
    p.setup();
  });
};

let myp5 = new p5(sketch8, "sketch8");
