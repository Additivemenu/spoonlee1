export default class NumberTimer {
  constructor(duration = 500) {
    this.duration = duration;
    this.number = 1; // current number
    this.onNumberCreated = null; // !triggered when a new number is created
    this.timerId = null;
  }

  start() {
    if (this.timerId) return;

    this.timerId = setInterval(() => {
      this.onNumberCreated &&
        this.onNumberCreated(this.number);

      this.number++;
    }, this.duration);
  }

  stop() {
    clearInterval(this.timerId);
    this.timerId = null;
  }
}
