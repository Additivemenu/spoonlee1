just refactoring of A1 using RMI, 代码变得简介了很多.
1. RMI自动支持多线程, 不需要explicitly 写出线程的启动销毁
2. RMI封装了socket programming, 因此不需要关注socket, input/output stream
    等等资源的创建与释放
3. 正因为上面俩原因, Client更能关注自己的业务逻辑, 而不是繁琐的通讯步骤以及多线程
的管理; 在Server side, 只需要关注解决线程同步问题和register service即可

另外: 在多个terminal中启动多个client是可行的





:bangbang: Q1: all the details of thread handling are hidden when Using RMI, is that right?

chatGPT: Yes, that's correct. One of the main benefits of using RMI (Remote Method Invocation) is that it abstracts away many low-level details, including thread handling. When you develop an RMI application, you can focus on implementing the remote interfaces and the business logic without worrying about the underlying threading model or other networking-related concerns.

RMI handles the creation and management of threads for processing incoming client requests automatically. This allows you to build distributed applications more easily and with less boilerplate code compared to lower-level networking APIs, such as sockets.

However, while RMI hides the details of thread handling, it's still important to design your application with concurrency in mind. This includes using thread-safe data structures and ensuring proper synchronization when needed, as your remote objects may be accessed by multiple threads simultaneously.