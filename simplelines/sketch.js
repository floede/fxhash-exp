random = fxrand();

let c;
let w, h;
let windowScale;
let canvasWidth;
const format = "wide"; //Math.random() > 0.5 ? "wide" : "high";
const referenceSize = format === "wide" ? 1000 : 500;
const aspect = format === "wide" ? 2 / 1 : 1 / 2;
const noOfLines = format === "wide" ? 40 : 20;
let lineWidth;
let lineFills = [];

const palette = colors[3];
const mappedCol = false;

function setup() {
  setDimensions();
  pixelDensity(1);
  console.log("aspect w h: ", aspect, w, h);

  c = createCanvas(w, h);
  //layerSquares = createGraphics(w, h);
  colorMode(HSB);
  //layerSquares.colorMode(HSB);
  background(100, 0, 100, 0);
  filter(BLUR, 5);
  noFill();
  noStroke();
  if (format === "wide") {
    lineFills.push(new LineFill(0, height / 2, palette));
    lineFills.push(new LineFill(height / 2, height, palette));

    lineFills.push(new LineFill(0, height, palette));
    lineFills.push(new LineFill(0, height, palette));
  } else {
    lineFills.push(new LineFill(0, height / 4, palette));
    lineFills.push(new LineFill(height / 4, (3 / 4) * height, palette));
    lineFills.push(new LineFill((3 / 4) * height, height, palette));

    lineFills.push(new LineFill(0, height, palette));
    lineFills.push(new LineFill(0, height, palette));
  }

  lineFills.forEach((fill) => {
    fill.setColors();
  });
}

function draw(params) {
  lineWidth = 25 * windowScale; // w / noOfLines;
  if (format === "wide") {
    lineFills[0].h = height / 2;
    lineFills[1].y = height / 2;
    lineFills[1].h = height;
    lineFills[2].h = height;
    lineFills[3].h = height;

    lineFills[0].show();
    lineFills[1].show();
  } else {
    lineFills[0].h = height / 4;
    lineFills[1].y = height / 4;
    lineFills[1].h = (3 / 4) * height;
    lineFills[2].y = (3 / 4) * height;
    lineFills[2].h = height;
    lineFills[3].h = height;
    lineFills[4].h = height;

    lineFills[0].show();
    lineFills[1].show();
    lineFills[2].show();
  }
  noStroke();
  fill(100, 0);

  if (format === "wide") {
    push();
    let firstDiamond = new Diamond(0, 0, width / 2, height);
    firstDiamond.show();

    drawingContext.clip();
    lineFills[2].show();
    pop();

    push();
    let secondDiamond = new Diamond(width / 2, 0, width / 2, height);
    secondDiamond.show();

    drawingContext.clip();
    lineFills[3].show();
    pop();
  } else {
    push();
    let firstDiamond = new Diamond(0, 0, width, height / 2);
    firstDiamond.show();

    drawingContext.clip();
    lineFills[3].show();
    pop();

    push();
    fill(100);
    let secondDiamond = new Diamond(0, height / 2, width, height / 2);
    secondDiamond.show();

    drawingContext.clip();
    lineFills[4].show();
    pop();
  }

  noLoop();
}

class LineFill {
  constructor(y, h, palette) {
    //this.x = x;
    this.y = y;
    //this.w = w;
    this.h = h;
    this.palette = palette;
    this.lineCols = [];
  }
  setColors() {
    for (let index = 0; index < noOfLines; index++) {
      !mappedCol
        ? (this.lineCols[index] =
            palette[Math.floor(fxrand() * palette.length)].hsb)
        : (this.lineCols[index] = (getMapColor(x), 100, 100));
    }
  }
  show() {
    let x;
    for (let index = 0; index < noOfLines; index++) {
      x = index * lineWidth + lineWidth / 2;
      strokeCap(SQUARE);
      strokeWeight(lineWidth);
      stroke(this.lineCols[index]);
      line(x, this.y, x, this.h);
    }
  }
}

class Diamond {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show() {
    //stroke(100);
    //point(this.x, this.h / 2);
    //point(this.x + this.w / 2, this.y);
    //point(this.x + this.w, this.h / 2);
    //point(this.x + this.w / 2, this.h);

    beginShape();
    vertex(this.x, this.h / 2 + this.y);
    vertex(this.x + this.w / 2, this.y);
    vertex(this.x + this.w, this.h / 2 + this.y);
    vertex(this.x + this.w / 2, this.h + this.y);
    endShape(CLOSE);
  }
}

function getMapColor(pos) {
  return map(pos, 0, width, 0, 360);
}

function windowResized() {
  setDimensions();
  resizeCanvas(w, h);
}

function setDimensions() {
  console.log("TEST: ", aspect, w, h);
  // This is how we constrain the canvas to the smallest dimension of the window
  if (aspect === 1) {
    w = h = min(windowWidth, windowHeight);
  } else if (aspect > 1) {
    w = min(windowWidth, windowHeight * aspect);
    h = w / aspect;
    console.log("TEST: ", w, h);
  } else if (aspect < 1) {
    h = min(windowWidth / aspect, windowHeight);
    w = h * aspect;
    console.log("TEST: ", w, h);
  }
  windowScale = map(w, 0, referenceSize, 0, 1);
  console.log("SCALE: ", windowScale);
}
