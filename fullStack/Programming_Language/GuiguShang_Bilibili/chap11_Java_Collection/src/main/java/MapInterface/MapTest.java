package MapInterface;

import org.testng.annotations.Test;

import java.util.HashMap;
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
 *     一个key-value pair构成一个Entry对象
 *     Map中的entry: 无序的, 不可重复的, 使用Set存储所有的entry
 *
 *
 * @author xueshuo
 * @create 2023-01-20 11:57 am
 */
public class MapTest {

    @Test
    public void test1(){
        Map map = new HashMap();
        map.put(null, null);
    }




}
