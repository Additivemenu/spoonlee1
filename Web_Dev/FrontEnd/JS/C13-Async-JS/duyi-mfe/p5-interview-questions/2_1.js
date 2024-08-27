const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log(2);
    resolve(); // this change the state of promise to resolved
    console.log(3); // ! note this is still executed, but you can not change the state of promise again
  });
});

// promise state 为resolved时,  then 的 callback 会被放入 microtask 队列等待执行
promise.then(() => {
  console.log(4);
});

console.log(5);

/**
 * event loop + promise
 *
 * outputs:
 * 1
 * 5
 * 2
 * 3
 * 4
 *
 */
