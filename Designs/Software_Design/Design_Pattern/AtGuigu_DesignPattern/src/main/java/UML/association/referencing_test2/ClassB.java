package UML.association.referencing_test2;

import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author xueshuo
 * @create 2023-04-04 8:04 am
 */
public class ClassB {
    private ConcurrentHashMap<String, ArrayList<String>> map;

    public ClassB(ConcurrentHashMap<String, ArrayList<String>> map) {
        this.map = map;
    }

    public ConcurrentHashMap<String, ArrayList<String>> getMap() {
        return map;
    }
}
