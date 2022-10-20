let w, h;
const aspect = 1 / 1;

function setup() {
  h = min(aspect * windowWidth, windowHeight);
  w = h / aspect;

  c = createCanvas(w, h);
}

function draw() {
  background(100);
  let line = new WideLine(100, 200, 500, 1);
  line.drawLines();
  noLoop();
}

class WideLine {
  constructor(color, width, height, strokeWidth) {
    this.color = color;
    this.width = width;
    this.height = height;
    this.strokeWidth = strokeWidth;
    this.noOfStrokes = Math.ceil(width / strokeWidth);
  }
  drawLines() {
    strokeCap(SQUARE);
    strokeWeight(this.strokeWidth);
    for (let index = 0; index < this.noOfStrokes; index++) {
      stroke(random(100));
      line(index * this.strokeWidth, 0, index * this.strokeWidth, this.height);
    }
  }
}
