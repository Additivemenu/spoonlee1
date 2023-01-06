package java8.lambda;

import org.junit.Test;

import java.io.PrintStream;
import java.util.Comparator;
import java.util.function.BiPredicate;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;

/**
 * method reference的使用:
 * 1. 使用情景: 当要传递给Lambda body的操作, 已经有实现好的方法了, 可以使用method reference!
 *
 * 2. method reference, 本质山还是Lambda表达式, 而Lambda表达式作为funcitonal interface的实例. 所以method reference也是functional interface的实例
 *
 * 3. 使用格式: class/object ::
 *      分为3种情况:
 *              scenario1  object :: non-static method
 *              scenario2  class :: static method
 *              scenario3  class :: non-static method (是的在这里可以这样做)
 * 4. method reference使用要求:
 *              针对scenario1,2: 要求interface中的abstract method的形参列表和返回值类型与method reference中的method的形参列表和返回值类型完全相同 (相互匹配)
 *
 */
public class MethodRefTest {

    /**
     * 情况1： object :: instance methed
     * Consumer中的 void accept(T t)
     * PrintStream中的 void println(T t)
     * 这俩method相互匹配
     */
    @Test
    public void test1(){
        // Lambda
        Consumer<String> con1 = str -> System.out.println(str);     // 传递给Lambda body的操作, 已经有实现了(println(T t))
        con1.accept("Beijing");

        // method reference
        System.out.println("****************************");
        PrintStream ps = System.out;
        Consumer<String> con2 = ps :: println;          // method reference replaces Lambda expression
        con2.accept("Nanjing");
    }



    /**
     *
     * Supplier中的T get()
     * Employee中的String getName()
     * 这俩方法相互匹配
     */
    @Test
    public void test2(){
        // Lambda
        Employee emp = new Employee(1001, "Tom", 23, 5600);
        Supplier<String> sup1 = () -> emp.getName();
        System.out.println(sup1.get());

        System.out.println("***************************");
        // method reference
        Supplier<String> sup2 = emp :: getName;
        System.out.println(sup2.get());
    }

    /**
     * 情况2: class :: static method
     * Comparator中的int compare(T t1, T t2)
     * Integer中的int compare(T t1, T t2)
     * 这俩方法相互匹配
     */
    @Test
    public void test3(){
        Comparator<Integer> com1 = (t1, t2) -> Integer.compare(t1,t2);
        System.out.println(com1.compare(12,21));

        System.out.println("***********************************");

        Comparator<Integer> com2 = Integer :: compare;
        System.out.println(com2.compare(21, 12));
    }

    /**
     * Function中的apply(T t)
     * Math中的Long round(Double d)
     */
    @Test
    public void test4(){
        Function<Double, Long> func = new Function<Double, Long>() {
            @Override
            public Long apply(Double aDouble) {
                return Math.round(aDouble);
            }
        };

        System.out.println("***********************************");
        Function<Double, Long> func1 = d -> Math.round(d);
        System.out.println(func1.apply(12.3));
        System.out.println("***********************************");
        Function<Double, Long> func2 = Math::round;
        System.out.println(func2.apply(12.6));
    }


    /**
     * 情况3: class :: non-static method====================================================================
     * Comparator 中的init compare(T t1, T t2)
     * String中的int t1.compareTo(t2)
     */
    @Test
    public void test5(){
        Comparator<String> com1 = (s1, s2) -> s1.compareTo(s2);
        System.out.println(com1.compare("abc", "abd"));         // 对应ASCII difference

        System.out.println("***********************************");
        Comparator<String> com2 = String :: compareTo;
        System.out.println(com2.compare("abd", "abm"));         // 对应ASCII difference
    }

    /**
     * BiPredicate中的boolean test(T t1, T t2)
     * String中的boolean t1.equals(t2)  , 使用method reference: t1作为调用, t2作为.equals()的argument
     */
    @Test
    public void test6(){
        BiPredicate<String, String> pre1 = (s1, s2) -> s1.equals(s2);
        System.out.println(pre1.test("abc", "abc"));            // true

        System.out.println("***********************************");
        BiPredicate<String, String> pre2 = String :: equals;
        System.out.println(pre2.test("abc", "abd"));            // false
    }

    /**
     * Function中的 R apply(T t)
     * Employee中的 String getName()
     */
    @Test
    public void test7(){
        Employee employee = new Employee(1001, "Jerry", 23, 6000);

        Function<Employee, String> func1 = emp -> emp.getName();  // this line is to define the behaviour of func1
        System.out.println(func1.apply(employee));

        System.out.println("***********************************");
        Function<Employee, String> func2 = Employee::getName;
        System.out.println(func2.apply(employee));
    }

}
