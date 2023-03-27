package IO_Stream.serializable.chatGPT_demo;

/**
 * @author xueshuo
 * @create 2023-03-26 10:43 pm
 */
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {

    public static void main(String[] args) {
        int port = 12345;

        // step1.1
        // this uses try-with-resources block (introduced in Java7),
        // refer to GPT for the code using try-catch-finally block (before Java7)
        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("Server is listening on port " + port);

            // loop server
            while (true) {
                // step1.2
                Socket socket = serverSocket.accept();
                System.out.println("New client connected");
                // step1.3
                ObjectInputStream objectInputStream = new ObjectInputStream(socket.getInputStream());
                ObjectOutputStream objectOutputStream = new ObjectOutputStream(socket.getOutputStream());

                // step2
                Message receivedMessage = (Message) objectInputStream.readObject();
                System.out.println("Received: " + receivedMessage);

                Message responseMessage = new Message("Message received.", "Server", receivedMessage.getSender());
                objectOutputStream.writeObject(responseMessage);

                // step3
                socket.close();
            }
        } catch (Exception e) {
            System.out.println("Server exception: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
