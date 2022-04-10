const w = 1000;
const h = 1000;

function setup(params) {
  c = createCanvas(w, h);
  colorMode(HSB, 100);
  function pseudoRandom(seed, num_of_digits) {
    n = (seed * seed).toString();
    while (n.length < num_of_digits * 2) {
      n = "0" + n;
    }
    start = Math.floor(num_of_digits / 2);
    end = start + num_of_digits;
    seed = parseInt(n.substring(start, end));
    return seed;
  }
  /*   num_of_digits = 6;
  seed = 1452;
  for (i = 0; i < 5; i++) {
    random_number = pseudoRandom(seed, num_of_digits);
    console.log(random_number);
    seed = random_number;
  } */
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let col = [i * 10, j * 10, 100];
      //let col2 = [pseudoRandom(i * 10, 2), pseudoRandom(j * 10, 2), 100];
      let col2 = [i * 10 * fxrand(), j * 10 * fxrand(), 100];
      let sqr1 = new Square(100 * i, 100 * j, col);
      let sqr2 = new Square(50 + 100 * i, 100 * j, col2);
      sqr1.show();
      sqr2.show();
    }
  }
}

function draw(params) {
  noLoop();
  // saveCanvas(c, "PRNG", "png");
  fxpreview();
}

class Square {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.col = col;

    this.show = function () {
      fill(this.col);
      noStroke();
      rect(this.x, this.y, 50, 100);
    };
  }
}
