package CollectionInterface;

import org.testng.annotations.Test;

import java.util.*;

/**
 *  Set interface框架结构:
 *  |--- Collection接口: 单列集合, 用来存储一个个的对象(int, boolean等基础类型不行)
 *       |--- Set接口: 存储无序的(元素在集合中的前后顺序没有意义), 不可重复的数据. 又名 --> 集合(高中意义的)
 *           |--- HashSet: Set的主要实现类, 线程不安全：可以存储null
 *              |--- LinkedHashSet: 作为HashSet的子类, 遍历其内部数据时, 可以按照添加的顺序去遍历
 *                                  对于频繁的遍历操作, LinkedHashSet的查找效率要比HashSet高
 *           |--- TreeSet: 底层用红黑树实现, 可以按照添加的元素的指定属性来排序
 *
 *  1. Set 中没有定义额外的方法, 只能用Collection的方法
 *
 *  2. 要求: 向Set中添加的数据, 其所在类一定要重写: 1) hashCode()  2) equals()
 *     要求: 重写的hashCode()与equals()要尽可能保持一致性: 即想等的对象必须具有相等的hashCode (不同的对象很小概率也有相同的hashCode)
 *             技巧: 对象中用作equals()比较的fields, 都应该参与到hashCode的计算; 直接用Intellij的command + N 生成即可
 *
 *
 * @author xueshuo
 * @create 2023-01-17 9:58 pm
 */
public class SetTest {


    /**
     * 一: Set接口: 存储无序的(元素在集合中的前后顺序没有意义), 不可重复的数据. 以HashSet为例:
     *  1. 无序性: 不等于随机性. 存储的数据在底层的数组中的位置并未按照添加时的数组索引顺序决定, 而是由数据的hash value来决定
     *
     *  2. 不可重复性: 保证添加的元素按照equals()方法判断时, 不能返回true, 即相同的元素只能添加一个
     *
     * 二: 添加元素的过程 (HashSet底层为HashMap), 以HashSet为例:
     *     我们向HashSet中添加元素a, 首先调用a所在类的hashCode()方法计算a的hashValue, 接着该hashValue被转化为a应该在HashSet底层数组
     *     的存放位置, 之后判断该存放位置是否已经有元素:
     *              如果没有其他元素, 则a就放在这个位置上, a添加成功;        ---> 添加成功情况1
     *              如果此位置上已经有其他元素b (或以linked lis的形式存在多个元素了), 则首先比较a与b的hashValue:
     *                          如果hashValue不相同, 则a添加成功;        ---> 添加成功情况下2
     *                          如果hashValue相同, 继续调用a所在类的equals()方法:
     *                                  若equals()返回true, a添加失败;
     *                                  若equals()返回false, a添加成功.        ---> 添加成功情况3
     *
     *     对于添加成功情况2,3: 元素a与已经存在在索引位置上的元素用linked list的形式连接存储.
     *          jdk7:  元素a放到数组中, 指向原来的元素
     *          jdk8:  元素a挂在原来的元素下面
     *
     *     HashSet的底层: 数组 + 链表, 装入HashSet的元素需要同时重写equals()与hashCode()方法
     */
    @Test
    public void test1(){
        Set set = new HashSet();
        set.add(123);
        set.add(456);
        set.add(123);
        set.add("AA");
        set.add("CC");
        set.add(new Person("Ton", 24));
        set.add(129);

        Iterator iterator = set.iterator();
        while(iterator.hasNext()) {
            System.out.println(iterator.next());
        }
    }


    /**
     *
     * LinkedHashSet的使用:
     *      LinkedHashSet作为HashSet的子类, 在添加数据的同时, 还维护了两个引用, 记录此数据的前一个数据和后一个数据
     * 优点: 对于频繁的遍历操作, LinkedHashSet的查找效率要比HashSet高
     *
     *
     *
     */
    @Test
    public void test2(){
        Set set = new LinkedHashSet();
        set.add(123);
        set.add(456);
        set.add(123);
        set.add("AA");
        set.add("CC");
        set.add(new Person("Ton", 24));
        set.add(129);

        Iterator iterator = set.iterator();
        while(iterator.hasNext()) {
            System.out.println(iterator.next());
        }
    }


    /**
     * TreeSet的使用 538 底层是红黑树
     * 1. 向TreeSet中添加的数据, 要求是相同类
     * 2. 两种排序方式: 自然排序(实现Comparable接口), 定制排序(Comparator接口)
     *      自然排序中 判断TreeSet的成员相同, 不是调用equals(), 而是调用compareTo()返回0
     *      定制排序中, 判断成员相等,  不再是equals(), 而是compare()返回0
     *
     */

    // 自然排序
    @Test
    public void test3(){

        TreeSet set = new TreeSet();

        // 不能向TreeSet中添加不同类的对象
//        set.add(123);
//        set.add(456);
//        set.add("AA");
//        set.add(new Person("Tom", 12));

//        // e.g.1
//        set.add(34);
//        set.add(41);
//        set.add(-41);
//        set.add(42);
//        set.add(45);
//        set.add(100);

        // e.g.2
        set.add(new Person("Tom", 12));
        set.add(new Person("Jerry", 11));
        set.add(new Person("Jim", 16));
        set.add(new Person("Mike", 24));
        set.add(new Person("Jack", 9));
        set.add(new Person("Jack", 56));

        Iterator iterator = set.iterator();
        while(iterator.hasNext()){
            System.out.println(iterator.next());        // 从小到大遍历
        }

    }


    // 定制排序
    @Test
    public void test4(){
        Comparator com = new Comparator() {
            // 按照年龄从小到大排列
            @Override
            public int compare(Object o1, Object o2) {
                if(o1 instanceof Person && o2 instanceof Person){
                    Person p1 = (Person)o1;
                    Person p2 = (Person)o2;
                    return Integer.compare(p1.getAge(), p2.getAge());
                }else{
                    throw new RuntimeException("input type not matched!");
                }
            }
        };

        TreeSet set = new TreeSet(com);

        set.add(new Person("Tom", 12));
        set.add(new Person("Jerry", 11));
        set.add(new Person("Jim", 16));
        set.add(new Person("Mike", 24));
        set.add(new Person("Marry", 24));
        set.add(new Person("Jack", 9));
        set.add(new Person("Jack", 56));


        Iterator iterator = set.iterator();
        while(iterator.hasNext()){
            System.out.println(iterator.next());        // 从小到大遍历
        }
    }


}
