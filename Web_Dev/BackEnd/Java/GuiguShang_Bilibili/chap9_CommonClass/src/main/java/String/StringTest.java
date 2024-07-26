package String;

import org.junit.Test;

/**
 * String 的使用
 * @author xueshuo
 * @create 2022-12-28 16:58
 */
public class StringTest {
    /**
     * String: "abc"
     * 1. String is a final class, cannot be extended
     * 2. String implements Serializable
     *           implements Comparable
     * 3. String内部定义了final byte[] (JDK17) value 用来存储字符串数据,
     *       代表String是一个不可变的字符序列, 即不能对value(包括其内部元素)重新赋值,
     *       修改String变量的赋值, 其实是在方法区的常量池又创建了新的字符串常量, 然后让String变量指向那个新建的常量
     *       体现: 1. 当对字符串重新赋值时, 需要重写指定内存区域赋值, 不能使用原有value赋值
     *             2. 对现有字符串进行连接操作时, 也需要重写指定内存区域赋值, 不能使用原有value赋值
     *             3. 当调用String的replace()修改指定字符串片段时, 也需要重写指定内存区域赋值, 不能使用原有value赋值
     * 4. 通过字面量的方式给一个String变量赋值, 此时的字符串值声明在字符串常量池中
     *           注意字符串常量池中是不会存储在相同内容的字符串的.
     *
     */
    @Test
    public void test1(){
        String s1 = "abc";          // 这是字面量定义方式, 因为String不需要非得new来赋值 (Java中只有String instance可以这么搞)
        String s2 = "abc";

        s1 = "hello";

        // s1, s2 指向内存中的同一区域. 解释见图解
        System.out.println(s1 == s2);     // true

        System.out.println(s1);         // hello
        System.out.println(s2);         // abc

        String s3 = "abc";
        System.out.println(s2==s3);     // true
        s3 +="def";
        System.out.println(s3);         // abcdef, newly build constant, not modify"abc"
        System.out.println(s2);         // still abc
        System.out.println(s2==s3);     // false

        System.out.println("********************");

        String s4 = "abc";
        String s5 = s4.replace('a','m');
        System.out.println(s4);     // abc
        System.out.println(s5);     // mbc, newly build constant,  not modify"abc"

    }


    /**
     * String实例化
     * 1. 通过字面量的方式
     * 2. 通过new + constructor
     *
     * 面试题: String s = new String("abc") 方式创建对象, 在内存中创建了几个对象?
     *          两个: 一个是堆空间中的new结构, 另一个是byte[], 对应常量池中的数据: "abc"
     *
     */
    @Test
    public void test2(){
        // 通过字面量的方式定义: s1, s2对应的数据"javaEE"声明在方法区的字符串常量池中
        String s1 = "javaEE";
        String s2 = "javaEE";

        // 通过new + constructor的方式: s3, s4保存的地址值, 数据在堆空间中开辟空间之后对应的地址值
        String s3 = new String("javaEE");
        String s4 = new String("javaEE");

        System.out.println(s1 == s2);       // true, check address
        System.out.println(s1 == s3);       // false
        System.out.println(s1 == s4);       // false
        System.out.println(s3 == s4);       // false,

        System.out.println("**************");
        Person p1 = new Person("Tom", 12);
        Person p2 = new Person("Tom", 12);

        System.out.println(p1.name.equals(p2.name));    // true, check content
        System.out.println(p1.name == p2.name);         // true

        p1.name = "Jerry";
        System.out.println(p2.name);                    // Tom, due to String is immutable
    }

    /**
     * 字符串拼接
     * conclusion:
     *  1. 常量与常量(用final修饰的变量也算常量)的拼接结果在常量池中, 而常量池中不会存在相同内容的常量
     *  2. 只要拼接中有一方为变量, 结果就在堆中
     *  3. 如果拼接的结果调用intern(), 返回值就在常量池中
     *
     */
    @Test
    public void test4(){
        String s1 = "javaEEhadoop";

        String s2 = "javaEE";
        String s3 = s2 + "hadoop";
        System.out.println(s1 == s3);           // false

        final String s4 = "javaEE";             // s4 is a constant, it points to "javaEE" in StringTable
        String s5 = s4 + "hadoop";
        System.out.println(s1 == s5);           // true

    }


    @Test
    public void test3(){
        String s1 = "javaEE";
        String s2 = "hadoop";

        String s3 = "javaEEhadoop";
        String s4 = "javaEE" + "hadoop";        // 仅字面量连接

        // 变量+字面量 连接, 需要在堆空间中创建新的String对象
        String s5 = s1+"hadoop";
        String s6 = "javaEE" + s2;
        String s7 = s1 + s2;

        System.out.println(s3 == s4);           // true
        System.out.println(s3 == s5);           // false
        System.out.println(s3 == s6);           // false
        System.out.println(s3 == s7);           // false
        System.out.println(s5 == s6);           // false
        System.out.println(s5 == s7);           // false
        System.out.println(s6 == s7);           // false

        String s8 = s5.intern();                // 返回值得到的s8使用常量池中已经存在的"javaEEHadoop"
        System.out.println(s3 == s8);           // true

    }



}
