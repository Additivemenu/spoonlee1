// Promise contructor 里的代码是同步执行的
const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve(); // this change the state of promise to resolved
  console.log(2); // ! note this is still executed, but you can not change the state of promise again
});

// promise state 为resolved, then 的 callback 会被放入 microtask 队列等待执行
promise.then(() => {
  console.log(3);
});

console.log(4);

/**
 * 考察event loop + promise
 * 
 * outputs: 
 * 1
 * 2
 * 4
 * 3
 *
 */