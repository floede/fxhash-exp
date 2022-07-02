// const rc = rough.svg(svg);
// let node = rc.rectangle(10, 10, 200, 200); // x, y, width, height
// svg.appendChild(node);

function drawRing(x, y, diameter, col) {
  let es = diameter;
  let ring = rc.circle(x, y, es, {
    fill: "none",
    roughness: 2.5,
    strokeWidth: 12,
    stroke: `hsl(${col[0]},${col[1]}%,${col[2] - 5}%)`,
  });
  svg.appendChild(ring);
  let ring2 = rc.circle(x, y, es, {
    fill: "none",
    roughness: 2,
    strokeWidth: 10,
    stroke: `hsl(${col[0]},${col[1]}%,${col[2]}%)`,
  });
  svg.appendChild(ring2);
  let ring3 = rc.circle(x, y, es, {
    fill: "none",
    roughness: 1,
    strokeWidth: 8,
    stroke: `hsl(${col[0]},${col[1]}%,${col[2] + 5}%)`,
  });
  svg.appendChild(ring3);
}

function drawCircle(x, y, diameter, col, angle) {
  let es = diameter;
  let he = diameter / 2;

  let ring1 = rc.circle(x, y, es, {
    fill: `hsl(${col[0]},${col[1]}%,${col[2] - 5}%)`,
    fillWeight: 8,
    roughness: 1.9,
    bowing: 2,
    hachureAngle: angle,
    hachureGap: 9,
    stroke: "none",
  });
  let ring2 = rc.circle(x, y, es, {
    fill: `hsl(${col[0]},${col[1]}%,${col[2]}%)`,
    fillWeight: 8,
    roughness: 1.9,
    bowing: 2,
    hachureAngle: angle,
    hachureGap: 9,
    stroke: "none",
  });
  let ring3 = rc.circle(x, y, es, {
    fill: `hsl(${col[0]},${col[1]}%,${col[2] + 2}%)`,
    fillWeight: 2,
    roughness: 1.5,
    bowing: 3,
    hachureAngle: angle,
    hachureGap: 10,
    stroke: "none",
  });
  svg.appendChild(ring1);
  svg.appendChild(ring2);
  svg.appendChild(ring3);
}

function drawPetal(x, y, col, rotation, angle) {
  let es = elmSize;
  let he = elmSize / 2;

  // lower right
  const lrpath = `M${
    x + he
  } ${y} a ${he} ${he}, 0, 1, 0, -${he} ${he} l ${he} 0 z`;

  // upper right
  const urpath = `M${x} ${
    y - he
  } a ${he} ${he}, 0, 1, 0, ${he} ${he} l 0 -${he} z`;

  // lower left
  const llpath = `M${x} ${
    y + he
  } a ${he} ${he}, 0, 1, 0, -${he} -${he} l 0 ${he} z`;

  // upper left
  const ulpath = `M${
    x - he
  } ${y} a ${he} ${he}, 0, 1, 0, ${he} -${he} l -${he} 0 z`;

  let thispath;

  switch (rotation) {
    case 90:
      thispath = ulpath;
      break;
    case 180:
      thispath = urpath;
      break;

    case 270:
      thispath = lrpath;
      break;

    case 360:
      thispath = llpath;
      break;

    default:
      thispath = random([ulpath, urpath, lrpath, llpath]);
      break;
  }

  let petal = rc.path(thispath, {
    fill: `hsl(${col[0]},${col[1]}%,${col[2] - 5}%)`,
    fillWeight: 6,
    roughness: 2,
    bowing: 3,
    hachureAngle: angle,
    hachureGap: 3,
    stroke: "none",
  });
  svg.appendChild(petal);

  petal = rc.path(thispath, {
    fill: `hsl(${col[0]},${col[1]}%,${col[2]}%)`,
    fillWeight: 4,
    roughness: 2,
    bowing: 3,
    hachureAngle: angle,
    hachureGap: 3,
    stroke: "none",
  });
  svg.appendChild(petal);

  petal = rc.path(thispath, {
    fill: `hsl(${col[0]},${col[1]}%,${col[2] + 5}%)`,
    fillWeight: 2,
    roughness: 2,
    bowing: 3,
    hachureAngle: angle,
    hachureGap: 3,
    stroke: "none",
  });
  svg.appendChild(petal);
}
