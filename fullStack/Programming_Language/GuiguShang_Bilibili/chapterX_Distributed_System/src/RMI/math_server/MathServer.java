package RMI.math_server;

import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

/**
 * @author xueshuo
 * @create 2023-04-24 10:07 am
 */
public class MathServer {
    public static void main(String[] args) {
//        System.setSecurityManager(new RMISecurityManager());
        try{
            IRemoteMath remoteMath = new RemoteMathServant();
//            Registry registry = LocateRegistry.getRegistry();
            Registry registry = LocateRegistry.createRegistry(5050);

            registry.bind("Compute", remoteMath);
            System.out.println("Math server ready");
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
