package RMI.math_server;

import java.rmi.Remote;
import java.rmi.RemoteException;

/**
 * @author xueshuo
 * @create 2023-04-24 10:00 am
 */
public interface IRemoteMath extends Remote {
    double add(double i, double j) throws RemoteException;
    double subtract(double i, double j) throws RemoteException;

}
