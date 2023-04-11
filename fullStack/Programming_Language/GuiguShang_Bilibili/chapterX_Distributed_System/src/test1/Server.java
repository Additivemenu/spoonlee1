package test1; /**
 * @author xueshuo
 * @create 2023-04-04 10:07 am
 */

import javax.swing.*;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.atomic.AtomicBoolean;

public class Server {
    private static AtomicBoolean continueProcessing = new AtomicBoolean(true);

    public static void main(String[] args) {
        createAndShowGUI();

        try (ServerSocket serverSocket = new ServerSocket(12345)) {
            while (true) {
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
            while (continueProcessing.get()) {
                WordRequest request = (WordRequest) in.readObject();
                System.out.println("Received word: " + request.getWord());
            }
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("test1.Client disconnected or an error occurred.");
        } finally {
            try {
                socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private static void createAndShowGUI() {
        SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("test1.Server");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.setSize(300, 200);

            JButton stopButton = new JButton("Stop Processing");
            stopButton.addActionListener(e -> continueProcessing.set(false));
            frame.getContentPane().add(stopButton);

            frame.setVisible(true);
        });
    }
}

