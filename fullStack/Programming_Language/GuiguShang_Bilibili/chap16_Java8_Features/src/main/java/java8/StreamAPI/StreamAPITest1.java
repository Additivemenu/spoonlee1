package java8.StreamAPI;

import java8.lambda.Employee;
import java8.lambda.EmployeeData;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

/**
 * test Stream中间操作
 *
 */

public class StreamAPITest1 {

    /**
     * filter & slice
     *
     */
    @Test
    public void test1(){
        List<Employee> empList =  EmployeeData.getEmployees();
        Stream<Employee> empStream = empList.stream();
        // filter(Predicate p) -- 接收Lambda, 从Stream中排除掉某些元素 ----------------------------------------
        // practice: find out employees whose salary is more than 7000
        empStream.filter(e -> e.getSalary() > 7000)
                .forEach(System.out::println);

        // limit(n) --限制stream, 使其元素不超过给定数量
        System.out.println("**********************************************");

        empList.stream()
                .limit(3)
                .forEach(System.out::println);     //注意这里必须先生成新的Stream才能使用.limit(), 因为empStream执行完已不可用

        // skip(n)  --跳过元素, 返回一个扔掉了前n个元素的stream. 若source stream中元素不足n个, 则返回一个空stream
        System.out.println("**********************************************");
        empList.stream()
                .skip(3)
                .forEach(System.out::println);

        // distinct() -- 通过stream所生成元素的hashCode()和equals()去掉重复的元素
        System.out.println("**********************************************");
        empList.add(new Employee(1010,"Qiangdong Liu",40,8000));
        empList.add(new Employee(1010,"Qiangdong Liu",40,8000));
        empList.add(new Employee(1010,"Qiangdong Liu",40,8000));
        empList.add(new Employee(1010,"Qiangdong Liu",41,8000));
        //System.out.println(empList);
        empList.stream()
                .distinct()
                .forEach(System.out::println);


    }

    /**
     * map  =========================================================================================
     *
     *  也就是说, map这个中间步骤可以转化流水线中的元素的类型, 比如喂进stream的一个List的Employee, 通过.map()可以转化为Employee.name
     */
    @Test
    public void test2(){
        // map(Function f)  接收一个Function interface object作为argument, 将元素转换成其他形式(甚至是转换成一个stream)或提取信息,
        //                  该函数会被应用到每个元素上, 并将其映射称为一个新的元素
        List<String> stringList =  Arrays.asList("aa", "bb", "cc", "dd");
        stringList.stream()
                .map(str -> str.toUpperCase())
                .forEach(System.out ::println);

        // Practice1: 获取员工姓名长度大于6的员工的姓名
        System.out.println("**********************************************");
        List<Employee> empList =  EmployeeData.getEmployees();
        empList.stream()
                .map(Employee::getName)
                .filter(name -> name.length()>6)
                .forEach(System.out::println);

        // Practice2: stream of stream 有点绕
        System.out.println("****************add Stream******************************");
        Stream<Stream<Character>> streamOfStream = stringList.stream()
                                                             .map(StreamAPITest1::fromStringToStream);        // TODO: 注意map这里return了一个stream of stream

        streamOfStream.forEach(stream -> {
            stream.forEach(System.out::println);
        });

        // flatMap(Function f)  接收一个Function interface object作为argument, 将stream中的每个值都换成另一个stream, 然后把所有stream连接成1个stream
        System.out.println("***************differentiate this with Practice2*******************************");
        Stream<Character> characterFlatStream =  stringList.stream()
                                                           .flatMap(StreamAPITest1::fromStringToStream);        // flatStream, 即把stream降维
        characterFlatStream.forEach(System.out::println);
    }

    // 将String中的多个字符构成的集合转换为对应的Stream的instance
    public static Stream<Character> fromStringToStream(String str){
        ArrayList<Character> list = new ArrayList<>();
        for(Character c:str.toCharArray()){
            list.add(c);            // import Characters of a String into an ArrayList
        }

        return list.stream();
    }


    /**
     * 用来类比.map()和.flatMap() 对stream of stream操作的不同之处
     */
    @Test
    public void test3(){
        ArrayList list1 = new ArrayList();      // 注意这里我们没有限定ArrayList的generics class type, 这样ArrayList中可装入不同类型的数据
        list1.add(1);
        list1.add(2);
        list1.add(3);

        ArrayList list2 = new ArrayList();
        list2.add(4);
        list2.add(5);
        list2.add(6);

//      list1.add(list2);                 // 把list2作为元素加入list1, list1结果为[1, 2, 3, [4, 5, 6]]

        list1.addAll(list2);              // 把list2的所有元素加入list1,  list1结果为[1, 2, 3, 4, 5, 6]
        System.out.println(list1);

    }

    /**
     *
     *
     */
    @Test
    public void test4(){
        // sorted() natural sorting
        List<Integer> list = Arrays.asList(12,43,65,34,87,0,-98,7);
        list.stream()
                .sorted()
                .forEach(System.out::println);


        // sorted(Comparator com)  customize sorting
        System.out.println("**********************************************");
        List<Employee> empList = EmployeeData.getEmployees();
        empList.stream()
                .sorted((e1,e2)->Integer.compare(e1.getAge(), e2.getAge()))
                .forEach(System.out :: println);        // sort by Employee's age

    }

}
