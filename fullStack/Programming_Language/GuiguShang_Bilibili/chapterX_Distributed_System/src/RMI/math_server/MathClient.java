package RMI.math_server;

import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

/**
 * @author xueshuo
 * @create 2023-04-24 10:10 am
 */
public class MathClient {
    public static void main(String[] args) {
        try{
//            if(System.getSecurityManager() == null){
//                System.setSecurityManager(new RMISecurityManager());
//            }
            Registry registry = LocateRegistry.getRegistry("localhost", 5050);
            IRemoteMath remoteMath = (IRemoteMath) registry.lookup("Compute");

            System.out.println("1.7 + 2.8 = " + remoteMath.add(1.7, 2.8));
            System.out.println("6.7 - 2.3 = " + remoteMath.subtract(6.7,2.3));

        }catch (Exception e){
            System.out.println(e);
        }
    }
}
