package compare;

import org.junit.Test;

import java.util.Arrays;
import java.util.Comparator;

/**
 * 488
 * 1. Java 中的对象，正常情况下, 只能进行比较操作: == OR !=. 是不能进行 > 或 < 的操作的
 *    但是在开发中确实有对object排序的需求, 用到Comparable / Comparator
 *
 * 2. Comparable interface, 与Comparator interface的使用比较
 *    Comparable: 一旦指定, 保证Comparable interface的实现类在任何位置都可以比较大小
 *    Comparator: strategy pattern, 可以更换sort strategy at runtime
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
     * 3. 对于自定义类, 如果要对其实现排序功能, 则需要让其implements Comparable, 在compareTo(obj)中定义如何排序
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
        Goods[] goodsList = new Goods[5];
        goodsList[0] = new Goods("Leneno PC", 35);
        goodsList[1] = new Goods("Microsoft PC", 65);
        goodsList[2] = new Goods("Nvidia PC", 55);
        goodsList[3] = new Goods("Huawei PC", 45);
        goodsList[4] = new Goods("Apple PC", 65);

        Arrays.sort(goodsList);
        System.out.println(Arrays.toString(goodsList));
    }


    /**
     * 491 Comparator实现定制排序
     * - 重写compare(Object o1,Object o2)方法，比较o1和o2的大小:
     *      如果方法返 回正整数，则表示o1大于o2;
     *      如果返回0，表示相等;
     *      返回负整数，表示 o1小于o2。
     *  可以将 Comparator 传递给 sort 方法(如 Collections.sort 或 Arrays.sort)， 从而允许在排序顺序上实现精确控制。
     *  还可以使用 Comparator 来控制某些数据结构(如有序 set或有序映射)的 顺序，或者为那些没有自然顺序的对象 collection 提供排序
     */
    @Test
    public void test3(){
        String[] arr = new String[]{"AA", "CC", "MM", "GG", "JJ", "DD", "KK", "BB"};
        Arrays.sort(arr, new Comparator<String>() {
            @Override
            public int compare(String o1, String o2) {
                return -o1.compareTo(o2);       // 按照字符串从大到小顺序排序
            }
        });
        System.out.println(Arrays.toString(arr));
    }


    @Test
    public void test4(){
        Goods[] goodsList = new Goods[6];
        goodsList[0] = new Goods("Leneno PC", 35);
        goodsList[1] = new Goods("Microsoft PC", 65);
        goodsList[2] = new Goods("Nvidia PC", 55);
        goodsList[3] = new Goods("Huawei PC", 45);
        goodsList[4] = new Goods("Apple PC", 65);
        goodsList[5] = new Goods("Apple PC", 75);

        Arrays.sort(goodsList, new Comparator<Goods>() {
            @Override
            public int compare(Goods o1, Goods o2) {    // 按name ascending, 再按price descending
                int compare = o1.getName().compareTo(o2.getName());
                if(compare == 0){
                    return -Double.compare(o1.getPrice(), o2.getPrice());
                }
                return compare;
            }
        });

        System.out.println(Arrays.toString(goodsList));
    }
}
