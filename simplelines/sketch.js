// TODO: Differentiate reference size and render size

random = fxrand();

const useTexture = true;
let c;
let w, h;
let windowScale;
let canvasWidth;
let bgCol;
let bgLines;
const format = "wide";
const renderSize = 1040;
const referenceSize = format === "wide" ? 1000 : 500;
const aspect = format === "wide" ? 2 / 1 : 1 / 2;
const mappedCol = random > 0.95 ? true : false;
const showMargin = random < 0.5 && !mappedCol ? true : false;
let shapeMargin = true;
const noOfLines = format === "wide" ? 40 : 20 - (showMargin ? 2 : 0);
let lineWidth;
let lineFills = [];
let shapes;
let marginFactor = 50;
let margin = 0; // = true;

// Weighted traits
let allowSameColor = random < 0.5 ? true : false;

let halfLine = random > 0.85 ? true : false;

// prettier-ignore
const colorWeights = [
  0, 
  1, 1, 1, 1, 
  2, 2, 2, 2,
  3, 3, 3,3,
  4, 4, 4,4,
  5, 5, 5,5,
  6, 6, 6,6,
  7, 7, 7,7,
  8, 8, 8,8,
  9, 9, 9,9,
  10, 10, 10,10,
  11, 11, 11,11,
  12, 12, 12,12,
  13, 
  14, 14, 14,14,
  15, 15, 15,15,
  16, 16, 16,16,
  17, 17,
  18, 18, 18,18
];
const colorRoll = colorWeights[Math.floor(random * colorWeights.length)];

const palette = colors[colorRoll]; // 18
let colorSequence = random > 0.75 ? true : false;

function setup() {
  Math.random = fxrand();
  randomSeed(fxrand() * 999999);
  noiseSeed(fxrand() * 999999);

  setDimensions();
  pixelDensity(1);

  if (showMargin) {
    margin = marginFactor * windowScale;
  }

  c = createCanvas(w, h);
  pg = createGraphics(w, h);
  angleMode(DEGREES);
  colorMode(HSB);

  bgCol = mappedCol ? 100 : palette[Math.floor(random() * palette.length)].hsb;
  // background(bgCol);

  // constructor(color, width, height, strokeWidth, noOfStrokes)
  bgLines = new WideLine(bgCol, w, h, windowScale, w, "background");
  push();
  translate(0, 0);
  bgLines.drawLines();
  pop();

  noFill();
  noStroke();

  if (format === "wide") {
    // Top half background
    lineFills.push(
      new LineFill(margin, height / 2 - (useTexture && margin), palette, true)
    );
    // Lower half background
    lineFills.push(
      new LineFill(height / 2, height / 2 - margin, palette, true)
    );

    lineFills.push(new LineFill(0, height, palette, false, true));
    lineFills.push(new LineFill(0, height, palette, false, true));
  }

  lineFills.forEach((fill) => {
    fill.setColors();
  });
  shapes = random(["diamond", "round", "ellipse", "square", "sine", "hexagon"]);
}

function draw(params) {
  push();
  translate(0, 0);
  bgLines.height = h;
  bgLines.width = w;
  bgLines.strokeWidth = windowScale;
  bgLines.drawLines();
  pop();
  if (showMargin) {
    margin = marginFactor * windowScale;
  }
  lineWidth = (referenceSize / noOfLines) * windowScale; // w / noOfLines;

  if (format === "wide") {
    lineFills[0].h = height / 2 - (useTexture && margin);
    lineFills[0].y = margin;
    lineFills[1].y = height / 2;
    lineFills[1].h = (useTexture ? height / 2 : height) - margin;
    height / 2 - margin;
    lineFills[2].h = height;
    lineFills[3].h = height;
    // Top half background
    lineFills[0].show(showMargin);
    // Lower half background
    lineFills[1].show(showMargin);
  }
  noStroke();
  fill(100, 0);

  if (format === "wide") {
    let shapeW = width / 2 - (shapeMargin ? margin : 0);
    let shapeH = height - 2 * (shapeMargin ? margin : 0);
    push();
    //fill(100);

    let firstShape = getShape(shapes, 0 + margin, 0 + margin, shapeW, shapeH);
    firstShape.show();

    drawingContext.clip();
    lineFills[2].show();
    pop();

    push();
    //fill(100);
    let secondShape = getShape(shapes, width / 2, 0 + margin, shapeW, shapeH);

    secondShape.show();

    drawingContext.clip();
    lineFills[3].show();
    pop();
  }

  if (!useTexture) {
    pg.background(0);
    noiseField("perlin", pg);
    image(pg, 0, 0);
  }
  noLoop();
}

class LineFill {
  constructor(y, h, palette, inverse = false, forShape = false) {
    // this.x = x;
    this.y = y;
    // this.w = w;
    this.h = h;

    this.palette = palette;
    this.lines = [];
    this.lineCols = [];
    this.inverse = inverse;
    this.forShape = forShape;
  }
  setColors() {
    let prevCol;
    let colOrder = this.inverse ? palette.length - 1 : 0;
    for (let index = 0; index < noOfLines; index++) {
      if (mappedCol) {
        this.lineCols[index] = [getMapColor(index, this.inverse), 100, 100];
      } else if (colorSequence) {
        if (this.inverse) {
          if (colOrder < 0) {
            colOrder = palette.length - 1;
          }
          this.lineCols[index] = palette[colOrder].hsb;
          colOrder--;
        } else {
          if (colOrder > palette.length - 1) {
            colOrder = 0;
          }
          this.lineCols[index] = palette[colOrder].hsb;
          colOrder++;
        }
      } else {
        let pickedCol;
        if (allowSameColor || index === 0) {
          pickedCol = palette[Math.floor(fxrand() * palette.length)].hsb;
        } else {
          let tempArr = palette.filter((c) => c.hsb !== prevCol);
          pickedCol = tempArr[Math.floor(fxrand() * tempArr.length)].hsb;
        }
        this.lineCols[index] = pickedCol;
        prevCol = pickedCol;
      }
      // Set lines
      // constructor(color, width, height, strokeWidth, noOfStrokes)
      this.lines[index] = new WideLine(
        this.lineCols[index],
        (halfLine ? 0.5 : 1) * lineWidth,
        this.h,
        windowScale,
        (halfLine ? 0.5 : 1) * 25,
        "Line fill"
      );
    }
  }

  show(drawMargin = false) {
    let x;
    let lineOffset = !this.forShape && drawMargin ? 4 : 0;
    for (let index = 0; index < noOfLines - lineOffset; index++) {
      x =
        index * lineWidth +
        lineWidth / 2 +
        (this.forShape && !shapeMargin ? 0 : margin);

      strokeCap(SQUARE);

      if (useTexture) {
        push();
        translate(x - lineWidth / 2, this.y);
        this.lines[index].height = this.h;
        this.lines[index].strokeWidth = windowScale;
        this.lines[index].drawLines();
        pop();
      } else {
        strokeWeight((halfLine ? 0.5 : 1) * lineWidth);
        stroke(this.lineCols[index]);
        line(x, this.y, x, this.h);
      }

      //stroke(50);
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
    noStroke();
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
    this.x = x + (1 / 2) * w;
    this.y = y + (1 / 2) * h;
    this.w = w - (showMargin ? 6 : 4) * lineWidth;
    this.h = h - 4 * lineWidth;
  }

  show() {
    noStroke();
    ellipseMode(CENTER);
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
    this.b = this.h / 2.38196601125;
  }
  show() {
    push();
    translate(this.x + this.w / 2, this.y + this.h / 2);
    noStroke();
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
    noStroke();
    rectMode(CENTER);
    rect(
      this.x + this.w / 2,
      this.y + this.h / 2,
      this.w - 8 * lineWidth,
      this.h - (showMargin ? 6 : 8) * lineWidth
    );
  }
}

class Sine {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.round = 200;
  }

  show() {
    noStroke();
    rectMode(CENTER);
    push();
    translate(this.x + this.w / 2, this.y + this.h / 2);
    rotate(45);
    rect(
      0,
      0,
      this.w - (showMargin ? 5.5 : 6) * lineWidth,
      this.h - (showMargin ? 3.5 : 6) * lineWidth,
      this.round,
      0,
      this.round,
      0
    );
    pop();
  }
}
class Hexagon {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.gs = 0.25 * h;
  }

  show() {
    noStroke();
    rectMode(CENTER);
    push();
    translate(this.w / 2, -margin + this.y + this.h / 2);
    beginShape();
    vertex(this.x - this.gs, this.y - sqrt(3) * this.gs);
    vertex(this.x + this.gs, this.y - sqrt(3) * this.gs);
    vertex(this.x + 2 * this.gs, this.y);
    vertex(this.x + this.gs, this.y + sqrt(3) * this.gs);
    vertex(this.x - this.gs, this.y + sqrt(3) * this.gs);
    vertex(this.x - 2 * this.gs, this.y);
    endShape(CLOSE);
    pop();
  }
}

class WideLine {
  constructor(
    color,
    width,
    height,
    strokeWidth,
    noOfStrokes,
    context = "not set"
  ) {
    this.color = color;
    this.width = width;
    this.height = height;
    this.strokeWidth = strokeWidth;
    this.noOfStrokes = noOfStrokes;
    this.strokes = [];
    this.context = context;

    for (let index = 0; index < this.noOfStrokes; index++) {
      const colOffset = 2;
      const posOffset = 0;
      this.strokes[index] = {
        h: random(-colOffset, colOffset) + this.color[0],
        s: random(-colOffset, colOffset) + this.color[1],
        b: random(-colOffset, colOffset) + this.color[2],
        x1: index * this.strokeWidth,
        y1: 0,
        x2: index * this.strokeWidth,
        y2: this.height,
      };
    }
  }
  drawLines() {
    strokeCap(SQUARE);
    strokeWeight(ceil(this.strokeWidth));

    for (let index = 0; index < this.noOfStrokes; index++) {
      this.strokes[index].y2 = this.height;
      this.strokes[index].x1 = index * this.strokeWidth;
      this.strokes[index].x2 = index * this.strokeWidth;
      stroke(
        this.strokes[index].h,
        this.strokes[index].s,
        this.strokes[index].b
      );
      line(
        this.strokes[index].x1,
        this.strokes[index].y1,
        this.strokes[index].x2,
        this.strokes[index].y2
      );
    }
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
    case "sine":
      return new Sine(x, y, w, h);
    case "hexagon":
      return new Hexagon(x, y, w, h);
    default:
      break;
  }
}

function getMapColor(pos, inverse = false) {
  return inverse
    ? map(pos, 0, noOfLines, 360, 0)
    : map(pos, 0, noOfLines, 0, 360);
}

function pickUniqueCol(prevCol) {
  let pickedCol = palette[Math.floor(fxrand() * palette.length)].hsb;
  if (pickedCol === prevCol) {
    pickUniqueCol();
  } else {
    return pickedCol;
  }
}

function windowResized() {
  setDimensions();
  resizeCanvas(w, h);

  let newPG = createGraphics(w, h);
  newPG.image(pg, 0, 0, newPG.width, newPG.height);
  pg = newPG;
}

function setDimensions() {
  if (aspect === 1) {
    w = h = floor(min(windowWidth, windowHeight) / noOfLines) * noOfLines;
  } else if (aspect > 1) {
    w = max(
      renderSize,
      floor(min(windowWidth, windowHeight * aspect) / noOfLines) * noOfLines
    );
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
