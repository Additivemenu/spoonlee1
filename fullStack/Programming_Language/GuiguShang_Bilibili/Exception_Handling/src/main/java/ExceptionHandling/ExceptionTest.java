package ExceptionHandling;

import org.junit.Test;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Date;
import java.util.Scanner;

/**
 * 1. Exception family
 *  |----- Throwable
 *      |------ java.lang.Error: 一般不做针对性处理
 *      |------ java.lang.Exception: 需要针对性处理
 *          |----- 编译时异常(checked Exception)
 *              |----- IOException
 *                  |----- FileNotFoundException
 *              |----- ClassNotFoundException
 *              |----- and a lot more...
 *          |----- 运行时异常(unchecked Exception) RunTimeException
 *              |----- NullPointerExcetpion
 *              |----- ArrayIndexOutOfBoundsException
 *              |----- ClassCastException
 *              |----- NumberFormatException
 *              |----- InputMismatchException
 *              |----- ArithmaticException
 * 2. 面试题: 常见的Exception都有哪些? 举例说明
 *
 */
public class ExceptionTest {

    /**
     * NullPointerException
     */
    @Test
    public void test1(){
        // e.g.1
        int[] arr = null;
        System.out.println(arr[3]);
        // e.g.2
        String str = "abc";
        str = null;
        System.out.println(str.charAt(0));
    }

    /**
     * ArrayIndexOutOfBoundsException
     */
    @Test
    public void test2(){
        // e.g.1 ArrayIndexOutOfBoundsException
        int[] arr = new int[10];
        System.out.println(arr[10]);
        // e.g.2 StringIndexOutOfBoundsException
        String str = "abc";
        System.out.println(str.charAt(3));
    }

    /**
     * ClassCastException
     */
    @Test
    public void test3(){
        Object obj = new Date();
        String str = (String)obj;       // 多态向下cast
    }

    /**
     * NumberFormatException
     */
    @Test
    public void test4(){
        String str = "123";
        str = "abc";
        Integer.parseInt(str);
    }


    /**
     * InputMismatchException
     * 注意: unit test中无法从键盘输入
     */
    @Test
    public void test5(){
        Scanner keyboard = new Scanner(System.in);
        int score = keyboard.nextInt();     // if you typein something other than Int, throw InputMismatchException
        System.out.println(score);

        keyboard.close();
    }


    /**
     * ArithmaticException
     */
    @Test
    public void test6(){
        int a = 10;
        int b = 0;
        System.out.println(a/b);
    }

    /**
     * ===============================================================================================
     * 以下: 编译时异常
     */

    /**
     *  编译时异常
     */
    @Test
    public void test7() throws IOException {
        // 1,2 instantiate stream
        File file = new File("hello.txt");
        FileInputStream fis = new FileInputStream(file);            // might throw FileNotFoundException
        // 3 read
        int data = fis.read();              // might throw IOException
        while(data != -1){
            System.out.println((char) data);
            data = fis.read();
        }
        // 4 close stream
        fis.close();                        // might throw IOException
    }




}
