package java8.lambda;

import org.junit.Test;

import java.util.Arrays;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.Supplier;

/**
 *  Constructor reference:
 *              和method referenece的第二种用法类似, functional interface的abstract method的形参列表和constructor的形参列表一致,
 *              abstract method的返回值类型即为constructor所属的类的类型
 *
 * ---------------------------
 *  Array reference
 *              把Array看作一个特殊的类(e.g. String[]), 写法就和constructor reference一样
 *
 *
 */

public class ConstructorRefTest {
    // Constructor reference
    // Supplier 中的 T get()
    // Employee 的空参构造器: Employee()
    @Test
    public void test1(){
        Supplier<Employee> empSup = new Supplier<Employee>() {
            @Override
            public Employee get() {
                return new Employee();
            }
        };
        System.out.println(empSup.get());
        System.out.println("*************************************");
        Supplier<Employee> empSup1 = ()-> new Employee();
        System.out.println(empSup1.get());
        System.out.println("*************************************");
        Supplier<Employee> empSup2 = Employee::new;
        System.out.println(empSup2.get());
    }

    /**
     * Function<T R> 中的 R apply(T t)
     */
    @Test
    public void test2(){
        Function<Integer, Employee> func1 = id -> new Employee(id);
        System.out.println(func1.apply(1001));
        System.out.println("*************************************");
        Function<Integer, Employee> func2 = Employee::new;                  // 编译器通过比对, 知道这里是调用哪个constructor
        System.out.println(func2.apply(1002));


    }

    /**
     * BiFunction<T, U, R> 中的  R apply(T t, U u)
     *
     */
    @Test
    public void test3(){
        BiFunction<Integer, String, Employee> func1 = (id, name) -> new Employee(id, name);
        System.out.println(func1.apply(1001, "Tom"));
        System.out.println("*************************************");
        BiFunction<Integer, String, Employee> func2 = Employee :: new;
        System.out.println(func2.apply(1002, "John"));

    }

    /**
     *  Array reference
     *  Function 中的 R apply(T t)
     *
     */
    @Test
    public void test4(){
        Function<Integer, String[]> func1 = length -> new String[length];
        String[] arr1 = func1.apply(10);
        System.out.println(Arrays.toString(arr1));
        System.out.println("*************************************");
        Function<Integer, String[]> func2 = String[]::new;
        String[] arr2 = func2.apply(5);
        System.out.println(Arrays.toString(arr2));


    }


}
