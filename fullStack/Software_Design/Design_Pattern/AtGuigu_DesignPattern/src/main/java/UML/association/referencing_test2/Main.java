package UML.association.referencing_test2;

import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author xueshuo
 * @create 2023-04-04 8:05 am
 */
public class Main {
    public static void main(String[] args) {

        ConcurrentHashMap<String, ArrayList<String>> sharedMap = new ConcurrentHashMap<>();
        System.out.println("Memory address of object: " + Integer.toHexString(sharedMap.hashCode()));


        ClassA classA = new ClassA(sharedMap);
        ClassB classB = new ClassB(sharedMap);

        System.out.println(classA.getMap() == classB.getMap());
    }
}
