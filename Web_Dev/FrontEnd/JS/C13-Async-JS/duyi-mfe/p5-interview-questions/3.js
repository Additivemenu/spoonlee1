const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject();
  }, 1000);
});
const promise2 = promise1.catch(() => {
  return 2;
});

console.log("promise1", promise1);
console.log("promise2", promise2);

setTimeout(() => {
  console.log("promise1", promise1);
  console.log("promise2", promise2);
}, 2000);

/**
 * 考察Promise链式调用 + event loop
 *  
 * outputs
 * promise1: pending
 * promise2: pending
 * 
 * 2s后
 * promise1: rejected undefined
 * promise2: resolved 2
 *
 */


/**
 * promise1: pending
 * promise2: pending
 * 
 * 1s后 -> fn1 进入 macro-task queue
 * when promise1 rejected then fn2 进入 micro-task queue  -> promise2: pending 
 * 2s后 -> fn3 进入 macro-task queue
 * global context 执行完毕
 * 
 * 1s后，fn1在macro-task queue中执行，promise1状态变为rejected, data = undefined, 同时promise2状态变为resolved, data = 2 (因为promise1状态变为rejected, 执行fn2, 返回2)
 * 2s后，fn3在macro-task queue中执行，打印promise1, promise2
 * 
 * 
 */