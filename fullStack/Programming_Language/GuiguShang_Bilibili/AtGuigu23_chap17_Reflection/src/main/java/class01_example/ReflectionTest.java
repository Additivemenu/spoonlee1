package class01_example;

import org.junit.jupiter.api.Test;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * @author xueshuo
 * @create 2023-02-19 10:00 am
 */
public class ReflectionTest {
    /**
     * 使用反射之前可以进行的操作
     */
    @Test
    public void test1(){
        // 1. instantiate class
        Person p1 = new Person();

        // 2. 调用属性
        // public int age
        p1.age = 10;
        System.out.println(p1.age);

        // 3. 调用方法
        // public void show()
        p1.show();

    }

    /**
     * 使用反射进行相同的操作
     */
    @Test
    public void test2() throws InstantiationException, IllegalAccessException, NoSuchFieldException, NoSuchMethodException, InvocationTargetException {
        // 1. 得到class实例
        Class<Person> clazz = Person.class;
        Person p1 = clazz.newInstance(); // 调用Person空参构造器
        System.out.println(p1);     // Person{name='null', age=0}

        // 2. 调用属性
        // public int age;
        Field ageField = clazz.getField("age");
        ageField.set(p1,10);
        System.out.println(ageField.get(p1));       // 10

        // 3. 调用方法
        // public void show()
        Method showMethod = clazz.getMethod("show");
        showMethod.invoke(p1);      // hello, I am a person!

    }

    /**
     * 出了Person类之后, 就不能直接调用Person类中private权限修饰的结构(属性, 方法, 构造器)
     * 但是, 我们可以通过反射的方式, 调用Person类中的私有方法 ----->  暴力反射
     */
    @Test
    public void test3() throws Exception {
        // 1. 调用私有的构造器, 创建Person的实例
        // private Person(String name, int age)
        Class clazz = Person.class;
        Constructor cons = clazz.getDeclaredConstructor(String.class, int.class);
        cons.setAccessible(true);       // 核心, 允许访问, 即使是被private修饰
        Person p1 = (Person) cons.newInstance("Tom", 12);
        System.out.println(p1);     // Person{name='Tom', age=12}

        // 2. 调用私有的属性
        // private String name;
        Field nameField = clazz.getDeclaredField("name");
        nameField.setAccessible(true);     // 核心, 允许访问, 即使是被private修饰
        nameField.set(p1,"Jerry");
        System.out.println(nameField.get(p1));      // jerry

        // 3. 调用私有方法
        // private String showNation(String nation)
        Method showNationMethod = clazz.getDeclaredMethod("showNation", String.class);// argument1: 方法名, argument2: 方法的参数类型 必须同时指明二者因为overloading
        showNationMethod.setAccessible(true);       // 核心, 允许访问, 即使是被private修饰
        String myNation = (String) showNationMethod.invoke(p1, "CHN");
        System.out.println(myNation);       // my nationality isCHN
    }

}
