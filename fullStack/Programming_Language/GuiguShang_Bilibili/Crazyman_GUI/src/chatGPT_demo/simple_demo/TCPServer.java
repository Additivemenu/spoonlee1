package chatGPT_demo.simple_demo;

/**
 * @author xueshuo
 * @create 2023-03-31 9:10 pm
 */
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class TCPServer {

    public static void main(String[] args) {
        int port = 5050;

        try {
            // Create a server socket and bind it to the specified port
            ServerSocket serverSocket = new ServerSocket(port);

            System.out.println("Server started. Listening on port " + port);

            while (true) {
                // Accept incoming client connections
                Socket clientSocket = serverSocket.accept();
                System.out.println("Client connected: " + clientSocket.getInetAddress());

                // Set up input and output streams for the client socket
                BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);

                // Read the request from the client
                String request = in.readLine();

                // Process the request and generate a response
                String response = "Server received: " + request;

                // Send the response to the client
                out.println(response);

                // Close the client connection
                in.close();
                out.close();
                clientSocket.close();
            }
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}
