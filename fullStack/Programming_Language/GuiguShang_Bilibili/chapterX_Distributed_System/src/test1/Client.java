package test1; /**
 * @author xueshuo
 * @create 2023-04-04 10:08 am
 */

import javax.swing.*;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.net.Socket;

public class Client {
    public static void main(String[] args) {
        createAndShowGUI();
    }

    private static void createAndShowGUI() {
        SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("test1.Client");
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

        // 属于是每点击一次就建立一次连接, 发送request
        try (Socket socket = new Socket("localhost", 12345);
             ObjectOutputStream out = new ObjectOutputStream(socket.getOutputStream())) {
            WordRequest request = new WordRequest(word);
            out.writeObject(request);
        }
    }
}

