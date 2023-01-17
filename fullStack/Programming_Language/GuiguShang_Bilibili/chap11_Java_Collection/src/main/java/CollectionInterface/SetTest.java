package CollectionInterface;

import org.testng.annotations.Test;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

/**
 *  Set interface框架结构:
 *  |--- Collection接口: 单列集合, 用来存储一个个的对象(int, boolean等基础类型不行)
 *       |--- Set接口: 存储无序的(元素在集合中的前后顺序没有意义), 不可重复的数据. 又名 --> 集合(高中意义的)
 *           |--- HashSet: Set的主要实现类, 线程不安：可以存储null
 *              |--- LinkedHashSet: 作为HashSet的子类, 遍历其内部数据时, 可以按照添加的顺序去遍历
 *           |--- TreeSet: 底层用红黑树实现, 可以按照添加的元素的指定属性来排序
 *
 *  1. Set 中没有定义额外的方法, 只能用Collection的方法
 *
 *
 * @author xueshuo
 * @create 2023-01-17 9:58 pm
 */
public class SetTest {


    /**
     * Set接口: 存储无序的(元素在集合中的前后顺序没有意义), 不可重复的数据.
     * 以HashSet为例:
     *  1. 无序性: 不等于随机性. 存储的数据在底层的数组中的位置并未按照添加时的数组索引顺序决定, 而是由数据的hash value来决定
     *
     *  2. 不可重复性: 保证添加的元素按照equals()方法判断时, 不能返回true, 即相同的元素只能添加一个
     *  
     *  接下来看535
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
        while(iterator.hasNext()){
            System.out.println(iterator.next());
        }


    }

}
