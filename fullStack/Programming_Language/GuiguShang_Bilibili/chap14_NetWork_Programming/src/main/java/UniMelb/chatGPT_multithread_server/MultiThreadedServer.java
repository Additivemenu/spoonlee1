package UniMelb.chatGPT_multithread_server;

/**
 * @author xueshuo
 * @create 2023-03-25 4:44 pm
 */
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class MultiThreadedServer {

    public static void main(String[] args) throws IOException {
        int port = 8080;
        // 共享数据放到 和 调用thread.start()方法同级别, 然后注入依赖 `new Thread(new ClientHandler(clientSocket, sharedData))`
        SharedData sharedData = new SharedData();

        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("Server is listening on port " + port);

            while (true) {
                Socket clientSocket = serverSocket.accept();    // waiting for next request
                System.out.println("New client connected: " + clientSocket.getInetAddress().getHostAddress());

                // 注入依赖, 虽然不同request对应的socket不同, 但注入的sharedData却是相同的 666
                Thread clientHandlerThread = new Thread(new ClientHandler(clientSocket, sharedData));
                clientHandlerThread.start();
            }
        }
    }
}

