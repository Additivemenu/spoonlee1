package CollectionInterface;

import org.testng.annotations.Test;

/**
 *  1. Collection接口: 单列集合, 用来存储一个个的对象(int, boolean等基础类型不行)
 *          |--- List接口: 存储有序的(元素在集合中的前后顺序是有意义), 可重复的数据.  又名 --> 动态数组; List接口Java1.2出现
 *              |--- ArrayList: 作为List interface的主要实现类, 线程不安全的因而效率高; 底层使用Object[] elementData存储
 *              |--- LinkedList: 对于频繁的插入, 删除操作, 使用此类效率比ArrayList高 ; 底层使用双向链表存储; Java1.2才出现
 *              |--- Vector 作为List接口的古老实现类 Java1.0 就有了, 线程安全因而效率低;  底层使用Object[] elementData存储
 *
 *
 *  2. ArrayList的源码分析 527:
 *     2.1 jdk7的情况下
 *      ArrayList list = new ArrayList();   // 底层创建了长度为10的Object[] elementData
 *      list.add(123);                      // elementData[0] = new Interger(123);
 *      ...
 *      list.add(11);                       // 如果此次的add, 导滞elementData[0]的容量不够, 则扩容
 *      默认情况下, 扩容为原来的容量的1.5倍， 同时需要将原有的数组中的数据复制到新的数组中.
 *
 *      结论: 建议开发中去使用带参数的constructor: ArrayList list = new ArrayList(int capacity)
 *
 *      2.2 jdk8中的ArrayList的变化
 *       ArrayList list = new ArrayList();  //底层Object[] elementData初始化为{}, 而不是一个长度为10的Object[]
 *       list.add(123);                     // 第一次调用add()时, 底层才创建了长度为10的数组, 并将数据123添加到elementData中
 *       ...
 *       后续的添加与扩容操作与jdk7无异
 *
 *      2.3 小结:
 *         jdk7中的ArrayList的对象的创建类似于单例的饿汉式
 *         jdk8中的ArrayList的对象创建类似于单例的懒汉式, 延迟了数组的创建, 节省内存
 *
 *
 *  3. LinkedList源码分析 528:
 *          LinkedList list = new LinkedList();   内部声明了Node类型的first和last属性, 默认值为null
 *          lst.add(123);           // 将123封装到Node中, 创建了Node对象
 *
 *          其中Node定义为: 体现了LinkedList本质是双向链表
    *       private static class Node<E> {
    *         E item;
    *         Node<E> next;
    *         Node<E> prev;
    *
    *         Node(Node<E> prev, E element, Node<E> next) {
    *             this.item = element;
    *             this.next = next;
    *             this.prev = prev;
    *         }
*           }
 *
 *
 *             command + O: search for the class and check the source code
 *             command + fn + F12: display all methods in current class
 *      
 *  4. Vector源码: 529    知道就行, 现在不用Vector了
 *          Collections 的 synchronizedList() 可以返回线程安全的List, 后面讲Collections
 *
 *  5. List interface methods
 *
 *
 *
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
     * void add(int index, Object ele):在index位置插入ele元素
     * boolean addAll(int index, Collection eles):从index位置开始将eles中
     * 的所有元素添加进来
     * Object get(int index):获取指定index位置的元素
     * int indexOf(Object obj):返回obj在集合中首次出现的位置
     * int lastIndexOf(Object obj):返回obj在当前集合中末次出现的位置
     * Object remove(int index):移除指定index位置的元素，并返回此元素
     * Object set(int index, Object ele):设置指定index位置的元素为ele
     * List subList(int fromIndex, int toIndex):返回从fromIndex到toIndex位置的子集合
     */
    @Test
    public void test1(){

    }


}
