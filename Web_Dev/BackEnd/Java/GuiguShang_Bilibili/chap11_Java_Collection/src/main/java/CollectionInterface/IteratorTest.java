package CollectionInterface;

import org.testng.annotations.Test;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

/**
 * 集合元素的遍历, 使用Iterator(迭代器)接口
 * 1. 内部的方法: hasNext(), next()
 * 2. **集合对象每次调用iterator()方法都得到一个全新的Iterator对象**, 默认游标都在集合的第一个元素之前. 所以注意不要对一个集合反复地使用iterator()方法，容易死循环
 * 3. 内部的方法: remove() 在遍历时可以删除集合中的元素. 此方法不同于集合直接调用remove(),
 * @author xueshuo
 * @create 2023-01-05 10:16 pm
 */
public class IteratorTest {

    /**
     * 对test5的解释,
     */
    @Test
    public void test6(){
        String s1 = "MM";
        s1 = "GG";                 // 实际上相当于在StringTable(字符串常量池)中新建了一个"GG"对象, 然后让s1指向这个对象
        System.out.println(s1);    // "GG"

        String s2 = "MM";
        String s3 = s2;             // 此时s2, s3都指向字符串常量池中的"MM"对象
        System.out.println(s3);     // "MM"
        s3 = "GG";                  // 在字符串常量池中新建一个"GG"对象, 然后让s3指向这个对象.
        System.out.println(s2);     // "MM", 因为s2依然指向"MM"对象
        System.out.println(s3);     // "GG", s3指向了"GG"对象

        String s4 = new String("MM");   // 在堆中新建一个String对象并使s4指向这个String对象, String对象内部的value属性指向字符串常量池中的"MM"对象
        String s5 = s4;                         // s5也指向堆中的String对象
        System.out.println(s5);                 // "MM"
        s5 = "GG";                              // s5 指向字符串常量池中的"GG对象
        System.out.println(s4);                 // "MM", 因为s4依然指向堆中的String对象, 这个String对象的value指向字符串常量池中的"MM"对象
        System.out.println(s5);                 // "GG"

        s4 = "aaa";
        System.out.println("aaa");
    }

    /**
     * 525
     * forEach 一道面试题
     */
    @Test
    public void test5(){
        String[] arr = new String[]{"MM", "MM", "MM"};

        System.out.println(arr[0] == arr[1]);       // true, arr[0]与arr[1]存的地址值相同

//        // 方式一: 普通for loop
//        for(int i=0; i<arr.length; i++){
//            arr[i] = "GG";            // 相当于在字符串常量池中新建"GG"对象, 然后让arr[i]指向这个对象
//        }

        // 方式二: forEach
        // 先把arr中的元素赋给s, 并不是直接对arr中元素操作, 因而arr中的元素依然指向字符串常量池中的"MM"对象
        for(String s:arr){
            s="GG";      // 只是局部变量s指向字符串常量池中的"GG"对象
        }

        //
        for(int i=0; i<arr.length; i++){
            System.out.println(arr[i]);
        }

    }

    /**
     * 525
     * JDK 5.0 新增了forEach (reinforced for loop), 用于遍历数组, 集合
     */
    @Test
    public void test4(){
        // -----------------
        // 遍历集合
        Collection coll = new ArrayList();
        coll.add(123);      // Integer
        coll.add(456);
        coll.add(new Person("Jerry", 23));
        coll.add(new String("Tom"));
        coll.add(false);   // Boolean

        // for(集合中元素类型 局部变量:集合对象)
        // 原理: 取coll中的元素, 赋给obj变量
        // 底层还是在调用iterator对象
        for(Object obj:coll){
            System.out.println(obj);
        }

        // --------
        // 遍历数组
        System.out.println("***************8");
        int[] arr = new int[]{1,2,3,4,5,6};
        for(int i:arr){
            System.out.println(i);
        }


    }

    /**
     * 524
     *  remove()
     *  注意在遍历时, 对同一个指针指向的元素只能用一次remove(); 否则throw IllegalStateException
     */
    @Test
    public void test3(){
        Collection coll = new ArrayList();
        coll.add(123);      // Integer
        coll.add(456);
        coll.add(new Person("Jerry", 23));
        coll.add(new String("Tom"));
        coll.add(false);   // Boolean

        // 删除集合中的"Tom"
        Iterator iterator = coll.iterator();
        while(iterator.hasNext()){
            Object obj = iterator.next();
            if("Tom".equals(obj)){
                iterator.remove();
            }
        }

        // 注意想再次遍历得重新return 一个Iterator对象
        Iterator iterator2 = coll.iterator();
        while(iterator2.hasNext()){
            System.out.println(iterator2.next());
        }



    }

    /**
     * 523
     * 错误示例
     */
    @Test
    public void test2(){
        Collection coll = new ArrayList();
        coll.add(123);      // Integer
        coll.add(456);
        coll.add(new Person("Jerry", 23));
        coll.add(new String("Tom"));
        coll.add(false);   // Boolean

//        // 错误方式一:
//        // 注意next()会下移指针的
//        Iterator iterator = coll.iterator();
//        while(iterator.next() != null){
//            System.out.println(iterator.next());
//        }

//        // 错误方式二: 死循环, 一致print 第一个元素
//        // 每次调用.iterator()都会返回一个新的Iterator对象, 默认游标在第一个元素之前
//        while((coll.iterator().hasNext())){
//            System.out.println(coll.iterator().next());
//        }




    }

    /**
     * 521:
     * next(), hasNext()搭配使用
     */
    @Test
    public  void test1(){
        Collection coll = new ArrayList();
        coll.add(123);      // Integer
        coll.add(456);
        coll.add(new Person("Jerry", 23));
        coll.add(new String("Tom"));
        coll.add(false);   // Boolean

        Iterator iterator = coll.iterator();        // **Iterator仅仅用于遍历集合, Iterator本身并不提供承装对象的能力.** 如果需要创建Iterator对象, 则必须有一个被迭代的集合

//        // 方式一: 开发中可不会这么写
//        System.out.println(iterator.next());
//        System.out.println(iterator.next());
//        System.out.println(iterator.next());
//        System.out.println(iterator.next());
//        System.out.println(iterator.next());
//
//        System.out.println(iterator.next());        // NoSuchElementException

//        // 方式二: 开发中也不会这么写
//        for(int i=0; i<coll.size();i++){
//            System.out.println(iterator.next());
//        }

        // 方式三: 推荐写法
        while(iterator.hasNext()){
            System.out.println(iterator.next());
        }
    }



}
