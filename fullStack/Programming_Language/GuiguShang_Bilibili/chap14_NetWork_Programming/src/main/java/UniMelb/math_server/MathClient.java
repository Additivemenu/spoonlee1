package UniMelb.math_server;

/**
 * @author xueshuo
 * @create 2023-03-22 3:50 pm
 */
// MathClient.java: A test client program to access MathServer.
import java.io.*;
import java.net.Socket;
public class MathClient {
    public static void main(String [] args){
        String hostname = "localhost";
        int port = 10000;

        if (args.length != 2) {
            System.out.println("Use the default setting...");
        }
        else {
            hostname = args[0];
            port = Integer.parseInt(args[1]);
        }
        try {
            // step1 allocate resources for connection
            // 1.1 create a socket
            Socket socket = new Socket(hostname, port);

            // query: perform a simple math operation “12-3”
            // 1.2 stream
            BufferedWriter writer = new BufferedWriter(
                    new OutputStreamWriter(socket.getOutputStream()));
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(socket.getInputStream()));

            // step2 communicate via stream (业务代码所在)
            writer.write("-:12:2");
            writer.newLine();
            writer.flush();

            // get the result from the server
            System.out.println(reader.readLine());

            // step3 close resources
            reader.close();
            writer.close();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}

