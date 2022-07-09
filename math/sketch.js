let w, h;
const aspect = 1 / 1; // 16 / 9;
const noofcells = 10;
const grid = [];
let gridStart, gridEnd;

const margin = false;

let padding, cellSize;

function setup(params) {
  /* fixed width canvas
     w = 1000;
  h = w * aspect; */

  // dynamic width canvas
  h = min(aspect * windowWidth, windowHeight);
  w = h / aspect;

  c = createCanvas(w, h);

  padding = width / 10;

  cellSize = (width - 2 * padding) / noofcells;
  gridStart = -0.5 * (width - padding);
  gridStart = -0.5 * (width - padding);

  colorMode(HSB);

  for (let j = 0; j < noofcells; j++) {
    let row = [];
    for (let index = 0; index < noofcells; index++) {
      row[index] = [gridStart + index * cellSize, gridStart + j * cellSize];
    }
    grid[j] = row;
  }
  console.log("GRID", grid);
}

function draw(params) {
  translate(width / 2, height / 2);
  for (let j = 0; j < grid.length; j++) {
    for (let index = 0; index < grid[j].length; index++) {
      let x = grid[j][index][0];
      let y = padding + grid[j][index][1];

      push();
      translate(x, y);
      math(x, y);
      pop();
    }
  }
  noLoop();
  //saveCanvas(c, `Gambit - Color: ${palettePick} - Hex: ${cellSize}`, "png");
}

function math(x, y) {
  let dia = Math.abs(x + y) / (1 + Math.pow(x, 2) + Math.pow(y, 2));
  console.log("DIA", dia);
  fill(40);
  noStroke();
  circle(0, 0, dia * 5000);
}
