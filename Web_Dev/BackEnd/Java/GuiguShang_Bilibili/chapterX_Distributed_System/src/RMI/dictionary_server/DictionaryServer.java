package RMI.dictionary_server;

/**
 * @author xueshuo
 * @create 2023-04-24 10:31 am
 */
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class DictionaryServer {
    public static void main(String[] args) {
        try {
            DictionaryImpl dictionary = new DictionaryImpl();

            Registry registry = LocateRegistry.createRegistry(5050);      // 方式1: 在server code里createRegistry
//            Registry registry = LocateRegistry.getRegistry();     // 方式2: 在commandline里先启动registry, 然后server getRegistry()

            registry.rebind("Dictionary", dictionary);

            System.out.println("DictionaryServer is ready.");
        } catch (Exception e) {
            System.err.println("DictionaryServer exception:");
            e.printStackTrace();
        }
    }
}

