package class04_JDK8Annotation;

import java.util.ArrayList;

/**
 * JDK8中注解的新特性: 可重复注解, 类型注解
 *
 *  可重复注解: 在MyAnnotation上声明一个@Repeatable(MyAnnotations.class)
 *            MyAnnotation的target， Retention, inherited 和MyAnnotations相同
 *
 *
 *  类型注解:
 *      ElementType.TYPE_PARAMETER 表示该注解能写在烈性变量的声明语句中 (e.g. 泛型声明)
 *      ElementType.TYPE_USE 表示该注解能写在使用类型的任何语句中
 *
 * @author xueshuo
 * @create 2023-02-21 9:33 am
 */
// @MyAnnotations({@MyAnnotation("hi"), @MyAnnotation("hello")})       // '重复注解'JDK8之前的写法
@MyAnnotation("hi")
@MyAnnotation("hello")
public class JDK8AnnotationTest {



}


class Generic<@MyAnnotation T>{
    public void show() throws @MyAnnotation RuntimeException{
        ArrayList<@MyAnnotation String> list = new ArrayList<>();

        int num = (@MyAnnotation int) 10L;
    }
}
