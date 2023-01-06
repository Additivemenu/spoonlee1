package java8;

import org.junit.Test;      // 先写@Test, 然后右键, IDEA自己会添加的

import java.util.Comparator;

/**
 * Java8 new feature: lambda, 本质只是语法增强, 让代码更紧凑
 */
public class lambdaTest {

    @Test
    public void test1(){
        // normal way: ----------------------------------------------------
        // Runnable is a public interface, r1 is an interface variable (wait, we can new interface()???)
        // https://stackoverflow.com/questions/16750772/instantiating-interfaces-in-java
        // it seems we can instantiate an interface, anonymously
        Runnable r1 = new Runnable(){               // Runnable is a functional interface
            @Override
            public void run(){
                System.out.println("I love coding!");
            }
        };
        r1.run();

        // lambda, 更简洁----------------------------------------------------
        Runnable r2 = () -> System.out.println("I love Java!");
        r2.run();
    }

    @Test
    public void test2(){
        // normal way------------------------------------------------
        Comparator<Integer> com1 = new Comparator<Integer>() {      // Comparator is a functional interface
            @Override
            public int compare(Integer o1, Integer o2) {
                return Integer.compare(o1, o2);
            }
        };
        int compare1 =  com1.compare(12,21);
        System.out.println(compare1);

        // lambda, 更简洁: 原来1行代码, 可以不写函数{}和return----------------------------------------------
        Comparator<Integer> com2 = (o1, o2) -> Integer.compare(o1, o2);
        int compare2 = com2.compare(32,31);
        System.out.println(compare2);

        // method reference, 更简洁写法---------------------------------
        Comparator<Integer> com3 = Integer :: compare;
        int compare3 = com3.compare(32, 31);
        System.out.println(compare3);


    }



}
