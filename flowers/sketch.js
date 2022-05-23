let centered = Math.random() < 0.75;
const mappedShape = Math.random() < 0.15;
const mappedCol = Math.random() < 0.15;
const occurenceRoll = Math.random() * 100;
const gravityRoll = Math.random() * 100;
const cellSizes = [10, 15, 20];
const cellSize = cellSizes[Math.floor(cellSizes.length * Math.random())];

let bools = [];
let paletteNum, palette, occurence, gravity;

if (gravityRoll < 30) {
  gravity = "center";
} else if (gravityRoll >= 30 && gravityRoll < 47.5) {
  gravity = "vertical";
} else if (gravityRoll >= 47.5 && gravityRoll < 70) {
  gravity = "horizontal";
} else if (gravityRoll >= 70 && gravityRoll < 87.5) {
  gravity = "tl2br";
} else if (gravityRoll >= 87.5 && gravityRoll < 100) {
  gravity = "tr2bl";
}

if (occurenceRoll <= 5) {
  occurence = "always";
} else if (55 > occurenceRoll && occurenceRoll > 5) {
  occurence = "mapped";
} else {
  occurence = "random";
}

if (occurence === "random") {
  centered = true;
}

function setup() {
  pixelDensity(1);
  let w = min(windowWidth, windowHeight);

  c = createCanvas(w, w);
  angleMode(DEGREES);
  colorMode(HSB);

  paletteNum = floor(random(colors.length));
  palette = colors[paletteNum];

  background(palette[0].hsb);

  // size of the padding between grid and sketch borders
  //padding = Math.ceil(w / (centered ? 12 : 24));
  padding = Math.ceil(w / 25);

  // number of rows and columns of the grid
  gridDivsX = cellSize;
  gridDivsY = cellSize;

  // actual spacing between grid points
  gridSpacingX = (w - padding * 2) / gridDivsX;
  gridSpacingY = (w - padding * 2) / gridDivsY;

  // here we populate the 2d boolean array

  for (let x = 0; x < gridDivsX; x++) {
    var column = [];
    for (let y = 0; y < gridDivsY; y++) {
      column.push(1);
    }
    bools.push(column);
  }
  pg = createGraphics(w, w);
}

function draw() {
  //translate(-width / 2, -height / 2);
  noStroke();
  for (let x = 0; x < gridDivsX; x++) {
    for (let y = 0; y < gridDivsY; y++) {
      let distances = { max: 0, d: 0 };
      let colNum = false;

      let scaledX = padding + 0.5 * gridSpacingX + x * gridSpacingX;
      let scaledY = padding + 0.5 * gridSpacingY + y * gridSpacingY;

      findDistances(distances, scaledX, scaledY, gravity);

      push();
      translate(scaledX, scaledY);
      let rollBig = 100 * random();
      let rollSmall = 100 * random();

      let showBig, showSmall;

      if (occurence === "mapped") {
        let percentage = (distances.d / distances.max) * 100;
        showBig = centered
          ? rollBig > 25 + percentage
          : rollBig < 15 + percentage;
        showSmall = centered
          ? rollSmall > 15 + percentage
          : rollSmall < 5 + percentage;
      } else if (occurence === "random") {
        showBig = random() > 0.55;
        showSmall = random() > 0.65;
      } else {
        showBig = true;
        showSmall = true;
      }

      let BigType;
      if (mappedShape) {
        BigType = floor(
          map(distances.d, gridSpacingX, distances.max - 2 * padding, 5, 1)
        );
      }

      if (mappedCol) {
        colNum = floor(
          map(
            distances.d,
            gridSpacingX,
            distances.max - padding,
            palette.length - 1,
            1,
            true
          )
        );
      }

      if (showBig) {
        rotate(90 * floor(4 * random()));
        let bigCircle = new BigCircle(BigType, colNum);
      }

      if (showSmall) {
        let smallCircle = new SmallCircle(BigType, colNum);
      }

      /*       console.table({
        "Col Num:": colNum,
        "Max dist": distances.max,
        dist: distances.d,
        "Dist %": (distances.d / distances.max) * 100,
        "Big roll": rollBig,
        "Small roll": rollSmall,
      }); */

      pop();
    }
  }

  pg.background(100);
  noiseField("random", pg);
  image(pg, 0, 0);

  /*   stroke(100);
  line(padding, 0, padding, height);
  line(width - padding, 0, width - padding, height);
  line(0, padding, height, padding);
  line(0, height - padding, width, height - padding); */
  noLoop();
  //saveCanvas(c, `Flowers - ${Date.now()}`, "png");
  console.table({
    "Occurence:": occurence,
    "Centered:": centered,
    "Gravity:": gravity,
    "Mapped Shape:": mappedShape,
    "Mapped Color:": mappedCol,
    "Palette:": paletteNum,
  });
}

class BigCircle {
  constructor(type = 0, colNum = false) {
    this.sizeX = ceil(gridSpacingX);
    this.sizeY = ceil(gridSpacingY);
    this.type = type;
    this.randCol = -1 + ceil(random() * palette.length); //random([1, 2, 3, 4]);
    let shapeRoll = random();
    if (type === 5 || (type === 0 && shapeRoll > 0.5)) {
      fill(palette[colNum || this.randCol].hsb);
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
      );
    } else if (type === 4 || type === 3 || (type === 0 && shapeRoll <= 0.5)) {
      if (type === 4 || (type === 0 && random() > 0.5)) {
        let col = palette[colNum || this.randCol].hsb;
        fill(col);
        stroke(col);
      } else if (type === 3 || type === 0) {
        noFill();
        stroke(palette[colNum || this.randCol].hsb);
      }
      strokeWeight(0.05 * this.sizeX);
      let circleSize = this.sizeX - 0.05 * this.sizeX;
      ellipse(0, 0, circleSize, circleSize, 50);
    }
  }
}

class SmallCircle {
  constructor(type = 0, colNum = false) {
    this.type = type;
    this.col = colNum || -1 + ceil(random() * palette.length);

    if (type < 3) {
      if (type === 2 || (type === 0 && random() > 0.5)) {
        noStroke();
        fill(palette[this.col].hsb);
      } else if (type === 1 || type === 0) {
        noFill();
        stroke(palette[this.col].hsb);
      }
      strokeWeight(0.05 * gridSpacingX);
      ellipse(0, 0, gridSpacingX / 2, gridSpacingX / 2);
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
