package java8.StreamAPI;


import java8.lambda.Employee;
import java8.lambda.EmployeeData;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * 测试Stream的终止操作
 *
 */
public class StreamAPITest2 {
    /**
     * match
     */
    @Test
    public void test1(){
        List<Employee> empList = EmployeeData.getEmployees();

        // allMatch(Predicate p)   check if all elements matched up
        // practice: check whether all employees are over 18 years old
        boolean allMatch = empList.stream()
                                    .allMatch(e -> e.getAge() > 18);        // similar to SQL all, any
        System.out.println(allMatch);

        // anyMatch(Predicate p) check if there is at least one element matched up
        // practice: check if there exist a employee with salary higher than 10000
        boolean anyMatch = empList.stream()
                                    .anyMatch( e -> e.getSalary() > 10000);
        System.out.println(anyMatch);

        // nonMatch(Predicate p) check if there is no element matched up. return true if indeed no match up
        // Practice: tell me if there exist an employee whose first name is 'Xiao'
        boolean noneMatch = empList.stream().noneMatch(e -> e.getName().startsWith("Xiao"));
        System.out.println(noneMatch);

        // findFirst  return first element
        Optional<Employee> first = empList.stream().findFirst();
        System.out.println(first);

        // findAny   return any element in the current stream
        Optional<Employee> any = empList.parallelStream().findAny();        // 这里取了并行流
        System.out.println(any);


     }

    /**
     *
     */
    @Test
    public void test2(){
        // count
        List<Employee> employees = EmployeeData.getEmployees();
        long count = employees.stream().filter(e -> e.getSalary() > 5000).count();
        System.out.println(count);

        // max(Comparator c)  return the 'max' element in the stream
        // practice: return the max salary
        Stream<Double> salaryStream = employees.stream()
                                                .map(e -> e.getSalary());
        Optional<Double> maxSalary = salaryStream.max(Double::compare);
        System.out.println(maxSalary);

        // min(Comparator c) return the 'min' element in the stream
        // return the employee with the minimum salary
        Optional<Employee> min = employees.stream()
                                            .min((e1, e2) -> Double.compare(e1.getSalary(), e2.getSalary()));
        System.out.println(min);

        // forEach(Consumer c) 内部迭代
        employees.stream().forEach(System.out::println);

        employees.forEach(System.out::println);                 // 使用集合的遍历操作(外部迭代)

    }


    /**
     * reduce
     *
     */
    @Test
    public void test3(){
        // reduce(T identity, BinaryOperator) 可以将stream中的元素反复结合起来, 得到一个值, 返回T
        // practice: calculate the sum of 1~10
        List<Integer> list = Arrays.asList(1,2,3,4,5,6,7,8,9,10);
        Integer sum = list.stream().reduce(0, Integer::sum);        // identity = 0, is initial value
        System.out.println(sum);

        // reduce(BinaryOperator) 可以将stream中的元素反复结合起来, 得到一个值, 返回Optional<T>
        // practice: calculate the sum of all employee's salary
        List<Employee> employees = EmployeeData.getEmployees();
        Optional<Double> salarySum = employees.stream()
                                            .map(Employee::getSalary)
                                            .reduce(Double::sum);
        System.out.println(salarySum);

        Optional<Double> salarySum1 = employees.stream()
                .map(Employee::getSalary)
                .reduce((s1,s2) -> s1+s2);  // equivalent to Double::sum
        System.out.println(salarySum1);

    }

    /**
     * collect
     */
    @Test
    public void test4(){
        // collect(Collector c)  将stream转换为其他形式. 接收一个Collector interface的instance, 用于给stream中的元素做汇总
        // 注意collect(Collector c)的argument不是functional interface instance, 所以你不能写成Lambda表达式的形式
        // practice: find out all the employees with salary higher than 6000, return them in a List or a Set

        // toList
        List<Employee> employees = EmployeeData.getEmployees();
        List<Employee> employeeSalaryList = employees.stream().filter(e -> e.getSalary() > 6000).collect(Collectors.toList());      // 为啥这里不能写Collectors::toList??????
        employeeSalaryList.forEach(System.out::println);

        // toSet
        System.out.println("*******************************************************");
        Set<Employee> employeeSalarySet = employees.stream().filter(e -> e.getSalary() > 6000).collect(Collectors.toSet());
        employeeSalarySet.forEach(System.out::println);

    }




}
