package MapInterface;

import org.testng.annotations.Test;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * P546:
 * 一: Map的实现类的结构:
 *  |--- Map接口: 存储双列数据, 用于存储具有key-value pair的数据, --- 类似于高中的函数y=f(x); Java1.2才有
 *       |--- HashMap: 作为Map的主要实现类, Java1.2才有, 线程不安(Collections类可以解决这个问题)但效率高; 可以存储null的key和value
 *             |--- LinkedHashMap: Java1.4才有; 保证在遍历map元素时, 可以按照添加的顺序实现遍历
 *                                              原因: 在原有的HashMap底层结构的基础上, 添加了一对指针, 指向前一个和后一个元素
 *                                              对于频繁的遍历操作, 此类执行效率高于HashMap
 *       |--- TreeMap: Java1.2才有; 保证按照添加的key-value pair进行排序, 实现排序遍历, 此时考虑key的自然排序或者定制排序
 *                      底层使用的是红黑树
 *       |--- Hashtable: 古老的实现类, Java1.0就有了, 线程安全但效率低; 不能存储null的key和value
 *             |--- Properties: 常用来处理配置文件. Key和Value都是String类型的
 *
 *      HashMap的底层: 数组 + 链表 (jdk7)
 *                数组 + 链表 + 红黑树 (jdk8)
 *
 *      面试题:
 *      1. HashMap底层原理 (高频)
 *      2. HashMap 和 Hashtable的异同 (相对低频)
 *      3. CurrentHashMap 与 HashMap的异同 (多线程相关, 暂时不讲)
 *
 * 二: Map
 *     Map中的key: 无序, 不可重复, 使用Set来存储所有的key       ---> key所在的类需要重写equals(), hashCode() (这里以HashMap为例, 若是TreeMap则需要重写compareTO() Compare() )
 *     Map中的value: 无序, 可重复, 使用Collection存储所有的value  ---> value所在的类需要重写equals()
 *     一个key-value pair构成一个Entry对 象
 *     Map中的entry: 无序的, 不可重复的, 使用Set存储所有的entry
 *
 *  三: HashMap底层实现原理, 以jdk7为例 (P548,549)
 *      HashMap map = new HashMap();
 *      底层在实例化后, 创建了一个长度为16的数组Entry[] table
 *      ...可能已执行多次put
 *      map.put(key1, value1):
 *      首先, 调用key1所在类的hashCode()方法计算key1的hashCode, 再通过算法把这个hashCode转化为Entry在数组中的位置
 *          如果此位置上数据为空, 此时entry添加成功         ---> 添加成功情况1
 *          如果此位置上数据不为空 (此位置上存在一个或多个数据(链表形式)), 比较key1和当前位置上数据的hashCode
 *                  如果key1的hashCode与已经存在的数据都不同, 此时entry添加成功         ---> 添加成功情况2
 *                  如果key1的hashCode与某个已经存在的数据(key2-value2)的相同, 调用key1所在类的equals()
 *                             如果equals()返回true, 则使用value1替换key2的value2值. 这点和HashSet不同
 *                             如果equals()返回false, entry添加成功                  ---> 添加成功情况3
 *
 *      补充: 关于情况2和3: 此时key1-value1和已经存在的数据使用链表形式存储
 *
 *      在不断的添加过程中, 会涉及到扩容问题: 当当前Map中已有entry个数超过threshold(且此次put进来的entry要放置的位置非空)时扩容.
 *      默认扩容方式: 扩容为原来容量的2倍, 并将原有的数据复制过来
 *      ------------------------------------
 *      在JDK8中, 相较于JDK7的不同:
 *      1. new HashMap(): 底层还没有创建一个长度为16的数组
 *      2. JDK8底层的数组是: Node[], 而非Entry[]  改了名字而已本质一样
 *      3. 首次调用put()时, 底层才会创建长度为16的Node[]
 *      4. JDK7底层结构只有: 数组 + 连标,
 *         JDK8中底层结构: 数组 + 链表 + 红黑树
 *              当数组某个索引位置上的元素以链表形式存在的数据个数 > 8, 且当前数组长度 > 64,
 *              此索引位置上的所有数据改为用红黑树存储(O(n) --> O(logn))
 *
 *  四. LinkedHashMap的底层实现(了解即可)
 *      LinkedHashMap中重写了putVal()中的newNode()
 *      源码中:
 *      static class Entry<K,V> extends HashMap.Node<K,V> {
 *              Entry<K,V> before, after;           // 能够记录添加数据的顺序
 *              Entry(int hash, K key, V value, Node<K,V> next) {
 *              super(hash, key, value, next);
 *              }
 *      }
 *
 *  五: Map中的常用方法
 *      增删改查, 元视图操作
 *
 *
 *
 * @author xueshuo
 * @create 2023-01-20 11:57 am
 */
public class MapTest {

    /**
     * P554
     * **元视图操作的方法:**
     *
     * + Set keySet():返回所有key构成的Set集合
     * + Collection values():返回所有value构成的Collection集合
     * + Set entrySet():返回所有key-value对构成的Set集合
     */
    @Test
    public void test5(){
        // Iterator只能用于Collection



    }


    /**
     * P553
     * **元素查询:**
     *+ Object get(Object key):获取指定key对应的value
     * + boolean containsKey(Object key):是否包含指定的key
     * + boolean containsValue(Object value):是否包含指定的value
     * + int size():返回map中key-value对的个数
     * + boolean isEmpty():判断当前map是否为空
     * + boolean equals(Object obj):判断当前map和参数对象obj是否相等
     */
    @Test
    public void test4(){
        Map map = new HashMap();
        map.put("AA", 123);
        map.put(45, 123);
        map.put("BB", 123);

        // Object get(Object key):获取指定key对应的value
        System.out.println(map.get(45));

        // boolean containsKey(Object key):是否包含指定的key
        boolean isExist = map.containsKey("BB");
        System.out.println(isExist);            // true

        // boolean containsValue(Object value):是否包含指定的value
        boolean b = map.containsValue(123);     // 如果有多个value, 只要找到一个就停止
        System.out.println(b);          // true

        // size()
        // isEmpty()
        map.clear();
        System.out.println(map.size());         // 0
        System.out.println(map.isEmpty());      // true

        // boolean equals(Object obj):判断当前map和参数对象obj是否相等. 要想是true, 必须每一个entry的内容都想等


    }


    /**
     * **增删改:**
     *
     * + Object put(Object key,Object value):将指定key-value添加到(或修改)当前map对象中  void putAll(Map m):将m中的所有key-value对存放到当前map中
     * + Object remove(Object key):移除指定key的key-value对，并返回value
     * + void clear():清空当前map中的所有数据
     */
    @Test
    public void test3(){
        Map map = new HashMap();
        // put() ----------------------------
        // 一般我们工作中key要求类型一致, 这里我们就不做规范了
        // 添加
        map.put("AA", 123);
        map.put(45, 123);
        map.put("BB", 123);
        // 修改
        map.put("AA", 87);

        System.out.println(map);

        // putAll(Map map)---------------------------
        Map map1 = new HashMap();
        map1.put("CC", 123);
        map1.put("DD", 123);

        map.putAll(map1);
        System.out.println(map);

        // remove(Object key) 从map移除指定key对应的entry, 返回key对应的value--------------------------
        Object ccValue = map.remove("CC");
        System.out.println(ccValue);
        System.out.println(map);

        // clear() 清空map底层数组中的数据, map 还在----------------------------------
        map.clear();        // 与map = null不同
        System.out.println(map.size());     // 0
        System.out.println(map);            // {}

    }


    @Test
    public void test2(){
        Map map = new HashMap();
        map.put(123, "AA");
        map.put(345, "BB");
        map.put(12, "CC");

        System.out.println(map);        // 不按添加的顺序

        Map map1 = new LinkedHashMap();
        map1.put(123, "AA");
        map1.put(345, "BB");
        map1.put(12, "CC");

        System.out.println(map1);       // 按添加的顺序

    }

    @Test
    public void test1(){
        Map map = new HashMap();
        map.put(null, null);
    }






}
