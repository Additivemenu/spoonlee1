package RMI.mixed_sayHello_calculator_GUI;

import java.rmi.Remote;
import java.rmi.RemoteException;

/**
 * @author xueshuo
 * @create 2023-04-24 8:00 pm
 */
public interface Calculator extends Remote {
    double add(double a, double b) throws RemoteException;
    double subtract(double a, double b) throws RemoteException;
    double multiply(double a, double b) throws RemoteException;
    double divide(double a, double b) throws RemoteException;
}
