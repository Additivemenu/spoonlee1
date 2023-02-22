package class04_other.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;

/**
 * ClassName: Column
 * Description:
 *
 * @Author 尚硅谷-宋红康
 * @Create 10:45
 * @Version 1.0
 */
@Target({FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Column {      // 我们想用这个注解来修饰字段, 用来表示该字段和数据库的column对应
    String columnName();
    String columnType();
}
