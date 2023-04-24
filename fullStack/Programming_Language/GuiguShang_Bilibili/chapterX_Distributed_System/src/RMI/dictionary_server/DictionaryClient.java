package RMI.dictionary_server;

/**
 * @author xueshuo
 * @create 2023-04-24 10:32 am
 * does RMI also encapsulate multi-thread?
 * <p>
 * chatGPT: Yes, RMI (Remote Method Invocation) inherently supports multi-threading.
 * When multiple clients make simultaneous calls to the RMI server, RMI creates
 * separate threads for each incoming request. This allows multiple clients to
 * interact with the server concurrently, and the server can process these requests in parallel.
 * <p>
 * In the dictionary server example, we switched from using a HashMap to a ConcurrentHashMap,
 * which ensures that the dictionary can be safely accessed and modified by multiple threads
 * simultaneously without the need for explicit synchronization. Thanks to this change, the
 * dictionary server can handle concurrent requests from multiple clients without any issues.
 * <p>
 * However, if you were using a data structure that wasn't thread-safe, you'd need to add
 * explicit synchronization to ensure the correct behavior when accessed concurrently. In
 * such cases, you could use the synchronized keyword or more advanced synchronization constructs
 * like Lock and ReadWriteLock
 */

import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.Scanner;

public class DictionaryClient {
    public static void main(String[] args) {
        try {
            Registry registry = LocateRegistry.getRegistry("127.0.0.1", 1099);
            Dictionary dictionary = (Dictionary) registry.lookup("Dictionary");

            Scanner scanner = new Scanner(System.in);
            String command;

            System.out.println("Commands: ADD | GET | LIST | EXIT");

            while (true) {
                System.out.print("> ");
                command = scanner.nextLine().trim().toUpperCase();

                if (command.equals("ADD")) {
                    System.out.print("Word: ");
                    String word = scanner.nextLine().trim();
                    System.out.print("Meaning: ");
                    String meaning = scanner.nextLine().trim();

                    dictionary.addWord(word, meaning);      // invoke remote object's method as if locally
                    System.out.println("Word added successfully.");
                } else if (command.equals("GET")) {
                    System.out.print("Word: ");
                    String word = scanner.nextLine().trim();
                    String meaning = dictionary.getMeaning(word); // invoke remote object's method as if locally
                    System.out.println("Meaning: " + meaning);
                } else if (command.equals("LIST")) {
                    System.out.println("Words in the dictionary:");
                    dictionary.getWords().forEach((word, meaning) -> System.out.println(word + ": " + meaning));  // invoke remote object's method as if locally
                } else if (command.equals("EXIT")) {
                    break;
                } else {
                    System.out.println("Invalid command. Please try again.");
                }
            }
            scanner.close();
        } catch (Exception e) {
            System.err.println("DictionaryClient exception:");
            e.printStackTrace();
        }
    }
}

