package CollectionInterface.ListSetPractice;

import org.testng.annotations.Test;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;


/**
 *
 * P545
 * @author xueshuo
 * @create 2023-01-19 10:10 pm
 */
public class ListSetPractice {

    /**
     * as we are using List and HashSet in the same time, make sure you overwrite equals(), hashCode() if List contains
     * customized object
     * @param list
     * @return
     */
    public static List duplicateList(List list) {
        HashSet set = new HashSet();
        set.addAll(list);
        return new ArrayList(set);
    }

    /**
     * practice: 在List内去除重复的数字值, 要求尽量简单
     */
    @Test
    public void test1() {
        List list = new ArrayList();
        list.add(new Integer(1));
        list.add(new Integer(2));
        list.add(new Integer(2));
        list.add(new Integer(4));
        list.add(new Integer(4));
        List list2 = duplicateList(list);

        for (Object integer : list2) {
            System.out.println(integer); }
    }


    /**
     * 一到面试题
     */
    @Test
    public void test2(){
        HashSet set = new HashSet();
        Person p1 = new Person(1001,"AA");      // Person 已重写hashCode(), equals()
        Person p2 = new Person(1002,"BB");

        set.add(p1);
        set.add(p2);
        System.out.println(set);        // [Person{name='BB', age=1002}, Person{name='AA', age=1001}]

        p1.name = "CC";     // 再次计算p1的hashCode就变了, 但p1放置在底层数组中的位置保持不变(这不就带来很多bug了吗?)
        set.remove(p1);     // remove时先判断有没有, 有了再删除: 先判断hashCode, 此时计算出来的hashCode和p1被加入时不同， 因而被判断为p1不存在, 删除无效
        System.out.println(set);        // [Person{name='BB', age=1002}, Person{name='CC', age=1001}]

        set.add(new Person(1001,"CC")); //同理, Person(1001, "CC）的hashCode对应在底层数组上位置没被占领, 被加入成功
        System.out.println(set);

        set.add(new Person(1001,"AA"));// 虽然hashCode计算的位置上被p1占了, 但二者并不equals, 所以加入成功
        System.out.println(set);
    }
}
