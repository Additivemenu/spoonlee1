package class04_other.annotation;

import org.junit.Test;

import java.lang.reflect.Field;

/**
 * P192
 * ClassName: AnnotationTest
 * Description: 测试使用反射来获取注解的信息
 *
 * @Author 尚硅谷-宋红康
 * @Create 10:48
 * @Version 1.0
 */
public class AnnotationTest {
    // 1. 获取类声明上的注解
    @Test
    public void test1(){
        // Class实例是反射的源头
        Class clazz = Customer.class;

        // 得到的类型是注解类型
        Table annotation = (Table) clazz.getDeclaredAnnotation(Table.class);

        System.out.println(annotation.value());     // "t_customer"
    }

    // 2.获取属性声明的注解
    @Test
    public void test2() throws Exception {
        Class clazz = Customer.class;

        Field nameField = clazz.getDeclaredField("name");

        //获取属性声明上的注解
        Column nameColumn = nameField.getDeclaredAnnotation(Column.class);
        System.out.println(nameColumn.columnName());// "cust_name"
        System.out.println(nameColumn.columnType()); // "varchar(15)"
    }
}
