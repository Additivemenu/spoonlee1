package behaviourPattern.iterator.atguigu;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * @author xueshuo
 * @create 2023-06-21 7:09 pm
 */
public class InfoCollege implements College{

    List<Department> departmentList;

    public InfoCollege(){
        departmentList = new ArrayList<>();
        addDepartment("info security", "info security prof");
        addDepartment("web security", "web security prof");
        addDepartment("server security", "server security prof");
    }

    @Override
    public String getName() {
        return "Info college";
    }

    @Override
    public void addDepartment(String name, String desc) {
        Department department = new Department(name, desc);
        departmentList.add(department);
    }

    @Override
    public Iterator createIterator() {
        return new InfoCollegeIterator(departmentList);
    }
}
