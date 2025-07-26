async function m1() {
  return 1;
}
console.log("m1: ", m1());

async function m2() {
  const n = await 1;
  console.log(n);
}
console.log("m2: ", m2());

/**
 * equivalent to 5_0.js
 *
 *
 */
