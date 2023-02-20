package class03_reflectionApplication.application3;

import class03_reflectionApplication.data.Person;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

/**
 * 2023 P191  27min-
 * 调用指定的构造器
 * @author xueshuo
 * @create 2023-02-20 2:07 pm
 */
public class ReflectTest3 {

    // private Person(String name, int age)
    @Test
    public void test1() throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        Class clazz = Person.class;

        // 1. 通过Class实例调用getDeclaredConstructor(CLass ... args), 获取指定参数类型的构造器
        Constructor declaredConstructor = clazz.getDeclaredConstructor(String.class, int.class);

        // 2. 确保此构造器是accessible
        declaredConstructor.setAccessible(true);

        // 3. 通过Constructor实例调用newInstance(Object ... objs), 返回一个运行时类的实例
        Person per = (Person) declaredConstructor.newInstance("Tom", 12);

        System.out.println(per);

    }

    //
    // 使用Constructor替换原来的使用CLass调用newInstance()的方式创建对象
    @Test
    public void test2() throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        Class clazz = Person.class;

        // 1. 通过Class实例调用getDeclaredConstructor(CLass ... args), 获取指定参数类型的构造器
        Constructor declaredConstructor = clazz.getDeclaredConstructor();

        // 2. 确保此构造器是accessible
        declaredConstructor.setAccessible(true);

        // 3. 通过Constructor实例调用newInstance(Object ... objs), 返回一个运行时类的实例
        Person per = (Person) declaredConstructor.newInstance();

        System.out.println(per);
    }

}
