// Points are objects with x and y properties
// p0: start point
// p1: handle of start point
// p2: handle of end point
// p3: end point
// t: progression along curve 0..1
// returns an object containing x and y values for the given t
BezierCubicXY = function (p0, p1, p2, p3, t) {
  var ret = {};
  var coords = ["x", "y"];
  var i, k;

  for (i in coords) {
    k = coords[i];
    ret[k] =
      Math.pow(1 - t, 3) * p0[k] +
      3 * Math.pow(1 - t, 2) * t * p1[k] +
      3 * (1 - t) * Math.pow(t, 2) * p2[k] +
      Math.pow(t, 3) * p3[k];
  }

  return ret;
};
