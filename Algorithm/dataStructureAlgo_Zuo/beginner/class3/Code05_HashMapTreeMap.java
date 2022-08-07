import java.util.*;

public class Code05_HashMapTreeMap {

    //（K V）database
    // hashmap最牛的地方在于, 不管存了多少记录, 增删查改的时间复杂度都是O(1), 但这个常数操作所需的实际时间比较大
    
    public static void main(String[] args)
    {   
        // hashmap basic operation---------------------------------------------------------------------
        HashMap<String, String> map = new HashMap<>(); // (Key, Value)
        map.put("xueshuo", "学硕");
        System.out.println(map.containsKey("xueshuo")); // true
        System.out.println(map.containsKey("xue")); // false
        System.out.println(map.get("xueshuo")); //学硕

        map.put("xueshuo", "我是学硕"); // map.put()既是加入操作也是更新操作
        System.out.println(map.get("xueshuo")); //学硕

        // map.remove("xueshuo");
        // System.out.println(map.containsKey("xueshuo")); // false
        // System.out.println(map.get("xueshuo")); // null


        // hash map  源生类key 按值传递------------------------------------------------------------------------
        String test1 = "xueshuo";
        String test2 = "xueshuo"; // test1 & test2 have different address
        System.out.println(map.containsKey(test1)); // true, .containsKey check value not address, 按值传递
        System.out.println(map.containsKey(test2)); // true, .containsKey check value not address, 按值传递

        // another e.g.
        HashMap<Integer, String> map2 = new HashMap<>(); // (Key, Value)
        map2.put(1234567,"I am 1234567");

        Integer a = 1234567;
        Integer b = 1234567; // a & b have the same value but different address

        System.out.println(a == b); // false, as == compares address
        System.out.println(a.equals(b)); // true, .equals compares value
        System.out.println("map2 containsKey a: " + map2.containsKey(a)); // true, .containsKey check value not address, 按值传递
        System.out.println("map2 containsKey b: " +map2.containsKey(b)); // true, .containsKey check value not address,按值传递


        // hash map  非源生类key 按引用传递---------------------------------------------------------------------
        Node node1 = new Node(1);
        Node node2 = new Node(1); // node1 and node2 have the same value, but different address
        HashMap<Node, String> map3 = new HashMap<>(); // (Key, Value)
        map3.put(node1, "我进来了!");
        System.out.println("map3 containsKey node1: " + map3.containsKey(node1)); // true, here check address not value, 按引用传递
        System.out.println("map3 containsKey node2: " + map3.containsKey(node2)); // false, here check address not value, 按引用传递


        System.out.println("======================");

        // treemap==========================================================================
        // 比hashmap功能强的地方在于其内部对于key排序了, 这点也要求key必须是可以排序的(Java源生类会定义好怎么排序, 自定义类的话如果想用treemap也得定义好怎么排序)
        // 但是增删查改的时间复杂度为O(logN), 这点不如hashmap
        TreeMap<Integer, String> treeMap1 = new TreeMap<>();
        
        treeMap1.put(3, "我是3");
        treeMap1.put(0, "我是3");
        treeMap1.put(7, "我是3");
        treeMap1.put(2, "我是3");
        treeMap1.put(5, "我是3");
        treeMap1.put(9, "我是3");

        System.out.println(treeMap1.containsKey(7)); // true
        System.out.println(treeMap1.containsKey(6)); // false
        System.out.println(treeMap1.get(3)); // 我是3

        treeMap1.put(3, "他是3");
        System.out.println(treeMap1.get(3));

        treeMap1.remove(3, "他是3"); // 他是3
        System.out.println(treeMap1.get(3)); // null

        // treeMap内部对key排序
        System.out.println(treeMap1.firstKey()); // 0
        System.out.println(treeMap1.lastKey()); // 9
        
        System.out.println(treeMap1.floorKey(5)); // <=5, 离5最近的key告诉我
        System.out.println(treeMap1.floorKey(6)); // <=5, 离6最近的key告诉我

        System.out.println(treeMap1.ceilingKey(5)); // >=5, 离5最近的key告诉我
        System.out.println(treeMap1.ceilingKey(6)); // >=6, 离5最近的key告诉我


        // report error as not define how to sort key
        Node node3 = new Node(3);
        Node node4 = new Node(4);

        TreeMap<Node, String> treeMap2 = new TreeMap<>();
        treeMap2.put(node3, "我是node3");
        treeMap2.put(node4, "我是node4");

    }


    public static class Node{
        public int value;

        public Node(int v){
            value = v;
        }
    }
}
