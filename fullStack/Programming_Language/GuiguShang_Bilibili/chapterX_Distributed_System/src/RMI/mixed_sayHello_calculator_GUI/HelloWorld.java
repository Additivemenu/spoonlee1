package RMI.mixed_sayHello_calculator_GUI;

import java.rmi.Remote;
import java.rmi.RemoteException;

/**
 * @author xueshuo
 * @create 2023-04-24 7:59 pm
 */
public interface HelloWorld extends Remote {
    String sayHello() throws RemoteException;
}
