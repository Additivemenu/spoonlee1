package class04_other.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;

/**
 * ClassName: Table
 * Description:
 *
 * @Author 尚硅谷-宋红康
 * @Create 10:42
 * @Version 1.0
 */
@Target({TYPE})
@Retention(RetentionPolicy.RUNTIME)     // 为了注解可以被反射获取
public @interface Table {           // 我们想用这个Annotation来修饰一个class or interface, 用来表示该类对应一个database table
    String value() default "abc";
}
