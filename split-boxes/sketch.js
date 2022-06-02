// https://gorillasun.de/blog/an-algorithm-for-irregular-grids

let rectInfo = [];

function setup() {
  randomSeed(0);

  w = min(windowWidth, windowHeight);
  createCanvas(w, w);

  // size of the padding between grid and sketch borders
  padding = w / 12;

  // number of rows and columns of the grid
  gridDivsX = 15;
  gridDivsY = 15;

  // actual spacing between grid points
  gridSpacingX = (w - padding * 2) / gridDivsX;
  gridSpacingY = (w - padding * 2) / gridDivsY;

  // here we populate the 2d boolean array
  bools = [];

  for (let x = 0; x < gridDivsX; x++) {
    var column = [];
    for (let y = 0; y < gridDivsY; y++) {
      column.push(1);
    }
    bools.push(column);
  }

  constructIrregularGrid([2, 3]);
  constructIrregularGrid([1]);

  background(0);
  stroke(255);
  strokeWeight(4);
  noFill();
  drawGrid();
  markEmptySpots();
}

function makeRect(posX, posY, dimX, dimY) {
  this.posX = posX;
  this.posY = posY;
  this.dimX = dimX;
  this.dimY = dimY;
}

function constructIrregularGrid(sizesArr) {
  for (let x = 0; x < gridDivsX - max(sizesArr) + 1; x++) {
    for (let y = 0; y < gridDivsY - max(sizesArr) + 1; y++) {
      xdim = random(sizesArr);
      ydim = random(sizesArr);

      fits = true;

      // check if within bounds
      if (x + xdim > gridDivsX || y + ydim > gridDivsY) {
        fits = false;
      }

      // check if rectangle overlaps with any other rectangle
      if (fits) {
        for (let xc = x; xc < x + xdim; xc++) {
          for (let yc = y; yc < y + ydim; yc++) {
            if (bools[xc][yc] == 0) {
              fits = false;
            }
          }
        }
      }

      if (fits) {
        // mark area as occupied
        for (let xc = x; xc < x + xdim; xc++) {
          for (let yc = y; yc < y + ydim; yc++) {
            bools[xc][yc] = false;
          }
        }

        rectInfo.push(new makeRect(x, y, xdim, ydim));
      }
    }
  }
}

function drawGrid() {
  for (let n = 0; n < rectInfo.length; n++) {
    r = rectInfo[n];
    rect(
      r.posX * gridSpacingX + padding,
      r.posY * gridSpacingY + padding,
      r.dimX * gridSpacingX,
      r.dimY * gridSpacingY
    );
  }
}

function markEmptySpots() {
  for (let x = 0; x < gridDivsX; x++) {
    for (let y = 0; y < gridDivsY; y++) {
      if (bools[x][y]) {
        point(
          x * gridSpacingX + gridSpacingX / 2 + padding,
          y * gridSpacingY + gridSpacingY / 2 + padding
        );
      }
    }
  }
}
