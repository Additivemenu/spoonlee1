package String;


import org.junit.Test;

import java.util.Arrays;

/**
 *
 * String parse to other type
 * @author xueshuo
 * @create 2023-01-01 10:04
 */
public class StringTest2 {

    /**
     * String  <--->  btye[]
     *
     * 1. encoding: String ---> byte[]: str.getBytes()
     * 2. decoding: byte[] ---> String: String constructor
     *
     * Note encoding and decoding should be using consistent charSet, otherwise messy code will show up
     */
    @Test
    public void test3(){
        // encoding: String ---> byte[]
        String str1 = "abc123";
        byte[] bytes = str1.getBytes();             // encoding using default charSet (argument of getBytes() could be charSet name)
        System.out.println(Arrays.toString(bytes));

        // decoding: byte[] ---> String
        System.out.println("*****************************");
        String str2 = new String(bytes);            //decoding using default charSet
        System.out.println(str2);

    }

    /**
     *  String  <--->  char[], more flexible operation would be enabled by such conversion
     *
     *  1. String ---> char[]:  str.toCharArray()
     *  2. char[] ---> String: String constructor
     */
    @Test
    public void test2(){
        // String  ---> char[]
        String str1 = "abc123";
        char[] charArray = str1.toCharArray();
        for(int i=0; i<charArray.length; i++){
            System.out.println(charArray[i]);
        }

        // char[] ---> String
        char[] charArr = new char[] {'h','e','l','l','o'};
        String str2 = new String(charArr);
        System.out.println(str2);
    }

    /**
     * String parse to primitive type, wrapper class (e.g.Integer): 调用包装类的静态方法: parseXxx(str)
     *
     * primitive type, wrapper class ---> String: 调用String重载的valueOf(xxx)
     */
    @Test
    public void test1(){
        // String ---> primitive
        String str1 = "123";
        Integer num = Integer.parseInt(str1);

        // primitive ---> String
        String str2 = String.valueOf(num);
        String str3 = num+"";
        System.out.println(str2);
        System.out.println(str3);

        System.out.println(str1 == str3);       // false, str3 points to heap, while str1 points to StringTable
    }





}
