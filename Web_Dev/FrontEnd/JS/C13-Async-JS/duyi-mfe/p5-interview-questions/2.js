// setTimeout() callback 会在计时结束时被放入macrotask队列
setTimeout(() => {
  console.log(1);
});

const promise = new Promise((resolve, reject) => {
  console.log(2);
  resolve();
});

// ! 只有在promise resolved之后, then()里的callback function才会进入microtask queue
promise.then(() => {
  console.log(3);
});

console.log(4);

/**
 * 考察event loop (macro task queue priority < micro task queue priority) + promise
 *
 * outputs:
 * 2
 * 4
 * 3
 * 1
 *
 *
 */
