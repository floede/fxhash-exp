let w, h;
const aspect = 1 / 1;

function setup() {
  h = min(aspect * windowWidth, windowHeight);
  w = h / aspect;

  c = createCanvas(w, h);
  colorMode(HSB);
}

function draw() {
  background(100);
  let line = new WideLine([0, 100, 100], 20, 400, 1, 25);
  line.drawLines();
  noLoop();
}

class WideLine {
  constructor(color, width, height, strokeWidth, noOfStrokes) {
    this.color = color;
    this.width = width;
    this.height = height;
    this.strokeWidth = strokeWidth;
    this.noOfStrokes = noOfStrokes;
  }
  drawLines() {
    const colOffset = 6;
    const posOffset = 3;
    strokeCap(SQUARE);
    strokeWeight(this.strokeWidth);
    for (let index = 0; index < this.noOfStrokes; index++) {
      stroke(
        random(-colOffset, colOffset) + this.color[0],
        random(-colOffset, colOffset) + this.color[1],
        random(-colOffset, colOffset) + this.color[2]
      );
      line(
        index * this.strokeWidth,
        0 + random(posOffset),
        index * this.strokeWidth,
        this.height - random(posOffset)
      );
    }
  }
}
