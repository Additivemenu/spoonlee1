/**
 *
 * given a task manager, it will run task at a limit
 *
 * const taskManager = new TaskManager(2); // limit 2
 *
 * taskManager.run(()=>{//wait 2s; console.log("task 1")});
 * taskManager.run(()=>{//wait 2s; console.log("task 2")});
 * taskManager.run(()=>{//wait 2s; console.log("task 3")});
 * taskManager.run(()=>{//wait 2s; console.log("task 4")});
 *
 * After 2s, "task 1" and "task 2" will be printed
 * After 4s, "task 3" and "task 4" will be printed
 * ...
 */

class TaskManager {
  private active: number = 0; // lock
  private limit: number;
  private taskQueue: Array<() => Promise<void>> = [];

  constructor(limit: number) {
    this.limit = limit;
  }

  public async run(fn: () => Promise<void>) {
    this.taskQueue.push(fn);

    if (this.active < this.limit) {
      if (this.taskQueue.length > 0) {
        const task = this.taskQueue.shift();

        // need a mechanism to monitor task progress, when it's done it should signal task manager
        this.active++;
        await task?.();
        this.active--;
      } else {
        // all task done!
      }
    }
  }
}

const taskManager = new TaskManager(2);
taskManager.run(async () => {
  new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(1);
});
taskManager.run(async () => {
  new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(2);
});
taskManager.run(async () => {
  new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(3);
});
taskManager.run(async () => {
  new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(4);
});
