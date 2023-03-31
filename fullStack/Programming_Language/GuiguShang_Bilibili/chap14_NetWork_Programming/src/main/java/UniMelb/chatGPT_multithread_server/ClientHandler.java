package UniMelb.chatGPT_multithread_server;

/**
 * @author xueshuo
 * @create 2023-03-25 4:44 pm
 */
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.Socket;

public class ClientHandler implements Runnable {
    private final Socket clientSocket;
    private final SharedData sharedData;

    public ClientHandler(Socket clientSocket, SharedData sharedData) {
        this.clientSocket = clientSocket;
        this.sharedData = sharedData;
    }


    // 一次网络通讯中, 不同线程执行的部分放到run()里, 其他的放到application的entry: main()里
    @Override
    public void run() {
        try {
            // step1.3
            InputStream input = clientSocket.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(input));

            OutputStream output = clientSocket.getOutputStream();
            PrintWriter writer = new PrintWriter(output, true);

            // step2: 通讯 (业务代码所在)
            String request;
            while ((request = reader.readLine()) != null) {
                System.out.println("Received message: " + request);

                if (request.equalsIgnoreCase("increment")) {
                    sharedData.increment();
                    writer.println("Server response: Shared data incremented to " + sharedData.getValue());
                } else if (request.equalsIgnoreCase("get")) {
                    writer.println("Server response: Shared data value is " + sharedData.getValue());
                } else if (request.equalsIgnoreCase("quit")) {
                    break;
                } else {
                    writer.println("Server response: Unrecognized command");
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                // step3: close resources
                clientSocket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

