package IO_Stream.serializable.chatGPT_demo;

/**
 * Server 与 Client之间通过 Message 格式来传递消息
 *
 * @author xueshuo
 * @create 2023-03-26 10:43 pm
 */
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;

public class Client {

    public static void main(String[] args) {
        String serverName = "localhost";
        int port = 12345;

        // step1.1
        try (Socket socket = new Socket(serverName, port)) {
            System.out.println("Connected to server " + serverName + " on port " + port);
            // step 1.3
            ObjectOutputStream objectOutputStream = new ObjectOutputStream(socket.getOutputStream());
            ObjectInputStream objectInputStream = new ObjectInputStream(socket.getInputStream());

            // step2
            Message messageToSend = new Message("Hello, Server!", "Client", "Server");
            objectOutputStream.writeObject(messageToSend);
            System.out.println("Sent: " + messageToSend);

            Message receivedMessage = (Message) objectInputStream.readObject();
            System.out.println("Received: " + receivedMessage);

            String receiveCotent = receivedMessage.getContent();
            System.out.println(receiveCotent);

            // step3
            socket.close();
        } catch (Exception e) {
            System.out.println("Client exception: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
