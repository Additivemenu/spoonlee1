package RMI.hello_world;

/**
 * @author xueshuo
 * @create 2023-04-24 10:15 am
 */
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

public class HelloImpl extends UnicastRemoteObject implements Hello {
    public HelloImpl() throws RemoteException {
        super();
    }

    public String sayHello() {
        return "Hello, world!";
    }
}

