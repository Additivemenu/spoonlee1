package chatGPT_demo.object_serialization_demo;

/**
 * @author xueshuo
 * @create 2023-03-31 9:28 pm
 */

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;
import java.util.ArrayList;

public class TCPClientGUIObjectSerialization {

    public static void main(String[] args) {
        // step1: 定义frame及其内部组件 ----------------------------------------------
        // Create and set up the main application frame
        JFrame frame = new JFrame("TCP Client");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(600, 400);

        // Create the UI components
        JTextField inputField = new JTextField(40);
        JTextArea responseArea = new JTextArea(10, 40);
        responseArea.setEditable(false);
        JButton sendButton = new JButton("Send");

        // Set up the panel and add components
        JPanel panel = new JPanel();
        panel.add(new JLabel("add a new word"));
        panel.add(inputField);
        panel.add(sendButton);
        panel.add(responseArea);

        // Add the panel to the main frame
        frame.getContentPane().add(panel);

        // step2: 绑定监听器 ------------------------------------------------------
        // Set up the send button action listener
        sendButton.addActionListener(new ActionListener() {

            // 点击button, 触发下面事件:
            @Override
            public void actionPerformed(ActionEvent e) {

                Socket socket = null;
                ObjectOutputStream out = null;
                ObjectInputStream in = null;

                try {
                    // step1.1 Create a socket and connect to the server
                    socket = new Socket("127.0.0.1", 5050);

                    // step 1.2 Set up input and output streams for the socket
                    out = new ObjectOutputStream(socket.getOutputStream());
                    in = new ObjectInputStream(socket.getInputStream());

                    // step 2 通讯: 业务代码
                    // Send the request to the server
                    String name = inputField.getText();
                    ArrayList<String> meanings = new ArrayList<String>();
                    meanings.add("Meaning 1");
                    meanings.add("Meaning 2");
                    Word request = new Word(name, meanings);
                    out.writeObject(request);       // send to server

                    // Receive the response from the server and display it
                    String response = (String) in.readObject();     // object need toString()
                    responseArea.setText(response);

                } catch (Exception ex) {
                    responseArea.setText("Error: " + ex.getMessage());
                } finally {
                    // step3: close the connection, 确保不论try{} block中是否出现异常, resources都可以被关掉
                    if (in != null) {
                        try {
                            in.close();
                        } catch (IOException ex) {
                            ex.printStackTrace();
                        }
                    }

                    if (out != null) {
                        try {
                            out.close();
                        } catch (IOException ex) {
                            ex.printStackTrace();
                        }
                    }

                    if (socket != null) {
                        try {
                            socket.close();
                        } catch (IOException ex) {
                            ex.printStackTrace();
                        }
                    }
                }
            }
        });

        // Display the main frame
        frame.setVisible(true);

        // step3: 布局 -----------------------------------------------
    }
}

