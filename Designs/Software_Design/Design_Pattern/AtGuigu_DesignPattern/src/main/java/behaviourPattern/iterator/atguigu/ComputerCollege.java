package behaviourPattern.iterator.atguigu;

import java.util.Iterator;

/**
 * @author xueshuo
 * @create 2023-06-21 7:08 pm
 */
public class ComputerCollege implements College{

    Department[] departments;
    int numOfDepartment = 0; // 保存当前数组的对象个数

    public ComputerCollege() {
        this.departments = new Department[5];
        addDepartment("Java", "Java prof");
        addDepartment("Php", "Php prof");
        addDepartment("Javascript", "Js prof");
        addDepartment("Python", "Python prof");
    }

    @Override
    public String getName() {
        return "computer college";
    }

    @Override
    public void addDepartment(String name, String desc) {
        Department department = new Department(name, desc);
        departments[numOfDepartment] = department;
        numOfDepartment++;
    }

    @Override
    public Iterator createIterator() {
        return new ComputerCollegeIterator(departments);
    }
}
