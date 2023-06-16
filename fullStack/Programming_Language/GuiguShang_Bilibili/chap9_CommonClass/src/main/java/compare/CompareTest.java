package compare;

import org.junit.Test;

import java.util.Arrays;

/**
 * 488
 * 1. Java 中的对象，正常情况下, 只能进行比较操作: == OR !=. 是不能进行 > 或 < 的操作的
 *    但是在开发中确实有对object排序的需求, 用到Comparable / Comparator
 *
 * 2. Comparable interface的使用
 *
 * @author xueshuo
 * @create 2023-06-16 10:46 pm
 */
public class CompareTest {
    /**
     * 489
     * 1. 像String, wrapper class等实现了Comparable interface, 重写了compareTo()方法, 给出了比较两个对象大小的方法 (默认是从小到大排列)
     * 2. 重写compareTo(obj)的规则:
     *  如果当前对象this大 于形参对象obj，则返回正整数;
     *  如果当前对象this小于形参对象obj，则返回负整数;
     *  如果当前对象this等于形参对象obj，则返回零。
     */
    @Test
    public void test1(){
        String[] arr = new String[]{"AA", "CC", "MM", "GG", "JJ", "DD", "KK", "BB"};
        Arrays.sort(arr);
        System.out.println(Arrays.toString(arr));

    }


    /**
     * 490 自定义类实现Comparable interface
     */
    @Test
    public void test2(){

    }


    /**
     * 491 Comparator实现定制排序
     */
    @Test
    public void test3(){

    }
}
