package RMI.math_server;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

/**
 * @author xueshuo
 * @create 2023-04-24 10:01 am
 */
public class RemoteMathServant extends UnicastRemoteObject implements  IRemoteMath {
    public RemoteMathServant() throws RemoteException {
        super();
    }

    @Override
    public double add(double i, double j) throws RemoteException {
        return (i+j);
    }

    @Override
    public double subtract(double i, double j) throws RemoteException {
        return (i-j);
    }
}
