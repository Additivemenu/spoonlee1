package RMI.hello_world;

/**
 * @author xueshuo
 * @create 2023-04-24 10:15 am
 */
import java.rmi.Remote;
import java.rmi.RemoteException;

public interface Hello extends Remote {
    String sayHello() throws RemoteException;
}

