function setup() {
  // var c = document.getElementById("doodle");
  c = createCanvas(500, 500);
  //var ctx = c.getContext("2d");

  //ctx.beginPath();
  //ctx.lineWidth = 4;

  var xPad = Math.floor(c.width * 0.1);
  var yPad = Math.floor(c.height * 0.1);

  var initialRect = new Rectangle(
    new Point(0, 0),
    new Point(c.width, c.height)
  );

  initialRect.split(xPad, yPad, 0, 5, ctx);
}

function draw() {}

class Rectangle {
  split(xPad, yPad, depth, limit, ctx) {
    ctx.fillStyle = colors[randInt(0, colors.length)];
    ctx.fillRect(this.min.x, this.min.y, this.max.x, this.max.y);
    this.draw(ctx);

    // Check the level of recursion
    if (depth == limit) {
      return;
    }

    // Check the rectangle is enough large and tall
    if (this.width < 2 * xPad || this.height < 2 * yPad) {
      return;
    }

    // If the rectangle is wider than it's height do a left/right split
    if (this.width > this.height) {
      var x = randInt(this.min.x + xPad, this.max.x - xPad);
      var r1 = new Rectangle(this.min, new Point(x, this.max.y));
      var r2 = new Rectangle(new Point(x, this.min.y), this.max);
      // Else do a top/bottom split
    } else {
      var y = randInt(this.min.y + yPad, this.max.y - yPad);
      var r1 = new Rectangle(this.min, new Point(this.max.x, y));
      var r2 = new Rectangle(new Point(this.min.x, y), this.max);
    }

    // Split the sub-rectangles
    r1.split(xPad, yPad, depth + 1, limit, ctx);
    r2.split(xPad, yPad, depth + 1, limit, ctx);
  }
}
