// Promise A+ 规范, 但不是完全实现

// 记录Promise的三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

/**
 * 运行一个微队列任务,
 * 把传递的函数放到微队列里
 *
 * 不过这个也不是Promise的核心
 * @param {*} callback
 */
function runMicroTask(callback) {
  // 模拟微队列
  if (process && process.nextTick) {
    // node env
    process.nextTick(callback); // !node环境下的微队列
  } else if (MutationObserver) {
    // browser env
    const p = document.createElement("p");
    const observer = new MutationObserver(callback); // !when triggered, callback is put into the micro-queue and then wait for execution
    observer.observe(p, {
      characterData: true,
    });

    p.innerHTML = "2"; // trigger the observer
  } else {
    // don't know which env
    setTimeout(callback, 0);
  }
}

class MyPromise {
  /**
   * 创建一个Promise
   * @param {*} executor 任务执行器, 立即执行
   */
  constructor(executor) {
    this._state = PENDING; // 状态
    this._value = undefined; // 数据

    try {
      // !this 的指向问题, 让_resolve和_reject的this永远指向当前的MyPromise实例
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this._reject(error);
    }
  }

  /**
   * Promise A+ 规范 的then()
   * @param {*} onFulfilled: 任务完成时的回调函数
   * @param {*} onRejected: 任务失败时的回调函数
   */
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {});
  }

  /**
   * 改变状态和数据
   * @param {*} newState 新的状态
   * @param {*} newValue 新的数据
   */
  _changeState(newState, newValue) {
    // !状态一旦改变, 就不能再改变
    if (this._state !== PENDING) return;

    this._state = newState;
    this._value = newValue;
  }

  /**
   * 标记当前任务完成
   * param {any} data 任务完成的相关数据
   */
  _resolve(data) {
    this._changeState(FULFILLED, data);
  }

  /**
   * 标记当前任务失败
   * param {any} reason 任务失败的原因
   */
  _reject(reason) {
    this._changeState(REJECTED, reason);
  }
}

// test ------------------------------------------------------------
const p = new MyPromise((resolve, reject) => {
  throw new Error("error1");
});
console.log(p);


// !test the runMicroTask(), the output should be 3 -> 2 -> 1
setTimeout(() => {
  console.log(1);
});
runMicroTask(() => {
  console.log(2);
});
console.log(3);
