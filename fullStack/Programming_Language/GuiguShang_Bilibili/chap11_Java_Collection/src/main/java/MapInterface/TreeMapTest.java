package MapInterface;

import org.testng.annotations.Test;

import java.util.*;

/**
 * @author xueshuo
 * @create 2023-01-23 2:59 pm
 */
public class TreeMapTest {

    // 向TreeMap中添加key-value, 要求key必须是由同一个类创建的对象 (Map自己没这个要求)
    // 因为要按照key进行排序: 自然排序， 定制排序

    // 自然排序
    @Test
    public void test1(){
        TreeMap map = new TreeMap();

        // 注意Person是sorted by name asc, age asc
        Person p1 = new Person("Tom", 23);
        Person p2 = new Person("Jerry", 32);
        Person p3 = new Person("Jack", 20);
        Person p4 = new Person("Rose", 18);

        map.put(p1, 98);
        map.put(p2, 89);
        map.put(p3, 76);
        map.put(p4, 100);

        // 方式1: entrySet()
        Set entrySet = map.entrySet();
        Iterator iterator1 = entrySet.iterator();
        while(iterator1.hasNext()){
            Object obj = iterator1.next();
            // entrySet集合中的元素都是entry
            Map.Entry entry = (Map.Entry) obj;
            System.out.println(entry.getKey() + "--->"+ entry.getValue());
        }
    }

    // 定制排序
    @Test
    public void test2(){
        TreeMap map = new TreeMap(new Comparator() {
            // 必须按照key来排序
            @Override
            public int compare(Object o1, Object o2) {
                if(o1 instanceof Person && o2 instanceof Person){
                    Person p1 = (Person) o1;
                    Person p2 = (Person) o2;
                    // 年龄由小到大
                    return Integer.compare(p1.getAge(), p2.getAge());
                }
                throw new RuntimeException("unmatched input data type!");

            }
        });

        // 注意Person是sorted by name asc, age asc
        Person p1 = new Person("Tom", 23);
        Person p2 = new Person("Jerry", 32);
        Person p3 = new Person("Jack", 20);
        Person p4 = new Person("Rose", 18);

        map.put(p1, 98);
        map.put(p2, 89);
        map.put(p3, 76);
        map.put(p4, 100);

        // 方式1: entrySet()
        Set entrySet = map.entrySet();
        Iterator iterator1 = entrySet.iterator();
        while(iterator1.hasNext()){
            Object obj = iterator1.next();
            // entrySet集合中的元素都是entry
            Map.Entry entry = (Map.Entry) obj;
            System.out.println(entry.getKey() + "--->"+ entry.getValue());
        }

    }


}
