package why_generics.practice;

import org.junit.jupiter.api.Test;

import java.util.Comparator;
import java.util.Iterator;
import java.util.TreeSet;

/**
 * 565
 * 创建Employee类的5个对象, 并把这些对象放入TreeSet集合中, 分别用以下两种方式对集合中的元素进行排序, 并遍历输出:
 * 1) 使Employee实现Comparable接口, 并按name排序
 * 2) 创建TreeSet时传入Comparator对象, 按生日日期的先后排序
 *
 * @author xueshuo
 * @create 2023-01-18 7:51 pm
 */
public class EmployeeTest {

    // 问题1: 自然排序: 按name排序Employee
    @Test
    public void test1(){

        TreeSet<Employee> set = new TreeSet<Employee>();

        Employee e1 = new Employee("liudehua", 55, new MyDate(1965, 5, 4));
        Employee e2 = new Employee("zhangxueyou", 43, new MyDate(1997, 5, 4));
        Employee e3 = new Employee("guofucheng", 44, new MyDate(1987, 5, 9));
        Employee e4 = new Employee("liming", 51, new MyDate(1954, 8, 12));
        Employee e5 = new Employee("liangchaowei", 21, new MyDate(1978, 12, 4));

        set.add(e1);
        set.add(e2);
        set.add(e3);
        set.add(e4);
        set.add(e5);

        Iterator<Employee> iterator = set.iterator();
        while(iterator.hasNext()){
            System.out.println(iterator.next());
        }
    }

    // 问题2: 使用定制排序: 按生日日期排序Employee
    @Test
    public void test2(){

        TreeSet<Employee> set = new TreeSet<Employee>(new Comparator<Employee>() {
            // 使用Generics之后的写法
            @Override
            public int compare(Employee o1, Employee o2) {

                    MyDate e1Birthday = o1.getBirthday();
                    MyDate e2Birthday = o2.getBirthday();

                    return e1Birthday.compareTo(e2Birthday);
            }

            // 使用Generics之前的写法
//            @Override
//            public int compare(Object o1, Object o2) {
//                if(o1 instanceof Employee && o2 instanceof Employee){
//                    Employee e1 = (Employee) o1;
//                    Employee e2 = (Employee) o2;
//
//                    MyDate e1Birthday = e1.getBirthday();
//                    MyDate e2Birthday = e2.getBirthday();
//
//                    return e1Birthday.compareTo(e2Birthday);
//
//                }else{
//                    throw new RuntimeException("input type not matched!");
//                }
//            }
        });

        Employee e1 = new Employee("liudehua", 55, new MyDate(1965, 5, 4));
        Employee e2 = new Employee("zhangxueyou", 43, new MyDate(1987, 5, 4));
        Employee e3 = new Employee("guofucheng", 44, new MyDate(1987, 5, 9));
        Employee e4 = new Employee("liming", 51, new MyDate(1954, 8, 12));
        Employee e5 = new Employee("liangchaowei", 21, new MyDate(1978, 12, 4));

        set.add(e1);
        set.add(e2);
        set.add(e3);
        set.add(e4);
        set.add(e5);

        Iterator iterator = set.iterator();
        while(iterator.hasNext()){
            System.out.println(iterator.next());
        }
    }

}
