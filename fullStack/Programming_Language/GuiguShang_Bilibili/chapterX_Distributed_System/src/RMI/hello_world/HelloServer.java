package RMI.hello_world;

/**
 * @author xueshuo
 * @create 2023-04-24 10:16 am
 */
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class HelloServer {
    public static void main(String[] args) {
        try {
            HelloImpl hello = new HelloImpl();
            Registry registry = LocateRegistry.createRegistry(1099);
            registry.rebind("Hello", hello);

            System.out.println("HelloServer is ready.");
        } catch (Exception e) {
            System.err.println("HelloServer exception:");
            e.printStackTrace();
        }
    }
}

