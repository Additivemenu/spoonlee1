function m1() {
  return Promise.resolve(1);
}
console.log("m1: ", m1());

function m2() {
  return Promise.resolve(1).then((n) => console.log(n));
}
console.log("m2: ", m2());

/**
 *
 * 先理解好这个
 * outputs:
 * m1: Promise { 1 }
 * m2: Promise { <pending> }
 * 1
 *
 */


