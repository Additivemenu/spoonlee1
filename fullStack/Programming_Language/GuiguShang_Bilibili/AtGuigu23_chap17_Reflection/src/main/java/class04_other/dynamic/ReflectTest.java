package class04_other.dynamic;

import org.junit.Test;

import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.Date;

/**
 * P192 14min-
 * ClassName: ReflectTest
 * Description:
 *      体会反射的动态性
 * @Author 尚硅谷-宋红康
 * @Create 11:31
 * @Version 1.0
 */
public class ReflectTest {

    //体会：静态性, 编译和运行都非常明确地知道是Person 类型
    public Person getInstance(){
        return new Person();
    }

    //体会：反射的动态性. 根据用户输入的字符串, 创建对应类的实例 ----------------------
    //举例1：
    public <T> T getInstance(String className) throws Exception {

        // CLass类实例是反射的起源
        Class clazz = Class.forName(className);

        Constructor con = clazz.getDeclaredConstructor();
        con.setAccessible(true);

        return (T) con.newInstance();
    }

    @Test
    public void test1() throws Exception {
        // 静态的情况， 只能返回Person的实例
        Person p1 = getInstance();
        System.out.println(p1);

        // 动态的情况, 根据给定的String变量来生成对应类的实例
        String className = "class04_other.dynamic.Person";
        Person per1 = getInstance(className);
        System.out.println(per1);

        String className1 = "java.util.Date";
        Date date1 = getInstance(className1);
        System.out.println(date1);
    }

    //体会：反射的动态性 --------------------------------
    //举例2：
    public Object invoke(String className,String methodName) throws Exception {
        // Class实例是反射的源头
        Class clazz = Class.forName(className);

        // step 1. 创建全类名对应的运行时类的对象
        Constructor con = clazz.getDeclaredConstructor();
        con.setAccessible(true);

        Object obj = con.newInstance();

        // step 2. 获取运行时类中指定的方法
        Method method = clazz.getDeclaredMethod(methodName);
        method.setAccessible(true);

        // step 3. 反射的方式调用方法: 方法调用对象
        return method.invoke(obj);
    }

    @Test
    public void test2() throws Exception {
        // 这里类名和方法名是写死的, 实际中他们可能会从配置文件中读取, 或者用户发送http request时被读取, 从而实现动态地调用指定类的指定方法
        String className = "class04_other.dynamic.Person";
        String methodName = "show";

        Object returnValue = invoke(className,methodName);  // 调用指定类的指定方法, 中间会创建指定类的对象. 即用到时才会创建对象
        System.out.println(returnValue);
    }

}














