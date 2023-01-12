// sketch-8.js

// source modified from tutorial https://editor.p5js.org/JAlexCarney/sketches/3RJg3RLMD
// https://www.youtube.com/watch?v=jQFYh3nRfSQ

import p5 from "p5";
import { primary } from "../index.js";

let maze = null;
let res = 25;
let backgroundColor = "#000000";
let strokeColor = "#ffffff";
let playerColor = "#ffffff";
let secretColor = "#000000";

const container = document.getElementById("sketch8");
var w = container.clientWidth;
var h = container.clientHeight;

let resetTimeoutId = null;
let endX, endY;
let secretX = { x: 0, y: 0 };

let foundX = false;

let sketch8 = function (p) {
  p.setup = function () {
    p.createCanvas(w, h);
    clearTimeout(resetTimeoutId);
    p.makeMaze(w / res + 2, h / res + 2);

    endX = Math.floor(Math.random() * (w / res)) * res;
    endY = Math.floor(Math.random() * (h / res)) * res;
    secretX.x = endX;
    secretX.y = endY;

    console.log(secretX);

    p.drawMaze();
    p.frameRate(60);
  };

  let count = 0;

  let errorOccurred = false;
  let errorTime = -1;

  p.showError = function (message) {
    background(0);
    textSize(64);
    fill(255);
    textAlign(CENTER, CENTER);
    text(message, width / 2, height / 2);
    setTimeout(() => {
      makeMaze(width / res + 2, height / res + 2);
      drawMaze();
    }, 5000);
  };

  p.draw = function () {
    if (errorOccurred && errorTime + 5000 < millis()) {
      errorOccurred = false;
      makeMaze(width / res + 2, height / res + 2);
      drawMaze();
    } else if (count % 30 == 0) {
      if (maze.stack.length != 0) {
        p.background(0, 0);
        p.mazeIterate();
        p.drawMaze();
        p.fill(secretColor);
        //p.rect(endX, endY, res, res);
      }
    }
    count++;
  };

  p.makeMaze = function (w, h) {
    maze = {
      stack: [],
      tiles: [],
      w: w,
      h: h,
    };

    for (let i = 0; i < w; i++) {
      maze.tiles[i] = [];
      for (let j = 0; j < h; j++) {
        maze.tiles[i][j] = {
          up: "wall",
          down: "wall",
          left: "wall",
          right: "wall",
          isStart: false,
          isCurrent: false,
          x: i,
          y: j,
          seen: false,
        };
        if (i == 0 || i == w - 1 || j == 0 || j == h - 1) {
          maze.tiles[i][j].seen = true;
        }
        maze.tiles[i][j].visitedAt = -1;
      }
    }

    maze.tiles[1][1].isCurrent = true;
    maze.tiles[1][1].isStart = true;
    maze.tiles[1][1].seen = true;
    maze.stack.push(maze.tiles[1][1]);
  };

  p.mazeIterate = function () {
    let current = maze.stack.pop();
    let tileAndWall = p.pickNeighbor(current);

    if (tileAndWall) {
      maze.stack.push(current);
      tileAndWall.tile[tileAndWall.wall] = "open";
      current[p.opositeWall(tileAndWall.wall)] = "open";
      tileAndWall.tile.seen = true;
      maze.stack.push(tileAndWall.tile);

      current.isCurrent = false;
      tileAndWall.tile.isCurrent = true;
    } else if (maze.stack.length != 0) {
      current.isCurrent = false;
      maze.stack[maze.stack.length - 1].isCurrent = true;
    } else {
      let unseenUnvisited = false;
      for (let i = 0; i < maze.w; i++) {
        for (let j = 0; j < maze.h; j++) {
          if (!maze.tiles[i][j].seen) {
            unseenUnvisited = true;
            break;
          }
        }
        if (unseenUnvisited) {
          break;
        }
      }
      if (!unseenUnvisited) {
        showError("The maze has reached a dead end");
      }
    }
  };

  p.pickNeighbor = function (tile) {
    let unSeen = [];

    let upTile = maze.tiles[tile.x][tile.y + 1];
    if (!upTile.seen) {
      unSeen.push({
        tile: upTile,
        wall: "up",
      });
    }
    let downTile = maze.tiles[tile.x][tile.y - 1];
    if (!downTile.seen) {
      unSeen.push({
        tile: downTile,
        wall: "down",
      });
    }
    let rightTile = maze.tiles[tile.x + 1][tile.y];
    if (!rightTile.seen) {
      unSeen.push({
        tile: rightTile,
        wall: "right",
      });
    }
    let leftTile = maze.tiles[tile.x - 1][tile.y];
    if (!leftTile.seen) {
      unSeen.push({
        tile: leftTile,
        wall: "left",
      });
    }

    if (unSeen.length == 0) {
      return null;
    }

    return unSeen[Math.floor(Math.random() * unSeen.length)];
  };

  p.opositeWall = function (wall) {
    if (wall == "up") {
      return "down";
    } else if (wall == "down") {
      return "up";
    } else if (wall == "right") {
      return "left";
    } else if (wall == "left") {
      return "right";
    }

    return -1;
  };

  p.drawMaze = function () {
    p.push();
    p.translate(-res, -res);
    for (let i = 0; i < maze.tiles.length; i++) {
      for (let j = 0; j < maze.tiles[i].length; j++) {
        let tile = maze.tiles[i][j];

        if (tile.x == secretX.x && tile.y == secretX.y) {
          invert();
        }

        if (tile.x == secretX.x && tile.y == secretX.y) {
          invert();
        }

        drawTile(tile, i, j);
      }
    }
    p.pop();
  };

  function drawTile(tile, i, j) {
    p.strokeWeight(0);

    if (tile.seen == true) {
      p.fill(0);
      p.square(i * res, j * res, res);

      p.strokeWeight(2);
      p.stroke(primary);
      if (tile.up == "wall") {
        p.line(i * res, j * res, (i + 1) * res, j * res);
      }
      if (tile.down == "wall") {
        p.line(i * res, (j + 1) * res, (i + 1) * res, (j + 1) * res);
      }
      if (tile.left == "wall") {
        p.line((i + 1) * res, j * res, (i + 1) * res, (j + 1) * res);
      }
      if (tile.right == "wall") {
        p.line(i * res, j * res, i * res, (j + 1) * res);
      }
    }

    if (tile.isCurrent) {
      p.fill(primary);
      p.noStroke();
      p.square(i * res, j * res, res);
    }
  }
};

let myp5 = new p5(sketch8, "sketch8");

window.addEventListener("resize", function () {
  w = container.clientWidth;
  h = container.clientHeight;
  myp5.resizeCanvas(w, h);
  myp5.clear();
});
