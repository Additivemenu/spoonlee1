package class03_reflectionApplication.application3;

import class03_reflectionApplication.data.Person;
import org.junit.jupiter.api.Test;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * 2023: P191
 * 反射的应用3-2: 调用指定的方法
 * @author xueshuo
 * @create 2023-02-20 1:43 pm
 */
public class ReflectTest2 {

    // private String showNation(String nation,int age)
    @Test
    public void test1() throws InstantiationException, IllegalAccessException, NoSuchMethodException, InvocationTargetException {

        Class clazz = Person.class;

        Person per = (Person) clazz.newInstance();

        // 1. 通过CLass的实例调用getDeclaredMethod(String methodName, CLass ... args) 获取指定方法的实例
        // 因为重载需要指定方法arument的类型和出现顺序
        Method showNationMethod = clazz.getDeclaredMethod("showNation", String.class, int.class);       // 注意int.class不能写成integer.class

        // 2. setAccessible(true): 确保此方法是acccessible
        showNationMethod.setAccessible(true);   //

        // 3. 通过Method实例调用invoke(Object ob, Object ... obj), 即为对Method对应的方法的调用
        // invoke()的返回值即为Method对应方法的返回值
        // 特别的, 如果Method对应的方法的返回值类型为void, 则invoke()返回值为null
        Object returnValue= showNationMethod.invoke(per, "CHN", 10);
        System.out.println(returnValue);

    }


    // 静态方法的调用
    // public static void showInfo()
    @Test
    public void test2() throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
        Class clazz = Person.class;


        // 1. 通过CLass的实例调用getDeclaredMethod(String methodName, CLass ... args) 获取指定方法的实例
        // 因为重载需要指定方法arument的类型和出现顺序
        Method showInfoMethod = clazz.getDeclaredMethod("showInfo");       // 注意int.class不能写成integer.class

        // 2. setAccessible(true): 确保此方法是acccessible
        showInfoMethod.setAccessible(true);   //

        // 3. 通过Method实例调用invoke(Object ob, Object ... obj), 即为对Method对应的方法的调用
        // invoke()的返回值即为Method对应方法的返回值
        // 特别的, 如果Method对应的方法的返回值类型为void, 则invoke()返回值为null
        Object returnValue= showInfoMethod.invoke(null );
        System.out.println(returnValue);
    }



}
