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

    @Override
    public void run() {
        try {
            InputStream input = clientSocket.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(input));

            OutputStream output = clientSocket.getOutputStream();
            PrintWriter writer = new PrintWriter(output, true);

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
                clientSocket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

