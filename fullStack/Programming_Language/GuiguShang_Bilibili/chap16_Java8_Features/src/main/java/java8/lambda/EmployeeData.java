package java8.lambda;

import java.util.ArrayList;
import java.util.List;


public class EmployeeData {
    public static List<Employee> getEmployees(){
        List<Employee> empList = new ArrayList<>();

        empList.add(new Employee(1001, "Huateng Ma", 34, 6000.38));
        empList.add(new Employee(1002, "Jack Ma", 12, 3000.38));
        empList.add(new Employee(1003, "Jing Dong", 35, 5000.38));
        empList.add(new Employee(1004, "Xiao Mi", 31, 1000.38));
        empList.add(new Employee(1005, "Bai Du", 24, 2000.38));
        empList.add(new Employee(1006, "Bill Gates", 54, 100000.38));
        empList.add(new Employee(1007, "HuaWei", 14, 12000.38));
        empList.add(new Employee(1008, "Zack", 51, 11000.38));

        return empList;

    }
}
