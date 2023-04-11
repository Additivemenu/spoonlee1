package test2;

/**
 * @author xueshuo
 * @create 2023-04-04 10:22 am
 */
import java.io.IOException;
import java.io.ObjectInputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {
    public static void main(String[] args) {

        int clientIndex = 0;

        try (ServerSocket serverSocket = new ServerSocket(5505)) {
            while (true) {
                System.out.println("now waiting for next connection request from client" + (clientIndex++));
                Socket socket = serverSocket.accept();
                Thread clientThread = new Thread(() -> handleClient(socket));
                clientThread.start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void handleClient(Socket socket) {
        try (ObjectInputStream in = new ObjectInputStream(socket.getInputStream())) {
            while (true) {
                WordRequest request = (WordRequest) in.readObject();
                System.out.println(Thread.currentThread().getName() + "Received word: " + request.getWord());
            }
        } catch (IOException | ClassNotFoundException e) {
            System.out.println(Thread.currentThread().getName() + "Client disconnected or an error occurred.");
        } finally {
            try {
                socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

