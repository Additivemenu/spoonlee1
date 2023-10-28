package RMI.mixed_sayHello_calculator_GUI;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

/**
 * @author xueshuo
 * @create 2023-04-24 8:01 pm
 */
public class CalculatorImpl extends UnicastRemoteObject implements Calculator {
    public CalculatorImpl() throws RemoteException {
        super();
    }

    @Override
    public double add(double a, double b) throws RemoteException {
        return a + b;
    }

    @Override
    public double subtract(double a, double b) throws RemoteException {
        return a - b;
    }

    @Override
    public double multiply(double a, double b) throws RemoteException {
        return a * b;
    }

    @Override
    public double divide(double a, double b) throws RemoteException {
        if (b == 0) {
            throw new RemoteException("Division by zero is not allowed.");
        }
        return a / b;
    }
}
