package UniMelb.math_server;

/**
 * 14.8 DS text book http://www.buyya.com/java/Chapter14.pdf
 * 1. 这个例子里其实是不含有共享数据的! 因此相对简单. A1中涉及到共享数据了, 要确保注入多个Thread()的是同一个Server对象
 *
 * textbook上的解释与评论:
 * As can be seen from the program, the run method just invokes the execute method from the base MathServer class.
 * The main method of the MultiThreadMathServer has a infinite while loop when a client request comes, it creates a
 * new instance of the MultiThreadMathServer class and starts it as a separate thread.
 *
 * There is no need to change the client code as the multithreaded version of the Math service is totally transparent to the client. The purpose
 * of implementing a multithreaded math server is to enable concurrent client connections, which means it now can
 * support multiple clients at the same time compared with the single thread version.
 *
 * One more thing that needs to be mentioned is that every client socket has been explicitly set at a 1 4-seconds
 * timeout in order to release critical resources if it is waiting for too long.
 *
 * 其实我感觉也可直接在原来MathServer基础上让它implements Runnable, 再提供个run()实现也可以
 *
 * @author xueshuo
 * @create 2023-03-25 2:36 pm
 */
/* MultiThreadMathServer.java: A program extending MathServer which
allows concurrent client requests and opens a new thread for each socket
connection. */
import java.net.ServerSocket;
import java.net.Socket;
public class MultiThreadMathServer extends MathServer implements Runnable {

    public void run() {

        // 假设sever 需要3s 计算一个request
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        execute();
    }

    public static void main(String [] args)throws Exception {
        // 加载基本配置
        int port = 10000;

        if (args.length == 1) {
            try {
                port = Integer.parseInt(args[0]);
            }
            catch(Exception e) {
            } }

        // step 1.1 建立 socket
        ServerSocket serverSocket = new ServerSocket(port);

        int request_id = 0;

        // my doing: 想确保多个Thread被注入的是同一个server对象 ----> 但这样会导致上一个request还没执行完, 下一
        // 个while loop中接收到了新的request 又重置了server的socket属性, 影响上一个request
        MultiThreadMathServer server = new MultiThreadMathServer();
        server.setMathService(new PlainMathService());      // inject dependency

        while(true){
            // step 1.1 建立socket
            // waiting for client connection
            System.out.println("server waiting for next request, current request id: "+ request_id);

            Socket socket = serverSocket.accept();    // 在这里等待, 有request了才会继续执行
            socket.setSoTimeout(14000);     // 但不会等待太久

            // thread per request
//            MultiThreadMathServer server = new MultiThreadMathServer();
//            server.setMathService(new PlainMathService());      // inject dependency
            server.setSocket(socket);           // inject dependency

            // start a new server thread...
            new Thread(server).start();         // step 1.2, step2, step3

            request_id += 1;
            System.out.println("a new thread with id ="+request_id+", has started");
        }
    }
}