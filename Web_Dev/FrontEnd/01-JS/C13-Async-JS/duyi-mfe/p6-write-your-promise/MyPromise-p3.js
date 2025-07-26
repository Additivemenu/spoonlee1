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
    this._handlers = []; // !存储then()的回调函数

    try {
      // !this 的指向问题, 让_resolve和_reject的this永远指向当前的MyPromise实例
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this._reject(error);
    }
  }

  /**
   * !向_handlers队列中加入then()的callback function
   * @param {*} executor 添加的callback function
   * @param {*} state 该函数应在什么状态下执行
   * @param {*} resolve 让then()函数返回的Promise成功
   * @param {*} reject 让then()函数返回的Promise失败
   */
  _pushHandler(executor, state, resolve, reject) {
    this._handlers.push({
      executor,
      state,
      resolve,
      reject,
    });
  }

  /**
   * Promise A+ 规范 的then()
   *
   * 往handler队列中加入必须的数据结构
   * @param {*} onFulfilled: 任务完成时的回调函数
   * @param {*} onRejected: 任务失败时的回调函数
   */
  then(onFulfilled, onRejected) {
    // 这里返回的MyPromise, 反应这个then() 这个过程的执行状态
    return new MyPromise((resolve, reject) => {
      // !将then()的回调函数放到队列里等待未来执行
      this._pushHandler(onFulfilled, FULFILLED, resolve, reject);
      this._pushHandler(onRejected, REJECTED, resolve, reject);
    });
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
const pro = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
    console.log(pro);
  }, 1000);
});

pro.then(
  function A1() {},
  function A2() {},
);
pro.then(
  function B1() {},
  function B2() {},
);

/**
 * 运行结果: 
 * 
MyPromise {
  _state: 'fulfilled',
  _value: 'success',
  _handlers: [
    {
      executor: [Function: A1],
      state: 'fulfilled',
      resolve: [Function: bound _resolve],
      reject: [Function: bound _reject]
    },
    {
      executor: [Function: A2],
      state: 'rejected',
      resolve: [Function: bound _resolve],
      reject: [Function: bound _reject]
    },
    {
      executor: [Function: B1],
      state: 'fulfilled',
      resolve: [Function: bound _resolve],
      reject: [Function: bound _reject]
    },
    {
      executor: [Function: B2],
      state: 'rejected',
      resolve: [Function: bound _resolve],
      reject: [Function: bound _reject]
    }
  ]
}
 * 
 */
