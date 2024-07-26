package behaviourPattern.iterator.atguigu;

import java.util.Iterator;
import java.util.List;

/**
 * @author xueshuo
 * @create 2023-06-21 7:01 pm
 */
public class InfoCollegeIterator implements Iterator {

    List<Department> departmentList;        // 信工学院以List方式存放department
    int index = -1;

    public InfoCollegeIterator(List<Department> departmentList) {
        this.departmentList = departmentList;
    }

    @Override
    public boolean hasNext() {

        if (index >= departmentList.size() -1 ){
            return false;
        } else {
            index += 1;
            return true;
        }
    }

    @Override
    public Object next() {
        return departmentList.get(index);
    }

    // 暂时不需要remove(), 空实现
    @Override
    public void remove(){

    }
}
