function fn1() {} // return type is void

function fn2() {
  // return type is void
  return;
}

function fn3(): void {
  // undefined是void的 的子类型
  return undefined;
}

// function fn4(): void {
//   // 但null不是void的子类型, 所以报错
//   return null;
// }

let m1 = fn1();
let m2 = fn2();
let m3 = fn3();
console.log(m1, m2, m3);

