package Interface.Java8_Interface;

/**
 * P357
 * JDK8: 除了定义 全局常量 和 抽象方法外, 接口中还可定义静态方法, 默认方法, 提供具体的方法实现
 *
 * @author xueshuo
 * @create 2023-01-30 5:03 pm
 */
public interface CompareA {

    // static method ------------------------------------------
    public static void method1(){
        System.out.println("CompareA: beijing");
    }

    // default method -----------------------------------------
    public default void method2(){
        System.out.println("CompareA: shanghai");
    }

    default void method3(){
        System.out.println("CompareA: Melbourne");
    }

    default void method4(){
        System.out.println("default method4 from interface");
    }





}
