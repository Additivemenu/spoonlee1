package UniMelb.chatGPT_multithread_server;

/**
 * @author xueshuo
 * @create 2023-03-25 4:45 pm
 */
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;

public class Client {
    public static void main(String[] args) {
        String host = "localhost";
        int port = 8080;

        try (Socket socket = new Socket(host, port)) {
            OutputStream output = socket.getOutputStream();
            PrintWriter writer = new PrintWriter(output, true);

            InputStreamReader input = new InputStreamReader(socket.getInputStream());
            BufferedReader reader = new BufferedReader(input);

            Scanner scanner = new Scanner(System.in);
            String userInput;

            while (true) {
                System.out.print("Enter command (increment, get, quit): ");
                userInput = scanner.nextLine().trim();
                writer.println(userInput);

                if (userInput.equalsIgnoreCase("quit")) {
                    break;
                }

                String serverResponse = reader.readLine();
                System.out.println("Server response: " + serverResponse);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

