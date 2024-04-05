queue

https://docs.nestjs.com/techniques/queues





# Key takeaways

concepts

+ Prodecure (usually service obj) add job object to a queue object. 

  + we define consumer class and Job handler to process the job.

  





# 1. Intro

Queues are a powerful design pattern that help you deal with common application scaling and performance challenges. Some examples of problems that Queues can help you solve are:

- Smooth out processing peaks. For example, if users can initiate resource-intensive tasks at arbitrary times, you can add these tasks to a queue instead of performing them synchronously. Then you can have worker processes pull tasks from the queue in a controlled manner. You can easily add new Queue consumers to scale up the back-end task handling as the application scales up.
- Break up monolithic tasks that may otherwise block the Node.js event loop. For example, if a user request requires CPU intensive work like audio transcoding, you can delegate this task to other processes, freeing up user-facing processes to remain responsive.
- Provide a reliable communication channel across various services. For example, you can queue tasks (jobs) in one process or service, and consume them in another. You can be notified (by listening for status events) upon completion, error or other state changes in the job life cycle from any process or service. When Queue producers or consumers fail, their state is preserved and task handling can restart automatically when nodes are restarted.

:gem: ​[more use cases](./more-use-cases.md)





Nest provides the `@nestjs/bull` package as an abstraction/wrapper on top of [Bull](https://github.com/OptimalBits/bull), a popular, well supported, high performance Node.js based Queue system implementation. The package makes it easy to integrate Bull Queues in a Nest-friendly way to your application.

+ Bull uses [Redis](https://redis.io/) to persist job data, so you'll need to have Redis installed on your system. Because it is Redis-backed, your Queue architecture can be completely distributed and platform-independent. For example, you can have some Queue [producers](https://docs.nestjs.com/techniques/queues#producers) and [consumers](https://docs.nestjs.com/techniques/queues#consumers) and [listeners](https://docs.nestjs.com/techniques/queues#event-listeners) running in Nest on one (or several) nodes, and other producers, consumers and listeners running on other Node.js platforms on other network nodes.

This chapter covers the `@nestjs/bull` package. We also recommend reading the [Bull documentation](https://github.com/OptimalBits/bull/blob/master/REFERENCE.md) for more background and specific implementation details.







# 2. Basic setup



installation & module setup: https://docs.nestjs.com/techniques/queues#installation



```shell
$ npm install --save @nestjs/bull bull
```

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
})
export class AppModule {}
```

```ts
BullModule.registerQueue({
  name: 'audio',
  redis: {
    port: 6380,
  },
});
```

The `registerQueue()` method is used to instantiate and/or register queues. Queues are shared across modules and processes that connect to the same underlying Redis database with the same credentials. Each queue is unique by its name property. A queue name is used as both an injection token (for injecting the queue into controllers/providers), and as an argument to decorators to associate consumer classes and listeners with queues.





Since jobs are persisted in Redis, each time a specific named queue is instantiated (e.g., when an app is started/restarted), it attempts to process any old jobs that may exist from a previous unfinished session.

Each queue can have one or many producers, consumers, and listeners. Consumers retrieve jobs from the queue in a specific order: FIFO (the default), LIFO, or according to priorities. Controlling queue processing order is discussed [here](https://docs.nestjs.com/techniques/queues#consumers).



If your queues connect to multiple different Redis instances, you can use a technique called [**named configurations**](https://docs.nestjs.com/techniques/queues#named-configurations) . 





# 3. Key concepts

Queue: for adding jobs





## 3.1 Prodcedures

Job producers add jobs to queues. Producers are typically application services (Nest [providers](https://docs.nestjs.com/providers)). 

To add jobs to a queue, first inject the queue into the service as follows:

+ :bangbang: ​note The `@InjectQueue()` decorator identifies the queue by its name, as provided in the `registerQueue()` method call (e.g., `'audio'`).

```ts
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class AudioService {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}
}
```

Now, add a job by calling the queue's `add()` method, passing a user-defined job object. Jobs are represented as serializable JavaScript objects (since that is how they are stored in the Redis database). The shape of the job you pass is arbitrary; use it to represent the semantics of your job object.

```ts
const job = await this.audioQueue.add({
  foo: 'bar',
});

```







## 3.2 Named jobs

Jobs may have unique names. This allows you to create specialized [consumers](https://docs.nestjs.com/techniques/queues#consumers) that will only process jobs with a given name.

```ts
const job = await this.audioQueue.add('transcode', {
  foo: 'bar',
});
```

> **WARNING** :bangbang: When using named jobs, you must create processors for each unique name added to a queue, or the queue will complain that you are missing a processor for the given job. See [here](https://docs.nestjs.com/techniques/queues#consumers) for more information on consuming named jobs.



## 3.3 Job options

Jobs can have additional options associated with them. Pass an options object after the `job` argument in the `Queue.add()` method. Job options properties are:

- `priority`: `number` - Optional priority value. Ranges from 1 (highest priority) to MAX_INT (lowest priority). Note that using priorities has a slight impact on performance, so use them with caution.
- `delay`: `number` - An amount of time (milliseconds) to wait until this job can be processed. Note that for accurate delays, both server and clients should have their clocks synchronized.
- `attempts`: `number` - The total number of attempts to try the job until it completes.
- `repeat`: `RepeatOpts` - Repeat job according to a cron specification. See [RepeatOpts](https://github.com/OptimalBits/bull/blob/master/REFERENCE.md#queueadd).
- `backoff`: `number | BackoffOpts` - Backoff setting for automatic retries if the job fails. See [BackoffOpts](https://github.com/OptimalBits/bull/blob/master/REFERENCE.md#queueadd).
- `lifo`: `boolean` - If true, adds the job to the right end of the queue instead of the left (default false).
- `timeout`: `number` - The number of milliseconds after which the job should fail with a timeout error.
- `jobId`: `number` | `string` - Override the job ID - by default, the job ID is a unique integer, but you can use this setting to override it. If you use this option, it is up to you to ensure the jobId is unique. If you attempt to add a job with an id that already exists, it will not be added.
- `removeOnComplete`: `boolean | number` - If true, removes the job when it successfully completes. A number specifies the amount of jobs to keep. Default behavior is to keep the job in the completed set.
- `removeOnFail`: `boolean | number` - If true, removes the job when it fails after all attempts. A number specifies the amount of jobs to keep. Default behavior is to keep the job in the failed set.
- `stackTraceLimit`: `number` - Limits the amount of stack trace lines that will be recorded in the stacktrace.



Here are a few examples of customizing jobs with job options.

To delay the start of a job, use the `delay` configuration property.

```ts
const job = await this.audioQueue.add(
  {
    foo: 'bar',
  },
  { delay: 3000 }, // 3 seconds delayed
);
```



To add a job to the right end of the queue (process the job as **LIFO** (Last In First Out)), set the `lifo` property of the configuration object to `true`.

```ts
const job = await this.audioQueue.add(
  {
    foo: 'bar',
  },
  { lifo: true },
);
```



To prioritize a job, use the `priority` property.

```ts
const job = await this.audioQueue.add(
  {
    foo: 'bar',
  },
  { priority: 2 },
);
```





## 3.4 Consumer & Job Handler

A consumer is a **class** defining methods that either process jobs added into the queue, or listen for events on the queue, or both. Declare a consumer class using the `@Processor()` decorator as follows:

+ Where the decorator's string argument (e.g., `'audio'`) is the name of the queue to be associated with the class methods.

```typescript
import { Processor } from '@nestjs/bull';

@Processor('audio')
export class AudioConsumer {}
```

> Consumers must be registered as `providers` so the `@nestjs/bull` package can pick them up.





Within a consumer class, declare job handlers by decorating handler methods with the `@Process()` decorator.

```ts
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('audio')
export class AudioConsumer {
  
  @Process()
  async transcode(job: Job<unknown>) {
    let progress = 0;
    for (let i = 0; i < 100; i++) {
      await doSomething(job.data);
      progress += 1;
      await job.progress(progress);
    }
    return {};
  }
}
```

The above decorated method (e.g., `transcode()`) is called whenever the worker is idle and there are jobs to process in the queue. This handler method receives the `job` object as its only argument. The value returned by the handler method is stored in the job object and can be accessed later on, for example in a listener for the completed event.



`Job` objects have multiple methods that allow you to interact with their state. For example, the above code uses the `progress()` method to update the job's progress. See [here](https://github.com/OptimalBits/bull/blob/master/REFERENCE.md#job) for the complete `Job` object API reference.



You can designate that a job handler method will handle **only** jobs of a certain type (jobs with a specific `name`) by passing that `name` to the `@Process()` decorator as shown below. You can have multiple `@Process()` handlers in a given consumer class, corresponding to each job type (`name`). When you use named jobs, be sure to have a handler corresponding to each name.



### :bangbang::gem: ​Demo

:gem: ​[demo1: add job to queue demo](./src_md/demo-1.md)

:gem: ​[demo2: send email demo](./src_md/demo-2.md)



### Request-scope consumer

https://docs.nestjs.com/techniques/queues#request-scoped-consumers





## 3.5 Event Listener (handler)

Bull generates a set of useful events when queue and/or job state changes occur. 

+ Nest provides a set of decorators that allow subscribing to a core set of standard events. These are exported from the `@nestjs/bull` package.



Event listeners must be declared within a [consumer](https://docs.nestjs.com/techniques/queues#consumers) class (i.e., within a class decorated with the `@Processor()` decorator). To listen for an event, use one of the decorators in the table below to declare a handler for the event. For example, to listen to the event emitted when a job enters the active state in the `audio` queue, use the following construct:

```ts
import { Processor, Process, OnQueueActive } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('audio')
export class AudioConsumer {

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
  ...

}
```



### Local vs. Globale Event

---

<span style="color:yellow">Since Bull operates in a distributed (multi-node) environment, it defines the concept of event locality.</span> This concept recognizes that events may be triggered either entirely within a single process, or on shared queues from different processes. 

+ `Local Event`:  A **local** event is one that is produced when an action or state change is triggered on a queue in the local process. In other words, when your event producers and consumers are local to a single process, all events happening on queues are local.

+ `Global Event`: When a queue is shared across multiple processes, we encounter the possibility of **global** events. For a listener in one process to receive an event notification triggered by another process, it must register for a global event.

  + When listening for global events, the method signatures can be slightly different from their local counterpart. Specifically, any method signature that receives `job` objects in the local version, instead receives a `jobId` (`number`) in the global version. To get a reference to the actual `job` object in such a case, use the `Queue#getJob` method. This call should be awaited, and therefore the handler should be declared `async`. For example:

    ```ts
    @OnGlobalQueueCompleted()
    async onGlobalCompleted(jobId: number, result: any) {
      const job = await this.immediateQueue.getJob(jobId);
      console.log('(Global) on completed: job ', job.id, ' -> result: ', result);
    }
    ```

    



Event handlers are invoked whenever their corresponding event is emitted. The handler is called with the signature shown in the table below, providing access to information relevant to the event.

+ Nest provides a set of decorators that allow subscribing to a core set of standard events. These are exported from the `@nestjs/bull` package.

| Local event listeners | Global event listeners      | Handler method signature / When fired                        |
| --------------------- | --------------------------- | ------------------------------------------------------------ |
| `@OnQueueError()`     | `@OnGlobalQueueError()`     | `handler(error: Error)` - An error occurred. `error` contains the triggering error. |
| `@OnQueueWaiting()`   | `@OnGlobalQueueWaiting()`   | `handler(jobId: number | string)` - A Job is waiting to be processed as soon as a worker is idling. `jobId` contains the id for the job that has entered this state. |
| `@OnQueueActive()`    | `@OnGlobalQueueActive()`    | `handler(job: Job)` - Job `job`has started.                  |
| `@OnQueueStalled()`   | `@OnGlobalQueueStalled()`   | `handler(job: Job)` - Job `job` has been marked as stalled. This is useful for debugging job workers that crash or pause the event loop. |
| `@OnQueueProgress()`  | `@OnGlobalQueueProgress()`  | `handler(job: Job, progress: number)` - Job `job`'s progress was updated to value `progress`. |
| `@OnQueueCompleted()` | `@OnGlobalQueueCompleted()` | `handler(job: Job, result: any)` Job `job` successfully completed with a result `result`. |
| `@OnQueueFailed()`    | `@OnGlobalQueueFailed()`    | `handler(job: Job, err: Error)` Job `job` failed with reason `err`. |
| `@OnQueuePaused()`    | `@OnGlobalQueuePaused()`    | `handler()` The queue has been paused.                       |
| `@OnQueueResumed()`   | `@OnGlobalQueueResumed()`   | `handler(job: Job)` The queue has been resumed.              |
| `@OnQueueCleaned()`   | `@OnGlobalQueueCleaned()`   | `handler(jobs: Job[], type: string)` Old jobs have been cleaned from the queue. `jobs` is an array of cleaned jobs, and `type` is the type of jobs cleaned. |
| `@OnQueueDrained()`   | `@OnGlobalQueueDrained()`   | `handler()` Emitted whenever the queue has processed all the waiting jobs (even if there can be some delayed jobs not yet processed). |





### custom Event 

---

In addition to the specific event listener decorators, you can also use the generic `@OnQueueEvent()` decorator in combination with either `BullQueueEvents` or `BullQueueGlobalEvents` enums.









# 4. Advanced 

## Queue Management

Queue's have an API that allows you to perform management functions like pausing and resuming, retrieving the count of jobs in various states, and several more. You can find the full queue API [here](https://github.com/OptimalBits/bull/blob/master/REFERENCE.md#queue). Invoke any of these methods directly on the `Queue` object, as shown below with the pause/resume examples.

```ts
await audioQueue.pause();

await audioQueue.resume();

```







## Seperate Processes

https://docs.nestjs.com/techniques/queues#separate-processes

有需求再看





## Async configurations

https://docs.nestjs.com/techniques/queues#async-configuration



有需求再看
