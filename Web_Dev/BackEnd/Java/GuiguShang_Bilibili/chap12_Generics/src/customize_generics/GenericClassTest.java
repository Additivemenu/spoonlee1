package customize_generics;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * 566
 *
 * 自定义Generics结构: 类, 接口, 方法
 * 1. 关于自定义Generic 类, 接口:
 *
 *
 * @author xueshuo
 * @create 2023-03-18 2:33 pm
 */
public class GenericClassTest {

    @Test
    public void test1(){
        // 如果定义了Generic 类， 实例化时却没有指明Generics的类型, 则认为此时Generics类型为Object
        // 要求: 如果定义的类是带Generics的, 建议在实例化时指明类的Generics
        Order order = new Order();
        order.setOrderT(123);
        order.setOrderT("ABC");

        // 建议: 在实例化时指明类的Generics
        Order<String> order1 = new Order<>("orderAA", 1001, "");
        order1.setOrderT("AA: hello");

    }

    @Test
    public void test2(){
        SubOrder subOrder1 = new SubOrder();
        // 由于子类在继承带有Generics的父类时, 指明了Generics类型, 则实例化子类对象时, 不再需要指明Generics类型
        subOrder1.setOrderT(123);

        SubOrder2<String> subOrder2 = new SubOrder2<String>();
        subOrder2.setOrderT("abc");

    }


    @Test
    public void test3(){
        ArrayList<String> list1 = null;
        ArrayList<Integer> list2 = new ArrayList<Integer>();

        // 泛型不同的引用不能相互赋值
//        list1 = list2;  // 编译报错
    }

    // 测试泛型方法
    @Test
    public void test4(){
        Order<String> order = new Order<>();

        Integer[] arr = new Integer[]{1,2,3,4};
        // 泛型方法在调用时, 指明泛型参数的类型
        List<Integer> integers = order.copyFromArrayToList(arr);

        System.out.println(integers);
    }

}
