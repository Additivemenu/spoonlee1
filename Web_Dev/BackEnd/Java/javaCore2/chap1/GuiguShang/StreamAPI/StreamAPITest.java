

/**
 * 测试 Stream的创建
 * -----
 * 1. Stream关注的是对数据集合的运算, 与CPU打交道
 *      集合关注的是数据的存储, 和内存打交道
 * 2. - Stream自己不会存储元素
 *    - Stream不会改变源对象. 相反, 它们只会返回一个持有结果的新Stream
 *    - Stream操作是延迟执行(惰性的)的, 这意味着它们会等到需要结果的时候才执行.
 * 3. Stream操作的三大步骤:
 *    Step1: 创建Stream
 *      从一个数据源(e.g. Set, Array)那里创建一个初始Stream
 *    Step2: 中间操作
 *      中间操作链, 在初始流的基础上生成Stream链
 *    Step3: 终止操作
 *      一旦执行终止操作, 就执行中间操作链表, 并产生结果. 之后, Stream不会再被使用.
 */

import java8.lambda.Employee;
import java8.lambda.EmployeeData;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;
import java.util.stream.Stream;

/**
 * test instantiate Stream
 */
public class StreamAPITest {

    /**
     * Step1: 创建Stream, 方法1: 通过集合
     */
    @Test
    public void test1(){
        List<Employee> employeeList = EmployeeData.getEmployees();

        // default Stream<E> stream(): 返回一个sequential stream (Stream interface的实例)
        Stream<Employee> stream = employeeList.stream();        // stream()是在Collection interface中声明的, 在List interface中实现的?

        // default Stream<E> parallelStream(): 返回一个parallel stream
        Stream<Employee> parallelStream = employeeList.parallelStream();
    }



    /**
     * Step1: 创建Stream, 方法2: 通过数组
     * Java8 中的Arrays的静态方法stream()可以获取Array Stream
     * static <T> Stream<T> stream(T[] array): 返回一个流
     */
    @Test
    public void test2(){
        int[] arr = new int[]{1,2,3};
        IntStream stream = Arrays.stream(arr);

        Employee e1 = new Employee(1001, "Tommy");
        Employee e2 = new Employee(1002, "Jim");
        Employee[] arr1 = new Employee[]{e1,e2};
        Stream<Employee> stream1 = Arrays.stream(arr1);
    }

    /**
     * Step1: 创建Stream, 方法3： Stream.of()
     */
    @Test
    public void test3(){
        Stream<Integer> integerStream = Stream.of(1, 2, 3, 4, 5, 6);

    }

    /**
     * Step1: 创建Stream, 方法4: 无限stream(无限被投入数据的stream)
     * 使用静态方法 Stream.iterate() 和 Stream.generate() 创建无限流
     * public static<T> Stream<T> iterate(final T seed, final UnaryOperator<T> f)
     * public static<T> Stream<T> generate(Supplier<T> s)
     *
     */
    @Test
    public void test4(){

        // public static<T> Stream<T> iterate(final T seed, final UnaryOperator<T> f)
        // 遍历从0开始, 前10个even number
        Stream.iterate(0, t -> t+2)
                .limit(10)
                .forEach(System.out::println);

        System.out.println("***************************************");
        //public static<T> Stream<T> generate(Supplier<T> s)
        Stream.generate(Math::random)
                .limit(10)
                .forEach(System.out::println);;

    }


}
