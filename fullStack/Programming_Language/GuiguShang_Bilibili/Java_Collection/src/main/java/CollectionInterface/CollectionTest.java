package CollectionInterface;

import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;

/**
 * 1. 集合框架概述
 *  1.1 集合, 数组都是对多个数据进行存储操作的结构, 简称Java容器
 *      说明: 注意此时所谓的存储, 主要指的是内存层面的存储, 不涉及到持久化的存储(.txt, .jpg, .avi, 数据库存储)
 *  1.2 数组在存储多个数据方面特点:
 *      > 一旦初始化之后长度固定
 *      > 需要指定数组元素的类型, 只能存储同一类型的元素. e.g. String[] arr, int[] arr1, Obeject[] arr2 (可以装Object及其子类的instance)
 *  1.3 数组的局限性:
 *      > 一旦初始化, 长度固定, 无法动态控制其长度
 *      > 数组提供的方法非常有限, 对于add, delete, insert, length...利用数组index操作非常不方便, 同时效率也不高
 *      > 数组存储数据的特点: 有序, 可重复. 对于无序, 不可重复的存储需求, 数组无法满足.
 *
 * 2. 集合(广义的)框架
 *  2.1 Collection接口: 单列集合, 用来存储一个个的对象(int, boolean等基础类型不行)
 *      |--- List接口: 存储有序的(元素在集合中的前后顺序是有意义), 可重复的数据.  又名 --> 动态数组
 *          |--- ArrayList, LinkedList, Vector...
 *      |--- Set接口: 存储无序的(元素在集合中的前后顺序没有意义), 不可重复的数据. 又名 --> 集合(高中意义的)
 *          |--- HashSet, LinkedHashSet, TreeSet...
 *  2.2 Map接口: 双列集合, 用来存储一对对(key-value)的数据 --> 高中的函数: y = f(x)，
 *          > 同一key不能对应多个个value
 *          > 多个key可以对应同一value
 *          |--- HashMap, LinkedHashMap, TreeMap, HashTable, Properties...
 * 3. Collection接口中的方法
 *  https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Collection.html
 *  向Collection接口的实现类的对象中添加数据obj时, 要求obj所在类要@override equals() ---> 这样contains()才能有效
 *
 * @author xueshuo
 * @create 2023-01-04 3:40 pm
 */
public class CollectionTest {
    /**
     * 519: Collection interface的常用方法
     */
    @Test
    public void test3(){
        
    }

    /**
     * 518: Collection interface的常用方法
     */
    @Test
    public void test2(){
        Collection coll = new ArrayList();
        coll.add(123);      // Integer
        coll.add(456);
        coll.add(new String("Tom"));
        coll.add(false);   // Boolean
        coll.add(new Person("Jerry", 23));

        Person per1 = new Person("Jim", 20);
        coll.add(per1);

        System.out.println(coll);

        //contains(Object obj): 判断当前集合是否包含obj
        // (判断内容. 底层调用obj所属类的equals() loop over all elements, 对于自定义类必须override equals())
        System.out.println(coll.contains(123));                             // true
        System.out.println(coll.contains(new String("Tom")));       // true
        System.out.println(coll.contains(new Person("Jerry", 23))); // FIXME: false if Person.equals() not override; true if equals() is override

        System.out.println(coll.contains(per1));        // true
        System.out.println(coll.contains(new Person("Jim", 20)));   // FIXME: false if Person.equals() not override; true if equals() is override

        // constainsAll(Collection coll1): 判断coll1中的所有元素是否都存在于当前集合中.
        Collection coll1 = Arrays.asList(123, 456);
        System.out.println(coll.containsAll(coll1));        // true

    }

    /**
     * 513: Collection interface的常用方法
     */
    @Test
    public void test1(){
        Collection coll = new ArrayList();

        // add(Object e): add e into coll
        coll.add("AA");
        coll.add("bb");
        coll.add(123);          // 自动装箱
        coll.add(new Date());

        // size()
        System.out.println(coll.size());        // 4
        System.out.println(coll);

        // addAll(Collection coll1): all all elements in coll1 into coll
        Collection coll1 = new ArrayList();
        coll1.add(456);
        coll1.add("cc");

        coll.addAll(coll1);
        System.out.println(coll.size());        // 6
        System.out.println(coll);

        // clear(): 清空元素
        coll.clear();
        System.out.println(coll);           // []

        // isEmpty(): 判断当前集合是否有元素 (size=0 ?)
        System.out.println(coll.isEmpty());     // true
    }




}