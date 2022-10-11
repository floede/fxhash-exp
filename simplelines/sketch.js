random = fxrand();

let c;
let w, h;
let windowScale;
let canvasWidth;
const format = "wide"; //Math.random() > 0.5 ? "wide" : "high";
const referenceSize = format === "wide" ? 1000 : 500;
const aspect = format === "wide" ? 2 / 1 : 1 / 2;
const golden = (1 + Math.sqrt(5)) / 2;
const showMargin = random < 0.5 ? true : false;
let shapeMargin = true;
const noOfLines = format === "wide" ? 40 : 20 - (showMargin ? 2 : 0);
let lineWidth;
let lineFills = [];
let shapes;
let marginFactor = 50;
let margin = 0; // = true;

// Weighted traits
let allowSameColor;
const sameColRoll = random;

if (sameColRoll < 0.5) {
  allowSameColor = false;
} else {
  allowSameColor = true;
}

// prettier-ignore
const colorWeights = [
  0, 
  1, 1, 1, 
  2, 2, 2, 
  3, 3, 3,
  4, 4, 4,
  5, 5, 5,
  6, 6, 6,
  7, 7, 7,
  8, 8, 8,
  9, 9, 9,
  10, 10, 10,
  11, 11, 11,
  12, 12, 12,
  13, 
  14, 14, 14,
  15, 15, 15,
  16, 16, 16,
  17, 17, 17,
  18, 18, 18
];
const colorRoll = colorWeights[Math.floor(random * colorWeights.length)];
console.log("COL ROLL: ", colorRoll);

const palette = colors[colorRoll]; // 18
let mappedCol = false;

function setup() {
  setDimensions();
  pixelDensity(1);
  console.log("aspect w h: ", aspect, w, h);

  if (showMargin) {
    margin = marginFactor * windowScale;
  }

  c = createCanvas(w, h);
  pg = createGraphics(w, h);
  angleMode(DEGREES);
  colorMode(HSB);

  background(palette[Math.floor(random() * palette.length)].hsb);

  noFill();
  noStroke();

  if (format === "wide") {
    lineFills.push(new LineFill(margin, height / 2, palette, true));
    lineFills.push(new LineFill(height / 2, height - margin, palette, true));

    lineFills.push(new LineFill(0, height, palette, false, true));
    lineFills.push(new LineFill(0, height, palette, false, true));
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
  shapes = random(["diamond", "round", "ellipse", "square", "sine"]);
}

function draw(params) {
  if (showMargin) {
    margin = marginFactor * windowScale;
  }
  lineWidth = 0.5 * marginFactor * windowScale; // w / noOfLines;
  if (format === "wide") {
    lineFills[0].h = height / 2;
    lineFills[1].y = height / 2;
    lineFills[1].h = height - margin;
    lineFills[2].h = height;
    lineFills[3].h = height;
    lineFills[0].show(showMargin);
    lineFills[1].show(showMargin);
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
  // filter(BLUR, 1);

  pg.background(100);
  noiseField("perlin", pg);
  image(pg, 0, 0);
  noLoop();
}

class LineFill {
  constructor(y, h, palette, inverse = false, forShape = false) {
    // this.x = x;
    this.y = y;
    // this.w = w;
    this.h = h;
    // console.log("H : ", h, " - ", this.h, this);
    this.palette = palette;
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
      } else if (false) {
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
    }
  }
  show(drawMargin = false) {
    let x;
    let lineOffset = !this.forShape && drawMargin ? 4 : 0;
    console.log("OFFSET: ", lineOffset);
    for (let index = 0; index < noOfLines - lineOffset; index++) {
      x =
        index * lineWidth +
        lineWidth / 2 +
        (this.forShape && !shapeMargin ? 0 : margin);
      strokeCap(SQUARE);
      strokeWeight(lineWidth);
      stroke(this.lineCols[index]);
      //console.log(x, this.y, x, this.h, this);
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
  //console.log("RETURN COLORS: ", pickedCol, prevCol);
  if (pickedCol === prevCol) {
    pickUniqueCol();
  } else {
    return pickedCol;
  }
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
