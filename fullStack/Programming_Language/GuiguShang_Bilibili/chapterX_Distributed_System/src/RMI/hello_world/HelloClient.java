package RMI.hello_world;

/**
 * @author xueshuo
 * @create 2023-04-24 10:16 am
 */
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class HelloClient {
    public static void main(String[] args) {
        try {
            Registry registry = LocateRegistry.getRegistry("localhost", 1099);
            Hello hello = (Hello) registry.lookup("Hello");

            System.out.println("RMI server response: " + hello.sayHello()); // call remote obj as if calling locally
        } catch (Exception e) {
            System.err.println("HelloClient exception:");
            e.printStackTrace();
        }
    }
}

