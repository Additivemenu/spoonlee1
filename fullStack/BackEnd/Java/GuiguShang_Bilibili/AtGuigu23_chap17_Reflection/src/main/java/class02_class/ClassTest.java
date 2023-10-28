package class02_class;

import org.junit.jupiter.api.Test;

import java.lang.annotation.ElementType;

/**
 * @author xueshuo
 * @create 2023-02-19 11:12 am
 */
public class ClassTest {
    /**
     * 获取(不是创建)Class实例的几种方式
     * @throws ClassNotFoundException
     */
    @Test
    public void test1() throws ClassNotFoundException {
        // 1. 调用运行时类的静态属性
        Class<User> clazz1 = User.class;
        System.out.println(clazz1);

        // 2. 调用运行时类的对象的getClass()
        User u1 = new User();
        Class clazz2 = u1.getClass();

        System.out.println(clazz1 == clazz2);   // true

        // 3. 调用Class的静态方法forName(String className), 用的最多最灵活, 可以把类名作为变量传入forName(), 前两周运行时类都写死了
        String className = "class02_class.User";     // 全类名
        Class clazz3 = Class.forName(className);
        System.out.println(clazz3 == clazz1);       // true

        // 4. 使用ClassLoader的方式 (了解即可, 其实和方式3方式一样)
        Class clazz4 = ClassLoader.getSystemClassLoader().loadClass("class02_class.User");
        System.out.println(clazz4 == clazz1);       // true


    }

    /**
     * Class的实例都可以指向哪些结构呢? 简言之，所有Java类型！
     */
    @Test
    public void Test2(){
        Class c1 = Object.class;        // class
        Class c2 = Comparable.class;    // interface
        Class c3 = String[].class;      // class
        Class c4 = int[][].class;       // array
        Class c5 = ElementType.class;
        Class c6 = Override.class;      // Annotation
        Class c7 = int.class;           // primitive
        Class c8 = void.class;
        Class c9 = Class.class;

        int[] a = new int[10];
        int[] b = new int[100];
        Class c10 = a.getClass();
        Class c11 = b.getClass();
        // 只要元素类型与维度(不是长度!)一样，就是同一个Class
        System.out.println(c10 == c11);
    }

}
