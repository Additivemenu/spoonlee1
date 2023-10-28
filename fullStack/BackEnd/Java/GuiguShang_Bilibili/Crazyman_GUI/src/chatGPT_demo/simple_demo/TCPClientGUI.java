package chatGPT_demo.simple_demo;

/**
 * @author xueshuo
 * @create 2023-03-31 9:09 pm
 */

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class TCPClientGUI {

    public static void main(String[] args) {
        // step1: 定义frame与内部组件 ---------------------------------------------------------------
        // Create and set up the main application frame
        JFrame frame = new JFrame("TCP Client");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(600, 400);

        // Create the UI components within the frame
        JTextField inputField = new JTextField(40);
        JTextArea responseArea = new JTextArea(10, 40);
        responseArea.setEditable(false);        // 不可编辑
        JButton sendButton = new JButton("Send");

        // Set up the panel and add components
        JPanel panel = new JPanel();
        panel.add(inputField);
        panel.add(sendButton);
        panel.add(responseArea);

        // Add the panel to the main frame
        frame.getContentPane().add(panel);

        // step2: 绑定监听起 Set up the send button action listener ----------------------------
        sendButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    // Create a socket and connect to the server
                    Socket socket = new Socket("127.0.0.1", 5050);

                    // Set up input and output streams for the socket
                    BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                    PrintWriter out = new PrintWriter(socket.getOutputStream(), true);

                    // Send the request to the server
                    String request = inputField.getText();
                    out.println(request);

                    // Receive the response from the server and display it
                    String response = in.readLine();
                    responseArea.setText(response);

                    // Close the connection
                    in.close();
                    out.close();
                    socket.close();
                } catch (Exception ex) {
                    responseArea.setText("Error: " + ex.getMessage());
                }
            }
        });

        // Display the main frame
        frame.setVisible(true);
    }
}
