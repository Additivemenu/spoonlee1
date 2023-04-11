package test2;

/**
 * @author xueshuo
 * @create 2023-04-04 10:22 am
 */

import javax.swing.*;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.net.Socket;

public class Client {
    private static Socket socket;
    private static ObjectOutputStream out;

    public static void main(String[] args) {
        connectToServer();
        createAndShowGUI();
    }

    private static void connectToServer() {
        try {
            socket = new Socket("localhost", 5505);
            out = new ObjectOutputStream(socket.getOutputStream());
        } catch (IOException e) {
            e.printStackTrace();
            System.exit(1);
        }
    }

    private static void createAndShowGUI() {
        SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("Client");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.setSize(300, 200);

            JPanel panel = new JPanel();
            JTextField textField = new JTextField(10);
            JButton sendButton = new JButton("Send");

            sendButton.addActionListener(e -> {
                try {
                    sendWordRequest(textField.getText());
                } catch (IOException ex) {
                    ex.printStackTrace();
                }
            });

            panel.add(textField);
            panel.add(sendButton);
            frame.getContentPane().add(panel);

            frame.setVisible(true);
        });
    }

    private static void sendWordRequest(String word) throws IOException {
        WordRequest request = new WordRequest(word);
        out.writeObject(request);
        out.flush();
    }
}

