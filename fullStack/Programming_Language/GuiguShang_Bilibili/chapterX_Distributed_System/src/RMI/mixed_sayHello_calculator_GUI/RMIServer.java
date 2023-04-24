package RMI.mixed_sayHello_calculator_GUI;

/**
 * @author xueshuo
 * @create 2023-04-24 8:01 pm
 */
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class RMIServer {
    public static void main(String[] args) {
        try {
            HelloWorld helloWorld = new HelloWorldImpl();
            Calculator calculator = new CalculatorImpl();

            Registry registry = LocateRegistry.createRegistry(1099);
            registry.rebind("HelloWorld", helloWorld);
            registry.rebind("Calculator", calculator);

            System.out.println("RMI Server is running.");
        } catch (Exception e) {
            System.err.println("Server exception: " + e.toString());
            e.printStackTrace();
        }
    }
}

