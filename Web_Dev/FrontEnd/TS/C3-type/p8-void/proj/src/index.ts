function fn1() { }

function fn2() { 
  return;
}

function fn3(): void { 
  return undefined;
}

// function fn4(): void { 
//   return null
// }

let m1 = fn1();
let m2 = fn2();
let m3 = fn3();
console.log(m1, m2, m3);

let v1: void = undefined;
// let v2: void = null;