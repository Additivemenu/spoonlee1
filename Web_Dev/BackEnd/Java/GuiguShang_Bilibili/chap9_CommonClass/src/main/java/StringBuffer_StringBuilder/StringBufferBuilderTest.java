package StringBuffer_StringBuilder;

import org.junit.Test;

/**
 * 463, 464
 * 关于StringBuffer & StribgBuilder的使用
 * @author xueshuo
 * @create 2023-05-28 10:19 am
 */
public class StringBufferBuilderTest {

    /**
     * String, StringBuffer, StringBuilder的异同
     * String:   不可变的字符序列; 底层使用char[]存储, jdk1.7之后改为用byte[]
     * StringBuffer:  可变的字符序列; 线程安全的, 但效率偏低.  底层使用char[]存储, jdk1.7之后改为用byte[]
     * StringBuilder:  可变的字符序列; jdk5.0新增, 线程不安全, 效率高. 底层使用char[]存储, jdk1.7之后改为用byte[]
     *
     * 源码分析:
     * String str = new String();           // char[] value = new char[0]
     * String str1 = new String("abc");     // char[] value = new char[]{'a','b','c'}
     *
     * StringBuffer sb1 =  new StringBuffer();      // char[] value = new char[16]; 底层创建了一个长度为16的数组
     * System.out.println(sb1.length());        // 0
     * sb1.append('a');     // value[0] = 'a';
     * sb2.append('b');     // value[1] = 'b';
     *
     * StringBuffer sb2 = new StringBuffer("abc");      // char[] value = new char["abc".length() + 16]
     * System.out.println(sb2.length());        // 3
     *
     * // 扩容问题: 如果要添加的数据使得底层数组盛不下了, 那么就需要扩容底层的数组.
     *             默认情况下, 扩容为原来容量的2倍+2， 同时将原有数组中的元素复制到新的数组中
     *             指导意义： 开发中建议使用 StringBuffer(int capacity) 构造器 或 StringBuilder(int capacity) 构造器来尽量避免扩容
     *
     *
     */
    @Test
    public void test1(){
        StringBuffer sb1 = new StringBuffer("abc");
        sb1.setCharAt(0, 'm');  // 改变了sb1
        System.out.println(sb1);        // "mbc"

        StringBuffer sb2 = new StringBuffer();
        System.out.println(sb2.length());
    }


    /**
     * 465 StringBuffer, StringBuilder常用方法: 以StringBuffer为例:
     *
     * StringBuffer append(xxx):提供了很多的append()方法，用于进行字符串拼接
     * StringBuffer delete(int start,int end):删除指定位置的内容
     * StringBuffer replace(int start, int end, String str):把[start,end)位置替换为str StringBuffer insert(int offset, xxx):在指定位置插入xxx
     * StringBuffer reverse() :把当前字符序列逆转
     * public int indexOf(String str)
     * public String substring(int start,int end): 返回从start开始, 到end索引结束的左闭右开的子区间内的sub-string
     * public int length()
     * public char charAt(int n )
     * public void setCharAt(int n ,char ch)
     *
     * 总结:
     * 增: append(xxx) 可以链式调用
     * 删: delete(int start, int end)
     * 改: setCharAt(int n, char ch)   /  replace(int start, int end, String str)
     * 查: charAt(int n)
     * 插: insert(int offset, xxx)
     * 长度: length()
     * 遍历: for + chatAt()   /  toString()
     */
    @Test
    public void test2(){
        StringBuffer s1 = new StringBuffer("abc");
        s1.append(1);
        s1.append('1');
        System.out.println(s1);

        s1.delete(2,4);
        System.out.println(s1);

        s1.replace(2,4,"hello");
        System.out.println(s1);

        s1.insert(2, false);
        System.out.println(s1);

        s1.reverse();
        System.out.println(s1);

        String substring = s1.substring(1, 3);
        System.out.println(s1);
        System.out.println(substring);

    }

    /**
     * 466 String, StringBuffer, StringBuilder效率测试
     * 从高到低： StringBuilder > StringBuffer > String
     */
    @Test
    public void test3(){
        //初始设置
        long startTime = 0L;
        long endTime = 0L;
        String text = "";
        StringBuffer buffer = new StringBuffer("");
        StringBuilder builder = new StringBuilder("");

        //开始对比
        startTime = System.currentTimeMillis();

        // StringBuffer
        for (int i = 0; i < 20000; i++) {
            buffer.append(String.valueOf(i));
        }
        endTime = System.currentTimeMillis(); System.out.println("StringBuffer的执行时间:" + (endTime - startTime)); startTime = System.currentTimeMillis();
        // StringBuilder
        for (int i = 0; i < 20000; i++) {
            builder.append(String.valueOf(i));
        }
        endTime = System.currentTimeMillis(); System.out.println("StringBuilder的执行时间:" + (endTime - startTime)); startTime = System.currentTimeMillis();
        // String
        for (int i = 0; i < 20000; i++) {
            text = text + i;
        }
        endTime = System.currentTimeMillis(); System.out.println("String的执行时间:" + (endTime - startTime));
    }

}
