// SVG related
const rc = rough.svg(document.getElementById("svg"));
let width, height;

// Canvas related variables
const referenceSize = 2000;
const hasMaxSize = true; // if true, then the canvas cannot be larger than the reference size
const isCentered = false; // if true the canvas will be vertically and horizontally centered

var canvasSize;
var windowScale;

// Art related variables
let centered = true; //Math.random() < 0.75;
const mappedShape = false; //Math.random() < 0.1;
const mappedCol = false; //Math.random() < 0.1;
const occurenceRoll = 50; // Math.random() * 100;
const gravityRoll = 25; //Math.random() * 100;
const cellSizes = [10, 16, 20];
const cellSize = 10; // cellSizes[Math.floor(cellSizes.length * Math.random())];
let elmSize;

const golden = (1 + Math.sqrt(5)) / 2;
const smallGold = -golden + 2;

const paletteNum = 0; // Math.floor(Math.random() * colors.length);
const palette = colors[paletteNum];

const flowerDecoration = Math.random() > 0.5 ? 2 : 1;
const petalOrientation = Math.random() > 0.5 ? 0 : 180;

const gravity = function () {
  if (gravityRoll < 30) {
    return "center";
  } else if (gravityRoll < 47.5) {
    return "vertical";
  } else if (gravityRoll < 70) {
    return "horizontal";
  } else if (gravityRoll < 87.5) {
    return "tl2br";
  } else return "tr2bl";
};

const occurence = () => {
  if (occurenceRoll <= 5) {
    return "always";
  } else if (occurenceRoll < 55) {
    return "mapped";
  } else {
    return "random";
  }
};

if (occurence() === "random") {
  centered = true;
}

function setup() {
  setDimensions();
  if (isCentered) {
    centerCanvas();
  }
  //createCanvas(canvasSize, canvasSize);
  let w = canvasSize; // min(windowWidth, windowHeight);

  // c = createCanvas(w, w);
  //angleMode(DEGREES);
  //colorMode(hsl);

  padding = Math.ceil(w / 25);

  // number of rows and columns of the grid
  gridDivsX = cellSize;
  gridDivsY = cellSize;

  // actual spacing between grid points
  gridSpacingX = (w - padding * 2) / gridDivsX;
  gridSpacingY = (w - padding * 2) / gridDivsY;
  elmSize = gridSpacingX;

  // pg = createGraphics(w, w);
  //draw();
}

function draw() {
  //translate(-width / 2, -height / 2);

  /*
    name: "Antique White",
    hex: "#fff3df",
    rgb: [255, 243, 223],
    cmyk: [0, 5, 13, 0],
    hsb: [37, 13, 100],
    hsl: [37, 100, 94],
    */

  //background(fff3df);
  const bg = [37, 100, 94];
  let rect1 = rc.rectangle(0, 0, width, height, {
    stroke: "none",
    roughness: 0.5,
    strokeWidth: 0.5,
    hachureAngle: 0, // angle of hachure,
    hachureGap: 0.5,
    fill: `hsl(${bg[0]},${bg[1]}%,${bg[2]}%)`,
  });
  let rect2 = rc.rectangle(0, 0, width, height, {
    stroke: "none",
    roughness: 0.5,
    strokeWidth: 0.5,
    hachureAngle: 0, // angle of hachure,
    hachureGap: 0.5,
    fill: `hsl(${bg[0]},${bg[1]}%,${bg[2] - 2}%)`,
  });
  svg.appendChild(rect1);
  svg.appendChild(rect2);
  //noStroke();
  for (let x = 0; x < gridDivsX; x++) {
    for (let y = 0; y < gridDivsY; y++) {
      let center = false;
      let rotation = 0;
      let distances = { max: 0, d: 0 };
      let colNum = false;

      let scaledX = 25 + padding + 0.5 * gridSpacingX + x * gridSpacingX;
      let scaledY = 25 + padding + 0.5 * gridSpacingY + y * gridSpacingY;

      findDistances(distances, scaledX, scaledY, gravity());

      // push();
      //translate(scaledX, scaledY);
      let rollBig = 100 * Math.random();
      let rollSmall = 100 * Math.random();

      let showBig, showSmall;

      if (occurence() === "mapped") {
        let percentage = (distances.d / distances.max) * 100;
        showBig = centered
          ? rollBig > 30 + percentage
          : rollBig < 15 + percentage;
        showSmall = centered
          ? rollSmall > 15 + percentage
          : rollSmall < 5 + percentage;
      } else if (occurence() === "random") {
        showBig = Math.random() > 0.55;
        showSmall = Math.random() > 0.65;
      } else {
        showBig = true;
        showSmall = true;
      }

      if (x === cellSize / 2 - 1 || x === cellSize / 2) {
        rotation = petalOrientation + (x === cellSize / 2 ? 180 : 90);
        if (y === cellSize / 2 - 1 || y === cellSize / 2) {
          if (y === cellSize / 2) {
            rotation = petalOrientation + (x === cellSize / 2 ? 270 : 360);
          }
          center = true;
        }
      }

      let BigType;
      if (mappedShape) {
        BigType = Math.floor(
          map(distances.d, gridSpacingX, distances.max, 5, 1)
        ); //  - 2 * padding
      }

      if (mappedCol) {
        colNum = Math.floor(
          map(
            distances.d,
            2 * gridSpacingX,
            distances.max - padding,
            palette.length - 1,
            1,
            true
          )
        );
      }

      if (center) {
        showBig = true;
        showSmall = true;
        BigType = 5;
      }

      if (showBig) {
        if (center) {
          colNum = palette.length - 1;
        }
        //rotate(rotation);
        let bigCircle = new BigCircle(
          BigType,
          colNum,
          scaledX,
          scaledY,
          rotation
        );
      }

      if (center) {
        BigType = flowerDecoration;
        colNum = palette.length - 2;
      }

      if (showSmall) {
        let smallCircle = new SmallCircle(BigType, colNum, scaledX, scaledY);
      }

      //pop();
    }
  }

  /*   pg.background(100);
  noiseField("random", pg);
  image(pg, 0, 0); */

  /*   stroke(100);
  line(padding, 0, padding, height);
  line(width - padding, 0, width - padding, height);
  line(0, padding, height, padding);
  line(0, height - padding, width, height - padding); */
  noLoop();
  //saveCanvas(c, `Flowers - ${paletteNames[paletteNum]} - ${Date.now()}`, "png");
  console.table({
    "Occurence:": occurence(),
    "Centered:": centered,
    "Gravity:": gravity(),
    "Mapped Shape:": mappedShape,
    "Mapped Color:": mappedCol,
  });
}

class BigCircle {
  constructor(type = 0, colNum = false, x, y, rotation) {
    this.sizeX = Math.ceil(gridSpacingX);
    this.sizeY = Math.ceil(gridSpacingY);
    this.type = type;
    this.randCol = Math.floor(Math.random() * (palette.length - 1));
    let shapeRoll = Math.random();
    let angle = Math.random() * 90 - 45;
    let circleSize = this.sizeX - 0.05 * this.sizeX;
    if (type === 5 || (type === 0 && shapeRoll > 0.5)) {
      drawPetal(x, y, palette[colNum || this.randCol].hsl, rotation, angle);
      /*       fill(palette[colNum || this.randCol].hsl);
      rectMode(CENTER);
      rect(
        0,
        0,
        this.sizeX,
        this.sizeY,
        0.5 * this.sizeX,
        0.5 * this.sizeX,
        0.5 * this.sizeX,
        0
      ); */
    } else if (type === 4 || type === 3 || (type === 0 && shapeRoll <= 0.5)) {
      if (type === 4 || (type === 0 && Math.random() > 0.5)) {
        let col = palette[colNum || this.randCol].hsl;
        //fill(col);
        //stroke(col);
        drawCircle(x, y, circleSize, col, angle);
      } else if (type === 3 || type === 0) {
        let col = palette[colNum || this.randCol].hsl;
        //noFill();
        //stroke(palette[colNum || this.randCol].hsl);
        drawRing(x, y, circleSize, col);
      }
      //strokeWeight(0.05 * this.sizeX);
      //ellipse(0, 0, circleSize, circleSize, 50);
    }
  }
}

class SmallCircle {
  constructor(type = 0, colNum = false, x, y) {
    this.type = type;
    let circleSize = gridSpacingX / golden;
    let angle = Math.random() * 90 - 45;
    if (mappedShape && occurence === "always") {
      this.col = colNum || 1 + Math.floor(Math.random() * (palette.length - 1));
    } else {
      this.col = colNum || Math.floor(Math.random() * palette.length);
    }

    if (type < 3) {
      if (type === 2 || (type === 0 && Math.random() > 0.5)) {
        //noStroke();
        //fill(palette[this.col].hsl);
        drawCircle(x, y, circleSize, palette[this.col].hsl, angle);
      } else if (type === 1 || type === 0) {
        //noFill();
        //stroke(palette[this.col].hsl);
        drawRing(x, y, circleSize, palette[this.col].hsl, angle);
      }
      ///strokeWeight(0.05 * gridSpacingX);
      // ellipse(0, 0, gridSpacingX / 2, gridSpacingX / 2);
      //ellipse(0, 0, gridSpacingX / golden, gridSpacingX / golden);
      //ellipse(0, 0, gridSpacingX * smallGold, gridSpacingX * smallGold);
    }
  }
}

function findDistances(distances, x, y, type) {
  switch (type) {
    case "center":
      distances.max = dist(0, 0, width / 2, height / 2);
      distances.d = dist(x, y, width / 2, height / 2);
      break;

    case "vertical":
      distances.max = dist(0, 0, width / 2, 0);
      distances.d = dist(x, y, width / 2, y);
      break;

    case "horizontal":
      distances.max = dist(0, 0, 0, height / 2);
      distances.d = dist(x, y, x, height / 2);
      break;

    case "tl2br":
      distances.max = dist(0, 0, 0, width);
      distances.d = dist(x, y, x, x);
      break;

    case "tr2bl":
      distances.max = dist(0, 0, 0, width);
      distances.d = dist(x, y, x, width - x);
      break;

    default:
      break;
  }

  return distances;
}

/* const noiseField = (noiseType, element) => {
  if (noiseType === "random") {
    element.loadPixels();
    for (let x = 0; x < element.width; x++) {
      for (let y = 0; y < element.height; y++) {
        let index = (x + y * width) * 4;
        var r = 20 + Math.random() * 215;
        element.pixels[index + 0] = r;
        element.pixels[index + 1] = r;
        element.pixels[index + 2] = r;
        element.pixels[index + 3] = Math.random() * 20;
      }
    }
    element.updatePixels();
  }
  return element;
}; */

function setDimensions() {
  const el = document.getElementById("svg");
  const rect = el.getBoundingClientRect(); // get the bounding rectangle

  width = rect.width;
  height = rect.height;

  // This is how we constrain the canvas to the smallest dimension of the window
  canvasSize = Math.min(width, height);

  if (hasMaxSize) {
    canvasSize = Math.min(referenceSize, canvasSize);
  }
}

function dist(x1, y1, x2, y2) {
  var a = x1 - x2;
  var b = y1 - y2;

  var c = Math.sqrt(a * a + b * b);
  return c;
}

// setup();
