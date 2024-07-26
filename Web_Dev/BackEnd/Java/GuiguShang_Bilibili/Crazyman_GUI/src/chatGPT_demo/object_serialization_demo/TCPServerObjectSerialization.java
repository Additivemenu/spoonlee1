package chatGPT_demo.object_serialization_demo;

/**
 * @author xueshuo
 * @create 2023-03-31 9:28 pm
 */
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class TCPServerObjectSerialization {

    public static void main(String[] args) {
        int port = 5050;

        try {
            // step1.1 Create a server socket and bind it to the specified port
            ServerSocket serverSocket = new ServerSocket(port);

            System.out.println("Server started. Listening on port " + port);

            while (true) {
                Socket clientSocket = null;
                ObjectOutputStream out = null;
                ObjectInputStream in = null;

                try {
                    // step1.1 Accept incoming client connections
                    clientSocket = serverSocket.accept();
                    System.out.println("Client connected: " + clientSocket.getInetAddress());

                    // step 1.2 Set up input and output streams for the client socket
                    out = new ObjectOutputStream(clientSocket.getOutputStream());
                    in = new ObjectInputStream(clientSocket.getInputStream());

                    // step2:  通讯, 业务代码
                    // Read the request from the client
                    Word request = (Word) in.readObject();

                    // Process the request and generate a response
                    String response = "Server received word: " + request.getName() + "\nMeanings: " + request.getMeanings().toString();

                    // Send the response to the client
                    out.writeObject(response);

                } catch (IOException | ClassNotFoundException e) {
                    e.printStackTrace();
                } finally {
                    // step3:  Close the client connection
                    if (in != null) {
                        try {
                            in.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }

                    if (out != null) {
                        try {
                            out.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }

                    if (clientSocket != null) {
                        try {
                            clientSocket.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }


            }
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}

