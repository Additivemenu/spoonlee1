async function m() {
  console.log(0);
  const n = await 1;
  console.log(n); // ! 相当于在then(), 进入 micro-task queue
}

(async () => {
  await m();
  console.log(2); // ! 相当于在then(), 进入 micro-task queue
})(); // ! 立即执行函数

console.log(3);

/**
 * 考察 async/await + Promise + event loop
 *
 * outputs:
 * 0
 * 3
 * 1
 * 2
 *
 *
 *
 */
