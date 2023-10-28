

UniMelb: distributed system

底层是Java 多线程, I/O stream & 网络编程



# Architecture 



## 疑问与回答

by chatGPT

### :gem:  疑问1

**what is difference between a `thread-per-request` and `thread-per-connection`?**

Thread-per-request:

- In this approach, the server creates a new thread for each incoming request from a client, regardless of whether the requests are from the same connection or multiple connections.
- The dedicated thread is responsible for handling a single request, and once the request is processed, the thread is terminated and its resources are released.
- This approach is more suitable for short-lived connections, stateless services, or request-response-based communication.
- It can lead to higher overhead in scenarios with `high concurrency` and <u>*long-running requests*</u> since creating and destroying threads for each request can be computationally expensive. 如果某个用户建立了和server的连接, 同时提交了多个需要很久才可以完成的request (long-running request), 此时在同一个connection内, 每当用户提交一个request, 便起一个线程来处理, 可以同时处理多个request

Thread-per-connection:

- In this approach, the server creates a new thread for each incoming client connection.
- The dedicated thread is responsible for handling all requests from the connected client over the same connection.
- The thread remains active as long as the client is connected, processing multiple requests during the lifetime of the connection.
- This approach is suitable for long-lived connections, stateful services, or persistent communication channels between the client and server.
- 针对可以应对的connection总数上: It can handle fewer concurrent connections than thread-per-request due to higher resource overhead (since threads remain active throughout the connection). 
- 针对1个connection的性能上: 如果1个request需要很长时间才能处理好, 同时某个client有多个request想要提交, 那么这个client就需要等待很久才可以得到所有的response, 因为只是1个thread负责他的connection, 多个request被这1个thread串行处理. (或者说, 需要server处理完了本次的request 发送了response, client才能发起下一个request)
- However, it can provide better performance for scenarios with long-lived connections and multiple requests per connection, as it avoids the overhead of creating and destroying threads for each request.

In summary, the main difference between thread-per-request and thread-per-connection lies in the way threads are allocated and managed for client connections. `Thread-per-request` creates a new thread for each request and terminates it after processing, while `thread-per-connection` creates a new thread for each connection and keeps it active to process multiple requests from the client during the connection's lifetime. The choice between these two approaches depends on the specific requirements and nature of the server application.



### :gem: 疑问2

**In thread-per-request, will the connection between client and server be closed if a request is done?**

In a thread-per-request model, the connection between the client and server can be closed after a request is done, but it doesn't have to be. The behavior of closing the connection depends on the implementation and the communication protocol being used.

In general, there are two types of connections - persistent and non-persistent.

1. `Non-persistent connections`:

- In this case, the connection is closed after each request-response exchange.
- A new connection is established for each request.
- Thread-per-request is a natural fit for non-persistent connections because a new thread is created to handle each incoming request, and once the request is processed, the thread is terminated, and the connection can be closed.

2. `Persistent connections`:

- In this case, the connection remains open for multiple request-response exchanges.
- Thread-per-request can still be used with persistent connections by reusing the same thread for handling multiple requests over the same connection before the connection is closed.
- However, thread-per-connection is more suitable for handling persistent connections, as a single thread is created for each connection and remains active throughout the lifetime of the connection, processing multiple requests.

In summary, whether the connection is closed after a request is done in a thread-per-request model depends on the implementation and the communication protocol being used. It can be closed for non-persistent connections or remain open for multiple request-response exchanges in persistent connections.





## 注意的问题

### :gem: 问题一

Problem context: using client-server architecture, there are two threads on client side, both running in.readObject(), while `in` is an ObjectInputStream, thread1 want the object to be a Person, thread2 want the object to be a Book. Now server sends a Book object, how to ensure thread2 on client can receive the Book object?



:question: On the client side, if there are multiple threads running that has `in.readObjects()`, where `in` is ObjectInputStream, what problem will arise? 即如果server 发过来一个object, 此时client有两个线程都堵塞在in.readObject()这里, 那么此时这个object应该被哪个线程接收呢? 这就引入了混乱, 如果对in采取同步的做法, 即client这里同时只能有1个线程使用in, 那么如果这个object被unintended线程捕获了, intended线程该怎么接受object? server 只发送1次啊

If there are multiple threads that are concurrently reading from the same `ObjectInputStream` in the server, it can cause several problems:

1. Race conditions: Multiple threads may try to read from the stream at the same time, causing race conditions that can lead to <u>unpredictable behavior</u> or <u>corrupted data</u> . 
2. Deadlocks: If one thread is blocked on the `readObject()` method waiting for input from the stream, it can prevent other threads from reading from the stream, potentially leading to a deadlock.
3. Garbage collection issues: If multiple threads are accessing the same `ObjectInputStream` and the garbage collector runs, it may close the stream prematurely, causing errors or unexpected behavior.

To avoid these problems, it's generally recommended to use separate `ObjectInputStream` objects for each thread that needs to read from the input stream. This can be achieved by creating a new `ObjectInputStream` object for each socket connection in the client, and passing that object to a new thread for each operation that needs to read from the input stream.

Besides,  synchronize the access to Object stream also works, but with overhead if multiple threads are using the same stream frequently



Here's an example of how to create a new `ObjectInputStream` object for each socket connection in the client:

```java
// Client code
public class Client {
    private Socket socket;
    private ObjectOutputStream out;

    public Client(String host, int port) throws IOException {
        this.socket = new Socket(host, port);		// try to connect server
        this.out = new ObjectOutputStream(socket.getOutputStream());
    }

    public void start() throws IOException {
        // Create a new ObjectInputStream for this client connection
        ObjectInputStream in = new ObjectInputStream(socket.getInputStream());

        // Create a new thread to handle reading from the input stream
        Thread thread = new Thread(() -> {
            try {
                while (true) {
                    Object obj = in.readObject();
                    // Process the object received from the server
                    // ...
                }
            } catch (IOException | ClassNotFoundException e) {
                e.printStackTrace();
            }
        });
        thread.start();

        // Perform other operations in separate threads, each with its own ObjectInputStream
      	// send Person object to server
        Thread sendThread = new Thread(() -> {
            try {
                // Send a person object to the server
                Person person = new Person("John", 25);
                out.writeObject(person);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
        sendThread.start();
				
      
      	// receive book object from server
        Thread receiveThread = new Thread(() -> {
            try {
                // Receive a book object from the server every 20 seconds
                while (true) {
                    Thread.sleep(20000);
                    Book book = (Book) in.readObject();
                    // Process the book object received from the server
                    // ...
                }
            } catch (IOException | ClassNotFoundException | InterruptedException e) {
                e.printStackTrace();
            }
        });
        receiveThread.start();
    }

    public static void main(String[] args) throws IOException {
        Client client = new Client("localhost", 8080);
        client.start();
    }
}

```

In this example, we create a new `ObjectInputStream` object for each client connection in the `start()` method of the `Client` class, and pass it to a new thread that handles reading from the input stream. We also create separate threads for each operation that needs to read from the input stream, such as sending a person object to the server or receiving a book object every 20 seconds.

Each thread has its own `ObjectInputStream` object and can read from the input stream safely without interfering with other threads. This avoids race conditions, deadlocks, and garbage collection issues that can occur when multiple threads access the same `ObjectInputStream` object.