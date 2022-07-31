random = fxrand();

let c;
let w, h;
let windowScale;
let canvasWidth;
const format = "wide"; //Math.random() > 0.5 ? "wide" : "high";
const referenceSize = format === "wide" ? 1000 : 500;
const aspect = format === "wide" ? 2 / 1 : 1 / 2;
const golden = (1 + Math.sqrt(5)) / 2;
const noOfLines = format === "wide" ? 40 : 20;
let lineWidth;
let lineFills = [];
let shapes;

const palette = colors[3];
const mappedCol = false;

function setup() {
  setDimensions();
  pixelDensity(1);
  console.log("aspect w h: ", aspect, w, h);

  c = createCanvas(w, h);
  //layerSquares = createGraphics(w, h);
  angleMode(DEGREES);
  colorMode(HSB);
  //layerSquares.colorMode(HSB);
  background(100, 0, 100, 0);
  filter(BLUR, 5);
  //noFill();
  //noStroke();
  stroke(100);
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
  shapes = "diamond"; //random(["diamond", "round", "ellipse", "square"]);
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
    fill(100);
    let firstShape = getShape(shapes, 0, 0, width / 2, height);
    firstShape.show();

    drawingContext.clip();
    lineFills[2].show();
    pop();

    push();
    fill(100);
    let secondShape = getShape(shapes, width / 2, 0, width / 2, height);
    secondShape.show();

    drawingContext.clip();
    lineFills[3].show();
    pop();
  } else {
    push();
    let firstShape = getShape(shapes, 0, 0, width, height / 2);
    firstShape.show();

    drawingContext.clip();
    lineFills[3].show();
    pop();

    push();
    fill(100);
    let secondShape = getShape(shapes, 0, height / 2, width, height / 2);
    secondShape.show();

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
      //stroke(100);
      //strokeWeight(5 * windowScale);
      //fill(this.lineCols[index]);
      //rect(x, this.y, lineWidth, this.h);
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
    beginShape();
    vertex(this.x, this.h / 2 + this.y);
    vertex(this.x + this.w / 2, this.y);
    vertex(this.x + this.w, this.h / 2 + this.y);
    vertex(this.x + this.w / 2, this.h + this.y);
    endShape(CLOSE);
  }
}

class Round {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show() {
    ellipseMode(CORNER);
    ellipse(this.x, this.y, this.w, this.h);
  }
}

class SuperEllipse {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.n = 2.5;
    this.a = this.w / 2;
    this.b = this.h / 2;
  }
  show() {
    push();
    translate(this.x + this.w / 2, this.y + this.h / 2);
    beginShape();
    for (let t = 0; t <= 360; t += 5) {
      let x = pow(abs(cos(t)), 2 / this.n) * this.a * sgn(cos(t));
      let y = pow(abs(sin(t)), 2 / this.n) * this.b * sgn(sin(t));
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}

class Square {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show() {
    rectMode(CENTER);
    rect(
      this.x + this.w / 2,
      this.y + this.h / 2,
      this.w - 8 * lineWidth,
      this.h - 8 * lineWidth
    );
  }
}

function sgn(w) {
  if (w < 0) {
    return -1;
  } else if (w === 0) {
    return 0;
  } else {
    return 1;
  }
}

function getShape(shape, x, y, w, h) {
  switch (shape) {
    case "diamond":
      return new Diamond(x, y, w, h);
    case "round":
      return new Round(x, y, w, h);
    case "ellipse":
      return new SuperEllipse(x, y, w, h);
    case "square":
      return new Square(x, y, w, h);
    default:
      break;
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
  if (aspect === 1) {
    w = h = floor(min(windowWidth, windowHeight) / noOfLines) * noOfLines;
  } else if (aspect > 1) {
    w = floor(min(windowWidth, windowHeight * aspect) / noOfLines) * noOfLines;
    h = w / aspect;
  } else if (aspect < 1) {
    h =
      floor(min(windowWidth / aspect, windowHeight) / (2 * noOfLines)) *
      2 *
      noOfLines;
    w = h * aspect;
  }
  windowScale = map(w, 0, referenceSize, 0, 1);
}
