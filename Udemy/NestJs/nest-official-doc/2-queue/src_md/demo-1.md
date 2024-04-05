In NestJS, when using queues (such as with Bull), you can use the `@Process()` decorator to specify that a method in a consumer class should handle only jobs of a certain type. Here's an example to illustrate this:

First, let's define a simple job processing module using Bull:

```typescript
// queue.module.ts
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QueueProcessor } from './queue.processor';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'my-queue',
    }),
  ],
  providers: [QueueProcessor],
})
export class QueueModule {}
```

Now, let's create a consumer class with multiple `@Process()` handlers, each corresponding to a different job type:

```typescript
// queue.processor.ts
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('my-queue')
export class QueueProcessor {
  @Process('job-type-one')
  async handleJobTypeOne(job: Job) {
    console.log('Processing job of type one:', job.data);
    // Add your job processing logic here
  }

  @Process('job-type-two')
  async handleJobTypeTwo(job: Job) {
    console.log('Processing job of type two:', job.data);
    // Add your job processing logic here
  }
}
```

In this example, the `QueueProcessor` class is a consumer for the `my-queue` queue. It has two methods, `handleJobTypeOne` and `handleJobTypeTwo`, each annotated with the `@Process()` decorator. The `handleJobTypeOne` method will process only jobs with the name `job-type-one`, and the `handleJobTypeTwo` method will process only jobs with the name `job-type-two`.



When you add jobs to the queue, you should specify the job type (name) to ensure that the correct handler processes the job:

```typescript
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

export class SomeService {
  constructor(@InjectQueue('my-queue') private readonly queue: Queue) {}

  async addJobs() {
    await this.queue.add('job-type-one', { /* job data for type one */ });
    await this.queue.add('job-type-two', { /* job data for type two */ });
  }
}
```

In this way, you can have multiple `@Process()` handlers in a given consumer class, each corresponding to a specific job type, and ensure that each job is processed by the appropriate handler.