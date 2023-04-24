package RMI.mixed_sayHello_calculator_GUI;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

/**
 * @author xueshuo
 * @create 2023-04-24 8:00 pm
 */
public class HelloWorldImpl extends UnicastRemoteObject implements HelloWorld {
    public HelloWorldImpl() throws RemoteException {
        super();
    }

    @Override
    public String sayHello() throws RemoteException {
        return "Hello World!";
    }
}
