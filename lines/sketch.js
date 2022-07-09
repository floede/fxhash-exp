let w, h;
const aspect = 16 / 9;
const grid = [];
const noOfLines = 20;

let LineWidth;

let palettePick;

let lineShader;

function preload() {
  lineShader = loadShader("line.vert", "line.frag");
}

function setup(params) {
  /* fixed width canvas
     w = 1000;
  h = w * aspect; */

  // dynamic width canvas
  h = min(aspect * windowWidth, windowHeight);
  w = h / aspect;

  c = createCanvas(w, h, WEBGL);

  LineWidth = w / noOfLines;

  background(20);

  colorMode(HSB);

  noStroke();
  for (let j = 0; j < noOfLines; j++) {
    grid[j] = LineWidth / 2 + j * LineWidth;
  }
}

function draw(params) {
  //  translate(-width / 2, -height / 2);
  for (let j = 0; j < grid.length; j++) {
    push();
    col = map(grid[j], 0, width, 10, 90);
    stroke(col);
    pop();
  }
  shader(lineShader);
  rect(0, 0, width, height);
  noLoop();
  //saveCanvas(c, `Gambit - Color: ${palettePick} - Hex: ${HexSize}`, "png");
}
