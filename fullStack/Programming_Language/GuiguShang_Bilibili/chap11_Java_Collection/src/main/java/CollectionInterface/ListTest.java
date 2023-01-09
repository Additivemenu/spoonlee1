package CollectionInterface;

import org.testng.annotations.Test;

/**
 *   Collection接口: 单列集合, 用来存储一个个的对象(int, boolean等基础类型不行)
 *          |--- List接口: 存储有序的(元素在集合中的前后顺序是有意义), 可重复的数据.  又名 --> 动态数组; List接口Java1.2出现
 *              |--- ArrayList: 作为List interface的主要实现类, 线程不安全的因而效率高; 底层使用Object[] elementData存储
 *              |--- LinkedList: 对于频繁的插入, 删除操作, 使用此类效率比ArrayList高 ; 底层使用双向链表存储; Java1.2才出现
 *              |--- Vector 作为List接口的古老实现类 Java1.0 就有了, 线程安全因而效率低;  底层使用Object[] elementData存储
 *
 *  面试题: ArrayList, LinkedList, Vector三者异同
 *  同:  三个类都实现了List interface, 存储数据的特点相同: 存储有序的, 可重复的数据
 *  异:  见上面
 *
 * @author xueshuo
 * @create 2023-01-08 10:59 am
 */
public class ListTest {
    /**
     * 526
     */
    @Test
    public void test1(){

    }


}
