package class03_reflectionApplication.application1;

import class03_reflectionApplication.data.Person;
import org.junit.jupiter.api.Test;

/**
 * 反射的应用一: 创建运行时类的对象
 *
 * @author xueshuo
 * @create 2023-02-20 9:38 am
 */
public class NewInstanceTest {
    @Test
    public void test1() throws InstantiationException, IllegalAccessException {
        Class clazz = Person.class;

        // 创建Person类的实例
        Person per = (Person) clazz.newInstance();
        // 实际上还是调用Person的空参构造器, 如果Person类中没有空参构造器, throw InstantiationException
        // 如果Person类中空参构造器的权限不够, throw IllegalAccessException

        System.out.println(per);
    }

}
