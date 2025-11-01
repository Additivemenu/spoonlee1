/**
 *
 * 应该有很多种写法
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

{
  class TaskManager {
    private active: number = 0; // lock
    private limit: number;
    private taskQueue: Array<() => Promise<void>> = [];

    constructor(limit: number) {
      this.limit = limit;
    }

    public async run(fn: () => Promise<void>) {
      this.taskQueue.push(fn);
      this.processQueue(); //! 为什么这种递归写法没想到?
    }

    private async processQueue() {
      if (this.active >= this.limit || this.taskQueue.length === 0) {
        return;
      }

      const task = this.taskQueue.shift();
      if (!task) return;

      this.active++; // 单线程, 这个操作是安全的, 因为目前为止我们还没跑await
      // ? why try finally here? 
      try {
        // Execute the task
        await task();
      } finally {
        this.active--;
        //! Process the next task in queue
        this.processQueue();
      }
    }
  }

  const taskManager = new TaskManager(4);
  taskManager.run(async () => {
    await wait(2000);
    console.log(1);
  });
  taskManager.run(async () => {
    await wait(2000);
    console.log(2);
  });
  taskManager.run(async () => {
    await wait(2000);
    console.log(3);
  });
  taskManager.run(async () => {
    await wait(2000);
    console.log(4);
  });
  taskManager.run(async () => {
    await wait(2000);
    console.log(5);
  });
  taskManager.run(async () => {
    await wait(2000);
    console.log(6);
  });

  function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
