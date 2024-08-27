async function m() {
  console.log(0);
  const n = await 1; // equivalent to: const n = await Promise.resolve(1);
  console.log(n); // ! 进入 micro-task queue
}

//上面的 async function m() 等价于下面的 function m1() -> async/await 只是Promise的语法糖, 本质还是Promise
function m1() {
  console.log(0);
  return Promise.resolve(1).then((n) => {
    console.log(n);
  });
}

m();
console.log(2);

/**
 * 考察 async/await + Promise + event loop
 *
 * output:
 * 0
 * 2
 * 1
 *
 */
