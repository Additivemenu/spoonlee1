package String;

/**
 * @author xueshuo
 * @create 2022-12-30 14:19
 */

import org.junit.Test;

/**
 *
 *
 *
 * boolean equals(Object obj) 比较字符串的 内容 是否相同
 *
 * boolean equalsIgnoreCase(String anotherString) 与 equals 方法类似 忽略大
 * 小写
 *
 * String concat(String str) 将指定字符串连接到此字符串的结尾 。 等价于用
 *
 * int compareTo(String anotherString) 比较两个字符串的 大小
 *
 * String substring(int beginIndex) 返回一个新的字符串 它是此字符串的从
 * beginIndex 开始截取到最后的一个子字符串 。
 *
 * String substring(int beginIndex, int endIndex) 返回一个新字符串 它是此字
 * 符串从 beginIndex 开始截取到 endIndex( 不包含 的一个子字符串
 */
public class StringMethodTest {

    @Test
    public void test1(){
        String s1 = "HelloWorld";
        System.out.println(s1.length());
        System.out.println(s1.charAt(0));        // 0 ~ length-1

        System.out.println(s1.isEmpty());        // false
        System.out.println("".isEmpty());        // true. isEmpty() return true if string length is 0

        System.out.println(s1.toUpperCase());    // HELLOWORLD
        System.out.println(s1);                  // still "HelloWorld" due to immutability
        System.out.println(s1.toLowerCase());    // helloworld

        // String trim() 返回字符串的副本 忽略前导空白和尾部 空白
        String s3 = "  he  llo   world    ";
        String s4 = s3.trim();
        System.out.println("------"+s3+"------");   //------  he  llo   world    ------
        System.out.println("------"+s4+"------");   //------he  llo   world------

    }

    @Test
    public void test2(){
        String s1 = "HelloWorld";
        String s2 = "helloworld";
        System.out.println(s1.equals(s2));              // false
        System.out.println(s1.equalsIgnoreCase(s2));    // true

        String s3 = "abc";
        String s4 = s3.concat("def");
        System.out.println(s4);                         // abcdef

        String s5 = "abc";
        String s6 = new String("abe");
        System.out.println(s5.compareTo(s6));       // -2 (c-e = -2), indicate s5 < s6; relevant to String sorting

        String s7 = "01234567";
        String s8 = s7.substring(2);  // return new substring with index from start index
        String s9 = s7.substring(2,6);          // return new substring with index from start index to (end index - 1) 左闭右开
        System.out.println(s7);                 // 01234567
        System.out.println(s8);                 // 234567
        System.out.println(s9);                 // 2345
    }

    /**
     *
     */
    @Test
    public void test3(){
        String str1 = "helloworld";
        System.out.println(str1.endsWith("ld"));                        // true
        System.out.println(str1.startsWith("Hel"));                     // flase
        System.out.println(str1.startsWith("ll", 2));       // true


        String str2 = "wo";
        System.out.println(str1.contains(str2));              // true

        System.out.println(str1.indexOf("lo"));               // 3, return the index of the first letter of the sub-string in str1
        System.out.println(str1.indexOf("lol"));              // -1, there is no such sub-string in str1
        System.out.println(str1.indexOf("lo", 5));  // -1, search index range: index >=5

        String str3 = "hellorworld";
        System.out.println(str3.lastIndexOf("or"));             // 7, 从右往左找第一个sub-string, 返回从左往右的index
        System.out.println(str3.lastIndexOf("or", 6));  // 4

        // 什么情况下indexOf(str)和lastIndexOf(str)返回值相同
        // 情况一: String中只存在唯一str; 情况二: String中不存在str
    }

    /**
     * replace
     *
     * match
     *
     * split
     */
    @Test
    public void test4(){
        String str1 = "I am Iron man";
        String str2 = str1.replace("Iron", "Bat");
        System.out.println(str1);       // I am Iron man
        System.out.println(str2);       // I am Bat man

        String str3 = "I am Iron man, Iron man!";
        String str4 = str3.replace("Iron", "Bat");
        System.out.println(str3);       // I am Iron man, Iron man!
        System.out.println(str4);       // I am Bat man, Bat man!

        System.out.println("******************************");
        String str = "12hello34world56java7891mysql456";
        // 把字符串中的数字替换成',' 如果结果中开头和结尾有','的话去掉
        // step1: 一个或多个连续出现的数字替换为','
        // step2: 在step1的基础上, 如果开头和结尾有',', 那么就去掉','.  '^' for start, '$' for end
        // regex: regular expression
        String string = str
                .replaceAll("\\d+", ",")
                . replaceAll("^,|,$","");
        System.out.println(string);     // hello,world,java,mysql

        String astr = "12345";
        // 判断astr字符串中是否全部由数字构成, 既有1-n个数字组成
        boolean matches = astr.matches("\\d+");
        System.out.println(matches);        // true

        String tel = "0571-4534289";
        // 判断这是否是一个杭州的固定电话
        boolean result = tel.matches("0571-\\d{7,8}");      //d{7,8} for 7 or 8 digits of numbers
        System.out.println(result);         // true

        System.out.println("**************************************");
        String astr2 = "hello|world|java";
        String[] astr2s = astr2.split("\\|");
        for(int i=0;i<astr2s.length;i++){
            System.out.println(astr2s[i]);
        }
        System.out.println();

        String astr3 = "hello.world.java";
        String[] astr3s = astr3.split("\\.");
        for(int i=0;i<astr3s.length;i++){
            System.out.println(astr3s[i]);
        }




    }


}
