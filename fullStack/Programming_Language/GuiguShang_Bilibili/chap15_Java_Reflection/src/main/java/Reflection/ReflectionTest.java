package Reflection;

import org.junit.Test;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * @author xueshuo
 * @create 2023-01-19 7:35 pm
 */
public class ReflectionTest {

    // 635 学习Reflection之前, 对于Person的操作
    @Test
    public void test1(){
        // 1. 创建Person类的对象
        Person p1 = new Person("Tom", 12);

        // 2. 通过对象, 调用其内部的属性和方法
        p1.age = 10;
        System.out.println(p1.toString());

        p1.show();

        // 结论: 在Person类外部, 不可以通过Person类的对象调用其内部private结构(field, method)
    }

    // 636 利用Reflection, 对于Person的操作:
    @Test
    public void test2() throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException, NoSuchFieldException {
        Class personClass = Person.class;
        // 1. 通过反射, 可以创建Person类的对象
        Constructor constructor = personClass.getConstructor(String.class, int.class);

        Object obj = constructor.newInstance("Tom", 12);
        Person p = (Person) obj;
        System.out.println(p.toString());

        // 2. 通过反射, 调用对象指定的属性
        Field age = personClass.getDeclaredField("age");
        age.set(p, 10);
        System.out.println(p.toString());

        // 3. 通过反射, 调用对象指定的方法
        Method show = personClass.getDeclaredMethod("show");// 调用空参show()
        show.invoke(p);


    }

}
