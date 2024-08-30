async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end"); // ! 不是立即进入micro-task queue, 而是等到async2()返回的promise resolved之后, 这个console.log()才进入micro-task queue (和then()里的callback function一样)
}
async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("script end");

/**
 * 大题
 *
 * outputs: 
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
 */
