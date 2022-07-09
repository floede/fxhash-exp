const w = 1000;
const h = 1000;

const grid = [];
const HexSize = 100;
const HexSide = HexSize / Math.sqrt(3); //56;

const greys = [20, 60, 100, 140, 180, 220, 240];
function setup(params) {
  c = createCanvas(w, h);
  background(220);
  noStroke();
  for (let j = 0; j < 1 + h / HexSize; j++) {
    let row = [];
    for (let index = 0; index < 1 + w / HexSize; index++) {
      if (j % 2 === 0) {
        row[index] = [index * 100, j * 100];
      } else {
        row[index] = [index * 100 + 50, j * 100];
      }
    }
    grid[j] = row;
  }
  console.log("SETUP");
}

function draw(params) {
  for (let j = 0; j < grid.length; j++) {
    for (let index = 0; index < grid[j].length; index++) {
      let x = grid[j][index][0];
      let y = grid[j][index][1];
      push();
      translate(x, y);
      rotate(30 * (PI / 180));
      drawHalfHex(0, 0, HexSide, randdomGrey());
      rotate(PI);
      drawHalfHex(0, 0, HexSide, randdomGrey());
      rotate(PI);
      drawHalfHex(0, 0, HexSide * 0.75, randdomGrey());
      rotate(PI);
      drawHalfHex(0, 0, HexSide * 0.75, randdomGrey());
      rotate(PI);
      drawHalfHex(0, 0, HexSide * 0.5, randdomGrey());
      rotate(PI);
      drawHalfHex(0, 0, HexSide * 0.5, randdomGrey());
      pop();
    }
  }
  noLoop();
  //saveCanvas(c, "Combine", "png");
}

function randdomGrey() {
  return greys[Math.floor(random(greys.length))];
}

function drawHalfHex(x, y, len, col) {
  let gs = 0.5 * len;
  fill(col);
  beginShape();
  vertex(x - gs, y - sqrt(3) * gs);
  vertex(x + gs, y - sqrt(3) * gs);
  vertex(x + 2 * gs, y);
  vertex(x + gs, y + sqrt(3) * gs);
  endShape(CLOSE);
}
