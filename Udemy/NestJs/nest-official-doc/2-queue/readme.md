queue

https://docs.nestjs.com/techniques/queues









# Intro

Queues are a powerful design pattern that help you deal with common application scaling and performance challenges. Some examples of problems that Queues can help you solve are:

- Smooth out processing peaks. For example, if users can initiate resource-intensive tasks at arbitrary times, you can add these tasks to a queue instead of performing them synchronously. Then you can have worker processes pull tasks from the queue in a controlled manner. You can easily add new Queue consumers to scale up the back-end task handling as the application scales up.
- Break up monolithic tasks that may otherwise block the Node.js event loop. For example, if a user request requires CPU intensive work like audio transcoding, you can delegate this task to other processes, freeing up user-facing processes to remain responsive.
- Provide a reliable communication channel across various services. For example, you can queue tasks (jobs) in one process or service, and consume them in another. You can be notified (by listening for status events) upon completion, error or other state changes in the job life cycle from any process or service. When Queue producers or consumers fail, their state is preserved and task handling can restart automatically when nodes are restarted.

[more use cases](./more-use-cases.md)





Nest provides the `@nestjs/bull` package as an abstraction/wrapper on top of [Bull](https://github.com/OptimalBits/bull), a popular, well supported, high performance Node.js based Queue system implementation. The package makes it easy to integrate Bull Queues in a Nest-friendly way to your application.

+ Bull uses [Redis](https://redis.io/) to persist job data, so you'll need to have Redis installed on your system. Because it is Redis-backed, your Queue architecture can be completely distributed and platform-independent. For example, you can have some Queue [producers](https://docs.nestjs.com/techniques/queues#producers) and [consumers](https://docs.nestjs.com/techniques/queues#consumers) and [listeners](https://docs.nestjs.com/techniques/queues#event-listeners) running in Nest on one (or several) nodes, and other producers, consumers and listeners running on other Node.js platforms on other network nodes.

This chapter covers the `@nestjs/bull` package. We also recommend reading the [Bull documentation](https://github.com/OptimalBits/bull/blob/master/REFERENCE.md) for more background and specific implementation details.





