package class01_annotations_eg;

import class02_customizingAnnotation.MyAnnotation;

import java.util.ArrayList;

/**
 *  注解的使用
 *  1. 理解Annotation
 *      见笔记中Introduction部分
 *  2. Annotation的使用示例
 *    第一类 生成文档的相关注解
 *    第二类 编译时进行格式检查 (JDK内置的3个基本注解)
 *    第三类 跟踪代码依赖性, 实现替代配置文件的作用 (框架中常用)
 *  3. 自定义注解
 *
 *
 * @author xueshuo
 * @create 2023-02-20 10:00 pm
 */
public class AnnotationTest {

    public static void main(String[] args) {
        Student student = new Student();
        student.walk();

        @SuppressWarnings("unused")
        int num = 10;   // 加上@SuppressWarnings("unused")后, num 从灰色变成正常颜色了,

        @SuppressWarnings({"unused", "rawtypes"})
        ArrayList list = new ArrayList();
        
    }

}

@MyAnnotation(value = "hello world!")
class Person{
    private String name;
    private int age;

    public Person() {
    }


    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void walk(){
        System.out.println("walk");
    }

    public void eat(){
        System.out.println("eat");
    }
}

interface Info{
    void show();
}

class Student extends Person implements Info{
    // 重写父类的方法
    @Override
    public void walk(){
        System.out.println("student walk");
    }

    // 实现接口中的方法
    @Override
    public void show() {

    }
}
