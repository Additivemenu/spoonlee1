package class03_reflectionApplication.application3;

import class03_reflectionApplication.data.Person;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;

/**
 * @author xueshuo
 * @create 2023-02-20 11:41 am
 */
public class ReflectTest {
    /**
     * 反射的应用3-1: 调用指定的属性
     */
    // public int age = 1;
    @Test
    public void test1() throws InstantiationException, IllegalAccessException, NoSuchFieldException {
        Class clazz1 = Person.class;

        Person per = (Person) clazz1.newInstance();

        // 1. 获取运行时类中指定名称的属性
        Field ageField = clazz1.getField("age");

        // 2. get or set 此属性的值
        ageField.set(per, 2);
        System.out.println(ageField.get(per));
    }

    // private String name;
    @Test
    public void test2() throws InstantiationException, IllegalAccessException, NoSuchFieldException {
        Class clazz1 = Person.class;

        Person per = (Person) clazz1.newInstance();

        // step 1. 通过Class实例调用getDeclaredField(String fieldName)  获取运行时类中, 声明的, 指定名称的属性
        Field nameField = clazz1.getDeclaredField("name");

        // step 2. setAccessible(true) 确保此属性可以访问
        nameField.setAccessible(true);      // 啥权限都可以access

        // step 3. 通过Field实例,
        // 调用get(Object obj)   获取属性
        // set(Object obj, Object value)  设置属性
        nameField.set(per, "Tom");
        System.out.println(nameField.get(per));
    }


}
