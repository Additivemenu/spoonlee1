Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);

/**
 * promise的then()方法接收的是一个函数, 而不是一个值, 如果传入的是一个值, 返回和前一个promise的状态一样的promise (可以缩promise chain calling)
 * 所以这里的代码等价于:
 * Promise.resolve(1).then(console.log);
 *
 * output:
 * 1
 */
