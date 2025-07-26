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

/**
 * 判断一个数据是否是Promise对像
 * @param {*} obj
 * @returns
 */
function isPromise(obj) {
  return !!(obj && typeof obj === "object" && typeof obj.then === "function");
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

    /**
     * !new 一个MyPromise的时候, 会立即执行一次executor function, 然后再去跑new MyPromise(executor) 之后的代码
     * const pro = new MyPromise((resolve, reject) => {
     *   resolve("success"); //! 因为这行, pro 在new MyPromise时就fulfilled了
     * });
     */
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
   * 根据实际情况, 执行队列. 分成两种情况调用这个方法
   * 1. _changeState()调用时, 状态已经确定, 可以执行队列
   * 2. then()调用时, 状态可能已经确定, 也需要执行队列
   */
  _runHandler() {
    if (this._state === PENDING) return; // 目前任务还未settle, 仍然挂起

    console.log(`dealing with ${this._handlers.length} handlers`);
    console.log(this._handlers);

    // 任务已经settle, 可以执行handler
    while (this._handlers[0]) {
      const handler = this._handlers[0];
      this._runOneHandler(handler);
      this._handlers.shift(); // !clean up the handler just run
    }
  }

  /**
   * 处理一个handler
   * @param {*} handler
   */
  _runOneHandler({ executor, state, resolve, reject }) {
    runMicroTask(() => {
      if (this._state !== state) {
        // 当前MyPromise的状态和handler的状态不匹配, 不执行
        return;
      }

      if (typeof executor !== "function") {
        // !如果handler的executor不是函数, 则直接调用resolve或reject (状态穿透)
        this._state === FULFILLED ? resolve(this._value) : reject(this._value);
        return;
      }

      try {
        const result = executor(this._value);
        if (isPromise(result)) {
          result.then(resolve, reject);
        } else {
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }

      console.log(this._state);

      // 执行handler的executor
    });
  }

  /**
   * Promise A+ 规范 的then(), 为Promise最核心的方法
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
      this._runHandler(); // !跑then()方法时, 之前的MyPromise的状态可能已经确定了, 也需要看一下handlers队列, 执行一下
    });
  }

  /**
   * 仅仅处理reject的情况
   * @param {*} onRejected
   * @returns
   */
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  /**
   * !无论Promise是成功还是失败, 都会执行的回调函数
   * @param {*} onSettled
   * @returns
   */
  finally(onSettled) {
    return this.then(
      (data) => {
        onSettled(); // 如果 onSettle运行时报错了, 那么这个错误会被传递到finally生成的Promise里
        return data; // onSettled中的return 不会传递给finally生成的Promise, 而是将finally上一步的data返回给finally生成的Promise
      },
      (reason) => {
        onSettled(); // 如果onSettled运行时报错, 那么这个错误会被传递到finally生成的Promise里
        throw reason; // 将上一步的reason抛出, 反映到finally生成的Promise里
      },
    );
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
    this._runHandler(); // !状态已经变化, 可以执行handler
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

  /**
   * 静态方法, 返回一个成功状态的Promise
   * 特殊情况
   * 1. 传递的data本身就是ES6的Promise对象, 直接返回
   * 2. 传递的data是PromiseLike (Promise A+ 规范), 那么返回的Promise对象的状态和值和data一致
   * 3. 传递的data是其他值, 那么返回的Promise对象会成功, 成功的值就是data
   * @param {*} data
   * @returns
   */
  static resolve(data) {
    // 1. 传递的data本身就是ES6的Promise对象, 直接返回
    if (data instanceof MyPromise) {
      return data;
    }

    return new MyPromise((resolve, reject) => {
      if (isPromise(data)) {
        // 2. 传递的data是PromiseLike (Promise A+ 规范), 那么返回的Promise对象的状态和值和data一致
        data.then(resolve, reject);
      } else {
        // 3. 传递的data是其他值, 那么返回的Promise对象会成功, 成功的值就是data
        resolve(data);
      }
    });
  }

  /**
   * 静态方法, 返回一个失败状态的Promise
   * @param {*} reason
   * @returns
   */
  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }
}

// test ------------------------------------------------------------
const pro = MyPromise.reject(1);
console.log(pro); // MyPromise { _state: 'rejected', _value: 1, _handlers: [] }
