var a;
var b = new Promise((resolve, reject) => {
  console.log("promise1");
  setTimeout(() => {
    resolve();
  }, 1000);
})
  .then(() => {
    // ! 问题是, 这个then()里的callback function何时进入micro-task queue? 是第一次程序经过这个then()时, 还是在上个promise resolved之后, 这个then()里的callback function才进入micro-task queue?
    // 袁老师讲的是, 在上一个promise resolved之后, 这个then()里的callback function才进入micro-task queue
    console.log("promise2");
  })
  .then(() => {
    console.log("promise3");
  })
  .then(() => {
    console.log("promise4");
  });

a = new Promise(async (resolve, reject) => {
  console.log(a);
  await b;
  console.log(a);
  console.log("after1");
  await a;
  resolve(true);
  console.log("after2");
});

console.log("end");

/**
 * 大题
 * 
 * outputs: 
promise1
undefined
end
promise2
promise3
promise4
Promise { <pending> }
after1
 */
