function pseudoRandom(seed, a, c, m) {
  seed = (a * seed + c) % m;
  return seed / m;
}
let seed = 1452;
let a = 1664525;
let inc = 1013904223;
let m = Math.pow(2, 32);
for (i = 0; i < 5; i++) {
  random_number = pseudoRandom(seed, a, inc, m);
  console.log(random_number);
  seed = random_number;
}
