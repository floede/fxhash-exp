let segH,
  cc,
  wdt,
  hit,
  celW,
  celH,
  lll1 = [],
  lll2 = [],
  colors = [
    "#e6d8b1",
    "#d99300",
    "#0060aa",
    "#cf4610",
    "#e69fa3",
    "#418d81",
    "#000000",
    "#f3f3f1",
    "#f5e6bf",
    "#d4615a",
    "#86ac95",
    "#cd9b56",
    "#2a211a",
    "#ede7d9",
    "#efb94d",
    "#486795",
    "#cf4e49",
    "#82acaa",
    "#db9192",
    "#713340",
    "#d89c78",
  ],
  nums1 = [],
  nums2 = [],
  segW = 32;
function setup() {
  createCanvas(900, 1136),
    randomSeed(99999 * fxrand()),
    noiseSeed(99999 * fxrand()),
    (wdt = 865),
    (hit = 1101),
    (segH = segW / (wdt / hit)),
    (celW = wdt / segW),
    (celH = hit / segH),
    translate((width - wdt) / 2, (height - hit) / 2),
    background(random(colors)),
    noLoop();
  for (let e = 1; e < segW; e++) nums1.push(nf(e, 2, 0));
  for (let e = 1; e < segH; e++) nums2.push(nf(e, 2, 0));
  shuffle(nums1, !0), shuffle(nums2, !0), (cc = int(random(10, 25)));
  for (let e = 0; e < cc; e++) nums1.splice(0, 1);
  cc = int(random(10, 25) / (wdt / hit));
  for (let e = 0; e < cc; e++) nums2.splice(0, 1);
  nums1.push(0, segW),
    nums2.push(0, segH),
    nums1.sort(),
    nums2.sort(),
    noStroke();
  for (let e = 0; e < nums1.length; e++) {
    let t = nums1[e],
      o = t * celW,
      n = (nums1[e + 1] - t) * celW;
    for (let t = 0; t < nums2.length; t++) {
      let l = nums2[t],
        r = l * celH,
        s = (nums2[t + 1] - l) * celH;
      random() < 0.95 && superRandomShape(o, r, n, s), 0 == e && lll2.push(r);
    }
    lll1.push(o);
  }
  stroke(0);
  for (let e of lll1)
    strokeWeight(1.5), line(e, 0 - (hit - 100), e, hit + (hit - 100));
  for (let e of lll2)
    strokeWeight(1.5), line(0 - (wdt - 100), e, wdt + (wdt - 100), e);
}
function superRandomShape(e, t, o, n) {
  shuffle(colors, !0),
    random() < 0.5 && (fill(random(colors)), rect(e, t, o, n));
  let l = int(random(3));
  if ((fill(random(colors)), 0 == l)) {
    let l = random(0.45, 0.6) * (o < n ? o : n),
      r = e + random(l / 1.7, o - l / 1.7),
      s = t + random(l / 1.7, n - l / 1.7);
    circle(r, s, l);
  } else if (1 == l) {
    let l = int(random(10, 25));
    if ((stroke(0), random() < 0.5))
      for (let r = 0; r < l; r++) {
        let s = map(r, 0, l, e, e + o);
        strokeWeight(1), line(s, t, s, t + n);
      }
    else
      for (let r = 0; r < l; r++) {
        let s = map(r, 0, l, t, t + n);
        strokeWeight(1), line(e, s, e + o, s);
      }
  }
  if (3 == l) {
    let l = int(random(5, 9)),
      r = o / l,
      s = n / l;
    noStroke(), fill(random(colors));
    for (let o = 0; o < l; o++)
      for (let n = 0; n < l; n++)
        (n + o) % 2 == 0 && rect(e + n * r, t + o * s, r, s);
  }
}
function draw() {
  stroke("#e6d8b1"),
    strokeWeight(35),
    noFill(),
    rect(0, 0, 900, 1136),
    drawCanvasTexture();
}
function generateTexture(e, t, o, n, l) {
  push();
  let r = color(l.toString());
  r.setAlpha(120), stroke(r), translate(e, t);
  for (var s = (e, t) => random(e) < 0.4, a = 1; a < o / 1.5; a += 1) {
    let e = 4 * log(random(o)),
      t = random(n);
    point(e, t);
    for (var i = 0; i < n; i += 0.5)
      if (s(a)) {
        strokeWeight(random(1));
        let e = a + random(-1, 1);
        e < 0 && (e = 0), point(e, i + random(-1, 1));
      }
  }
  pop(), noLoop();
}
function gridline(e, t, o, n) {
  let l;
  e > o && ((l = e), (e = o), (o = l), (l = t), (t = n), (n = l));
  let r = o - e,
    s = n - t,
    a = 1;
  o < e && (a = -a);
  let i = e,
    d = t;
  for (let n = e + a; n <= o; n += a) {
    let o = t + (a * s * (n - e)) / r;
    strokeWeight(0.5 + map(noise(i, d), 0, 1, -0.5, 0.5)),
      line(
        i,
        d,
        n + map(noise(n, o), 0, 1, -1, 1),
        o + map(noise(n, o), 0, 1, -1, 1)
      ),
      (i = n),
      (d = o);
  }
}
function drawCanvasTexture() {
  for (let e = -900; e < 2036; e += 5)
    stroke(255), gridline(e, 0, e + 900, 1136);
  for (let e = 2036; e >= -900; e -= 5) stroke(255);
}
function windowResized() {
  resizeCanvas(900, 1136);
}
