package why_generics;

import org.junit.Test;

import java.util.*;

/**
 * 563,564
 * Generics的使用
 * 1. JDK1.5的新特性
 * 2. 在集合中使用Generics:
 *      总结:
 *          (1) 集合接口或集合类在jdk5.0时都修改为带Generics的结构
 *          (2) 在实例化集合类时, 可以指明具体的泛型类型 (相当于给容器贴个标签, 限制内部)
 *          (3) 指明完以后, 在集合类或者接口中凡是定义类或者接口时, 内部结构(e.g.方法， 构造器, 属性 etc)使用到类的泛型的位置, 都指定为实例化的泛型类型
 *              e.g. add(E e) ---> 实例化之后, add(Integer e)
 *          (4) 注意点: 泛型的类型必须是类, 不能是基本数据类型, 需要用到基本数据类型的位置, 拿包装类替换
 *          (5) 如果实例化时， 如果没有指明泛型的类型, 则默认类型为java.lang.Object
 *
 * @author xueshuo
 * @create 2023-03-17 9:32 pm
 */
public class GenericsTest {

    // 在使用Generics之前的情况
    @Test
    public void test1(){
        ArrayList list = new ArrayList();

        // 需求: 存放学生的成绩
        list.add(78);
        list.add(76);
        list.add(89);
        list.add(88);

        // 问题一: 类型不安全, 编译时不做类型检查
        list.add("Tom");

        for(Object score : list){
            // 问题二: 强转时有可能出现ClassCastException
            int studentScore = (Integer) score;
            System.out.println(studentScore);
        }
    }


    // 在集合中使用Generics: 以ArrayList为例子
    @Test
    public void test2(){
        // 泛型不能是基本类型, 得是Object类型
        ArrayList<Integer> list = new ArrayList<>();

        list.add(95);
        list.add(85);
        list.add(85);
        list.add(90);

        // 编译时会做类型检查, 保证数据安全
//        list.add("Tom"); // 编译不通过

        // 方式1: for loop
        for(Integer score : list){
            // 避免了强转操作
            int stuScore = score;
            System.out.println(stuScore);
        }

        // 方式2: Iterator
        System.out.println("方式2");
        Iterator<Integer> iterator = list.iterator();
        while(iterator.hasNext()){
            Integer stuScore = iterator.next();
            System.out.println(stuScore);
        }

    }

    // 在集合中使用Generics: 以HashMap为例子
    @Test
    public void test3(){
        Map<String, Integer> map = new HashMap<String, Integer>();

        map.put("Tom", 87);
        map.put("Jerry", 89);
        map.put("Jack", 88);

        // 泛型的嵌套
        // Entry interface是定义在Map内部的
        Set<Map.Entry<String, Integer>> entry =  map.entrySet();
        Iterator<Map.Entry<String, Integer>> iterator= entry.iterator();

        while(iterator.hasNext()){
            Map.Entry<String, Integer> e = iterator.next();
            String key = e.getKey();
            Integer value = e.getValue();

            System.out.println(key + "---->" + value);
        }

    }




}
