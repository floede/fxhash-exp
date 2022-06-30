// const rc = rough.svg(svg);
// let node = rc.rectangle(10, 10, 200, 200); // x, y, width, height
// svg.appendChild(node);

function drawRing(x, y, diameter, col) {
  let es = diameter;
  let ring = rc.circle(x, y, es, {
    fill: "none",
    roughness: 1.5,
    strokeWidth: 3,
    stroke: "#a21acc",
  });
  svg.appendChild(ring);
  let ring2 = rc.circle(x, y, es, {
    fill: "none",
    roughness: 1.5,
    strokeWidth: 3,
    stroke: "#E32Cff",
  });
  svg.appendChild(ring2);
  let ring3 = rc.circle(x, y, es, {
    fill: "none",
    roughness: 1.5,
    strokeWidth: 3,
    stroke: "#f93fff",
  });
  svg.appendChild(ring3);
}

function drawCircle(x, y, diameter, col) {
  let es = diameter;
  let he = diameter / 2;
  let ring = rc.circle(x, y, es, {
    fill: "#E3ff00",
    fillWeight: 2,
    roughness: 2,
    bowing: 3,
    hachureAngle: 60,
    hachureGap: 3,
    stroke: "none",
  });
  svg.appendChild(ring);
}

function drawPetal(x, y, col, rotation) {
  console.log("X Y:", x, y, rotation);
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
    fill: "#E32C29",
    fillWeight: 2,
    roughness: 2,
    bowing: 3,
    hachureAngle: 60,
    hachureGap: 3,
    stroke: "none",
  });
  svg.appendChild(petal);

  petal = rc.path(thispath, {
    fill: "#F52F2C",
    fillWeight: 2,
    roughness: 2,
    bowing: 3,
    hachureAngle: 60,
    hachureGap: 3,
    stroke: "none",
  });
  svg.appendChild(petal);

  petal = rc.path(thispath, {
    fill: "#E34744",
    fillWeight: 2,
    roughness: 2,
    bowing: 3,
    hachureAngle: 60,
    hachureGap: 3,
    stroke: "none",
  });
  svg.appendChild(petal);
}
