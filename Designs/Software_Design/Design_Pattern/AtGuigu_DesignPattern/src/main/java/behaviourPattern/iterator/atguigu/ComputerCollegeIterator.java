package behaviourPattern.iterator.atguigu;

import java.util.Iterator;
import java.util.function.Consumer;

/**
 * @author xueshuo
 * @create 2023-06-21 6:56 pm
 */
public class ComputerCollegeIterator implements Iterator {
    // 这里我们需要department是以怎样的方式存放

    Department[] departments;
    int position = 0;   // 遍历的位置

    public ComputerCollegeIterator(Department[] departments) {
        this.departments = departments;
    }

    @Override
    public boolean hasNext() {
        if (position >= departments.length || departments[position] == null) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public Object next() {
        Department department = departments[position];
        position += 1;
        return department;
    }

    // 暂时不需要, 空实现
    @Override
    public void remove() {

    }

    @Override
    public void forEachRemaining(Consumer action) {
        Iterator.super.forEachRemaining(action);
    }
}
