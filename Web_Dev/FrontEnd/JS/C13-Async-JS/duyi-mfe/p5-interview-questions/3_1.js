const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(); // fn1
  }, 1000);
});
const promise2 = promise1.catch(() => {
  return 2; // fn2
});

console.log("promise1", promise1);
console.log("promise2", promise2);

setTimeout(() => {
  // fn3
  console.log("promise1", promise1);
  console.log("promise2", promise2);
}, 2000);

/**
 * 考察Promise链式调用 + event loop
 *
 * promise1: pending
 * promise2: pending
 *
 * 2s后
 * promise1: resolved undefined
 * promise2: resolved undefined
 *
 *
 */

/**
 * promise1: pending
 * promise2: pending
 *
 * 1s后 -> fn1 进入 macro-task queue
 * when promise1 rejected then fn2 进入 micro-task queue -> promise2: pending
 * 2s后 -> fn3 进入 macro-task queue
 * global context 执行完毕
 *
 * fn1在macro-task queue中执行，promise1状态变为resolved, data = undefined, 同时promise2状态变为resolved, data = undefined (因为没有promise2基于promise1, 但没有后续处理, 因此和promise1 状态, 数据一致)
 * fn2不被执行, 因为promise1状态变为resolved
 * fn3在macro-task queue中执行，打印promise1, promise2
 *
 */
