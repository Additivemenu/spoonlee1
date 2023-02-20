package class03_reflectionApplication.data;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;

/**
 * 自定义注解
 * @author 尚硅谷-宋红康
 * @create 14:22
 */
@Target({TYPE, FIELD, METHOD, PARAMETER, CONSTRUCTOR, LOCAL_VARIABLE})
@Retention(RetentionPolicy.RUNTIME)     // Annotation的生命周期需要足够长才能被反射得到
public @interface MyAnnotation {
    String value();
}
