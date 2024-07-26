package principles.demeter;

import java.util.ArrayList;
import java.util.List;

/**
 * @author xueshuo
 * @create 2023-02-11 11:50 am
 */

// 客户端
public class Demeter1 {

    public static void main(String[] args) {
        // SchoolManager
        SchoolManager schoolManager = new SchoolManager();
        // 输出学院员工id和学校总部的员工信息
        schoolManager.printAllEmployee(new CollegeManager());

    }

}


// 学校总部员工
class Employee {
    private String id;

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
}


// 学院员工
class CollegeEmployee {
    private String id;

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
}


// 学院管理者
class CollegeManager {
    // return all college employee
    public List<CollegeEmployee> getAllEmployee() {
        List<CollegeEmployee> list = new ArrayList<CollegeEmployee>();
        for (int i = 0; i < 10; i++) {  //  这里我们增加了10个员工到list
            CollegeEmployee emp = new CollegeEmployee();
            emp.setId("college employee id = " + i);
            list.add(emp);
        }
        return list;
    }
}

// 分析SchoolManager类的直接朋友:  Employee, CollegeManager
// CollegeEmployee并不是SchoolManager直接朋友而是陌生类, 这违背了Demeter principle
class SchoolManager {
    // return  学校总部的员工
    public List<Employee> getAllEmployee() {
        List<Employee> list = new ArrayList<Employee>();

        for (int i = 0; i < 5; i++) { // 增加5个学校总部员工
            Employee emp = new Employee();
            emp.setId("学校总部员工id = " + i);
            list.add(emp);
        }
        return list;
    }

    //该方法完成输出学校总部和学院员工信息的方法(id)
    void printAllEmployee(CollegeManager sub) {

        // 分析问题
        //1. 这里的 CollegeEmployee 不是  SchoolManager 的直接朋友
        //2. CollegeEmployee 是以局部变量的形式出现在 SchoolManager 中
        //3. 这违反了Demeter Principle

        // 获取学院员工
        List<CollegeEmployee> list1 = sub.getAllEmployee();
        System.out.println("------------分公司员工------------");
        for (CollegeEmployee e : list1) {
            System.out.println(e.getId());
        }
        // 获取学校总部员工
        List<Employee> list2 = this.getAllEmployee();
        System.out.println("------------学校总部员工------------");
        for (Employee e : list2) {
            System.out.println(e.getId());
        }
    }
}
