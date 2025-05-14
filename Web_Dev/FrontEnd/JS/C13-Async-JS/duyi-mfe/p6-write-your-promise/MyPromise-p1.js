// Promise A+ 规范, 但不是完全实现

// 记录Promise的三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

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
