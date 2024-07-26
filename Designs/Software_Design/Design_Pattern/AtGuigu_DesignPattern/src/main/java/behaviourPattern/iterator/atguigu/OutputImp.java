package behaviourPattern.iterator.atguigu;

import java.util.Iterator;
import java.util.List;

/**
 * @author xueshuo
 * @create 2023-06-21 7:18 pm
 */
public class OutputImp {
    // 学院的集合
    List<College> collegeList;

    public OutputImp(List<College> collegeList) {
        this.collegeList = collegeList;
    }

    // 遍历所有的学院, 然后输出各个学院的系
    public void printCollege(){
        Iterator<College> iterator = collegeList.iterator();
        while(iterator.hasNext()){
            College college = iterator.next();
            System.out.println("===" + college.getName() + "===");
            printDepartment(college.createIterator());
        }
    }

    // 输出学院的系
    public void printDepartment(Iterator iterator){
        while(iterator.hasNext()){
            Department d = (Department) iterator.next();
            System.out.println(d.getName());
        }
    }
}
