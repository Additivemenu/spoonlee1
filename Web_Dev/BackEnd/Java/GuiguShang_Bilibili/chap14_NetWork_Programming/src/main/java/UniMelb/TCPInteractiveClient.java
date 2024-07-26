package UniMelb;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Scanner;

/**
 * UniMelb DS wk3 tut demo
 */
public class TCPInteractiveClient {


	public static void main(String[] args) 
	{

		Socket socket = null;
		try 
		{
			// step1.1: Create a stream socket bounded to any port and connect it to the
			// socket bound to localhost on port 4444
			socket = new Socket("localhost", 4444);
			System.out.println("Connection established");

			// step1.2: Get the input/output streams for reading/writing data from/to the socket
			BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream(), "UTF-8"));
			BufferedWriter out = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream(), "UTF-8"));

			// step2: communicate
			Scanner scanner = new Scanner(System.in);		// 注意这个流 和 socket用来和外界通讯的流没关系
			String inputStr = null;

			//While the user input differs from "exit"
			while (!(inputStr = scanner.nextLine()).equalsIgnoreCase("exit")) 
			{
				
				// Send the input string to the server by writing to the socket output stream
				out.write(inputStr + "\n");
				out.flush();
				System.out.println("Message sent");
				
				// Receive the reply from the server by reading from the socket input stream
				String received = in.readLine(); // This method blocks until there  is something to read from the
													// input stream
				System.out.println("Message received: " + received);
			}
			
			scanner.close();
			
		} 
		catch (UnknownHostException e)
		{
			e.printStackTrace();
		}
		catch (IOException e)
		{
			e.printStackTrace();
		} 
		finally
		{
			// step3: Close resources
			if (socket != null)
			{
				try
				{
					socket.close();
				}
				catch (IOException e) 
				{
					e.printStackTrace();
				}
			}
		}

	}

}
