package behaviourPattern.iterator.atguigu;

import java.util.Iterator;

/**
 * @author xueshuo
 * @create 2023-06-21 7:07 pm
 */
public interface College {
    String getName();

    // 增加系的方法
    void addDepartment(String name, String desc);

    Iterator createIterator();
}
