package class04_JDK8Annotation;

import java.lang.annotation.*;

import static java.lang.annotation.ElementType.*;

/**
 * 3. 自定义注解
 *  注解声明为@interface
 *  内部定义成员, 通常用value表示
 *  可以指定成员的默认值, 用default表示
 *  如果自定义注解没有成员, 表明是一个标识作用
 *
 *  如果注解有成员, 在使用注解时, 需要指明成员的值
 * @author xueshuo
 * @create 2023-02-21 8:35 am
 */
@Target({TYPE, FIELD, METHOD, PARAMETER, LOCAL_VARIABLE, MODULE, TYPE_PARAMETER, TYPE_USE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Repeatable(MyAnnotations.class)
public @interface MyAnnotation {

    String value() default "hello";

}
