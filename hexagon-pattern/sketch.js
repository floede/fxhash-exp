let w, h;
const aspect = 16 / 9;
const grid = [];
const listHexSizes = [1, 2, 3, 4, 6, 9, 11, 18, 20];
const noOfHex = 4; //listHexSizes[Math.floor(fxrand() * listHexSizes.length)];

const margin = false;

let HexSize, HexSide, padding;

let palettePick;

function setup(params) {
  h = min(aspect * windowWidth, windowHeight);

  w = h / aspect;

  c = createCanvas(w, h);

  HexSize = w / noOfHex; //Math.ceil(fxrand() * 8) * 50;
  HexSide = Math.ceil(HexSize / Math.sqrt(3));

  let horizontalHexes = Math.floor(h / HexSize);
  padding =
    horizontalHexes === 1
      ? -(1 / 9) * HexSize
      : 0.5 * (h - horizontalHexes * HexSize);

  if (fxrand() < 0.5) {
    background(20);
  } else {
    background(240);
  }
  colorMode(HSB);
  palettePick = 10; //Math.floor(colors.length * fxrand());
  noStroke();
  for (let j = 0; j < 1 + h / HexSize; j++) {
    let row = [];
    for (let index = 0; index < 1 + w / HexSize; index++) {
      if (j % 2 === 0) {
        row[index] = [index * HexSize, j * HexSize];
      } else {
        row[index] = [index * HexSize + 0.5 * HexSize, j * HexSize];
      }
    }
    grid[j] = row;
  }
}

function draw(params) {
  for (let j = 0; j < grid.length; j++) {
    for (let index = 0; index < grid[j].length; index++) {
      let x = grid[j][index][0];
      let y = padding + grid[j][index][1];
      let marginAdjust = j % 2 === 0 ? 1 : 2;
      //console.log("MARGIN ADJUST: ", marginAdjust);
      //console.log("Y COORD:", y, "height: ", h);
      if (noOfHex != 1) {
        if ((margin && j === 0) || (margin && j === grid.length - 1)) {
          break;
        }
      }
      push();
      translate(x, y);
      rotate(30 * (PI / 180));
      drawHalfHex(0, 0, HexSide, pickColorScheme(), x);
      rotate(PI);
      drawHalfHex(0, 0, HexSide, pickColorScheme(), x);
      rotate(PI);
      drawHalfHex(0, 0, HexSide * 0.75, pickColorScheme(), x);
      rotate(PI);
      drawHalfHex(0, 0, HexSide * 0.75, pickColorScheme(), x);
      rotate(PI);
      drawHalfHex(0, 0, HexSide * 0.5, pickColorScheme(), x);
      rotate(PI);
      drawHalfHex(0, 0, HexSide * 0.5, pickColorScheme(), x);
      pop();
    }
  }
  noLoop();
  //saveCanvas(c, `Gambit - Color: ${palettePick} - Hex: ${HexSize}`, "png");
}

function pickColorScheme() {
  let colPick, color;
  colPick = colors[palettePick];
  color = colPick[Math.floor(colPick.length * fxrand())].hsb;
  return color;
}

function drawHalfHex(x, y, len, col, realX) {
  let gs = 0.5 * len;
  if (col.length === 1) {
    let hue = map(realX, 0, w, 0, 360);
    fill(hue, 40 + len - 20 * fxrand(), 100 - 20 * fxrand());
  } else {
    fill(col);
  }
  beginShape();
  vertex(x - gs, y - sqrt(3) * gs);
  vertex(x + gs, y - sqrt(3) * gs);
  vertex(x + 2 * gs, y);
  vertex(x + gs, y + sqrt(3) * gs);
  endShape(CLOSE);
}
