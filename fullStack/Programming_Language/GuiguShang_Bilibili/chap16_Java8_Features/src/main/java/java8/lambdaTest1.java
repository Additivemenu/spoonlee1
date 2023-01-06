package java8;

import org.junit.Test;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.function.Consumer;

/**
 * https://www.bilibili.com/video/BV1Kb411W75N?p=670&vd_source=c6866d088ad067762877e4b6b23ab9df
 * Lambda的使用
 * 1. 举例: (o1, o2) -> Integer.compare(o1,o2)
 * 2. 格式:
 *      ->: Lambda operator OR arrow operator
 *      ->左边: Lambda形参列表 (即接口中abstract method的形参列表)
 *      ->右边: Lambda体(即重写的abstract method的方法体)
 * 3. Lambda表达式的使用: (分为6种情况)
 *      总结:
 *      ->左边: Lambda形参列表的参数类型恶意省略(type infer);
 *      ->右边: Lambda体若只有一条执行语句, {}和return都可以省略;
 * 4. Lambda表达式的本质: 作为functional interface的实例 ???????????????????????????? 不是说interface不能实例化吗?
 *      非functional interface不能用lambda
 * 5. functional interface: 如果一个interface中只包含了一个abstract method, 那么这个interface称为functional interface
 *      - 可以在一个interface上使用@FunctionalInterface注解, 用以检验它是否真的是functional interface
 *      - 在java.util.function package下定义了Java8丰富的functional interface
 * 6. 所以以前用匿名实现类表示的现在都可以用Lambda表达式来写
 */
public class lambdaTest1 {
    // 格式一: 无参, 无返回值 ====================================================
    @Test
    public void test1(){
        // normal way: -------------------------
        Runnable r1 = new Runnable(){               // Runnable is a functional interface
            @Override
            public void run(){
                System.out.println("I love coding!");
            }
        };
        r1.run();

        // lambda, 更简洁------------------------
        Runnable r2 = () -> System.out.println("I love Java!");
        r2.run();
    }

    // 语法格式二: Lambda 需要一个参数, 但是没有返回值================================
    @Test
    public void test2(){
        Consumer<String> con = new Consumer<String>(){
            @Override
            public void accept(String s){
                System.out.println(s);
            }
        };
        con.accept("lie and oath");
        System.out.println("*************************");
        // -----------------------------------
        Consumer<String> con1 = (String s) -> {System.out.println(s);};
        con1.accept("one is bad, one is good");
    }

    // 语法格式3: 数据类型可以省略, 因为可由编译器推断得出, 称为: "类型推断"
    @Test
    public void test3(){
        Consumer<String> con1 = (String s) -> {System.out.println(s);};
        con1.accept("one is bad, one is good");

        System.out.println("*******************************");

        Consumer<String> con2 = (s) -> {System.out.println(s);};
        con2.accept("type infer");
    }

    @Test
    public void test4(){
        ArrayList<String> list = new ArrayList<>();   // type infer
        int[] arr = {1,2,3} ;        // type infer
    }

    // 语法格式4: Lambda若只需要一个参数, 参数的小括号可以省略 (not recommend to do this)
    @Test
    public void test5(){
        Consumer<String> con1 = (s) -> {System.out.println(s);};
        con1.accept("type infer");

        System.out.println("*******************************");

        Consumer<String> con2 = s -> {System.out.println(s);};
        con2.accept("one augument, omit ()");

    }

    // 语法格式5: Lambda需要两个或以上的参数, 多条执行语句, 并且可以有返回值
    @Test
    public void test6(){
        Comparator<Integer> com1 = new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                System.out.println(o1);
                System.out.println(o2);
                return o1.compareTo(o2);
            }
        };
        System.out.println(com1.compare(12,21));

        System.out.println("*********************************");
        Comparator<Integer> com2 = (o1,o2) -> {
            System.out.println(o1);
            System.out.println(o2);
            return o1.compareTo(o2);
        };
        System.out.println(com2.compare(12,6));


    }


    // 语法格式6: 当Lambda体只有一条语句时, return与{}若有, 都可省略
    @Test
    public void test7(){
        Comparator<Integer> com1 = (o1,o2) -> {
            return o1.compareTo(o2);
        };
        System.out.println(com1.compare(12,6));

        System.out.println("*********************************");
        Comparator<Integer> com2 = (o1, o2) -> o1.compareTo(o2);
        System.out.println(com2.compare(12,21));
    }

    @Test
    public void test8(){
        Consumer<String> con1 = s -> {
            System.out.println(s);
        };
        con1.accept("batman vs. superman");
        System.out.println("*********************************");
        Consumer<String> con2 = s -> System.out.print(s);
        con2.accept("batman vs. superman 2");

    }


}
