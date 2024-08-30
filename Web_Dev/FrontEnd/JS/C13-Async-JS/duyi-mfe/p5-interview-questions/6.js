async function m1() {
  return 1;
}

// ! m2() 返回的的promise只有在自己内部代码(including the one after await, which should run in micro-task queue)都执行完毕了才算是resolved
async function m2() {
  const n = await m1();
  console.log(n);
  return 2;
}

async function m3() {
  const n = m2();
  console.log(n);
  return 3;
}

m3().then((n) => {
  console.log(n);
});

m3();

console.log(4);

/**
 * 中等难度
 * 考察 promise, async/await, event loop
 * 理解清楚整个的执行顺序, 以及这个过程中promise的状态变化 和 micro-task queue中任务的执行顺序
 * 1. await 后面的代码相当于在then()中执行, 进入 micro-task queue
 * 2. 注意一个promise的状态何时变化, 只有在自己内部代码(including the one after await, which should run in micro-task queue)都执行完毕了才算是resolved
 * 
 * outputs:
Promise { <pending> }
Promise { <pending> }
4
1
3
1
 * 
 */
